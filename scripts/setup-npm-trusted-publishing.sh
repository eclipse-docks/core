#!/usr/bin/env bash
# Configure npm trusted publishing (OIDC) for GitHub Actions on each publishable package.
# Requires: npm@11.10.0+, 2FA enabled on npm account, packages already published at least once.
# If a trusted publisher already exists (e.g. for an old workflow file), it is revoked and
# recreated for the current workflow.
# Usage: ./scripts/setup-npm-trusted-publishing.sh [--dry-run] [package]
#   package: optional — package name (e.g. @eclipse-docks/extension-foo) or path (e.g. packages/extension-foo).
#   If omitted, configures all publishable packages (core, extensions, create-app, cli).
# See: https://docs.npmjs.com/cli/v11/commands/npm-trust

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

DRY_RUN=false
ONLY_PACKAGE=""
for arg in "$@"; do
  case $arg in
    --dry-run|-n) DRY_RUN=true ;;
    -*) ;;
    *) ONLY_PACKAGE="$arg" ;;
  esac
done

WORKFLOW_FILE="${WORKFLOW_FILE:-ci.yml}"
REPO="${NPM_TRUST_REPO:-eclipse-docks/core}"

echo "Configuring npm trusted publishing (GitHub OIDC)"
echo "  Workflow: $WORKFLOW_FILE"
echo "  Repository: $REPO"
[ -n "$ONLY_PACKAGE" ] && echo "  Package: $ONLY_PACKAGE (only)"
echo ""

if [ "$DRY_RUN" = true ]; then
  echo "DRY RUN — no changes will be made."
  echo ""
fi

NPM_VER=$(npm -v 2>/dev/null || true)
if [ -z "$NPM_VER" ]; then
  echo "Error: npm not found."
  exit 1
fi
# Check npm >= 11.10.0 (required for npm trust)
if ! NPM_VER="$NPM_VER" node -e "
const v = process.env.NPM_VER || '';
const m = v.match(/^(\d+)\.(\d+)/);
if (!m) process.exit(1);
const a = Number(m[1]);
const b = Number(m[2]);
if (a > 11 || (a === 11 && b >= 10)) process.exit(0);
process.exit(1);
"; then
  echo "Error: npm trust requires npm@11.10.0 or above. Current: $NPM_VER"
  echo "  Run: npm install -g npm@^11.10.0"
  exit 1
fi

if [ "$DRY_RUN" != true ]; then
  # npm trust web-OTP only works when stdin/stdout are a TTY (see npm otplease).
  if [ ! -t 0 ] || [ ! -t 1 ]; then
    echo "Error: run this script in an interactive terminal so npm can open the 2FA browser flow." >&2
    exit 1
  fi
  echo "The first trust mutation may open a browser for 2FA."
  echo "On the npm page, enable skipping 2FA for 5 minutes so the rest of the packages can proceed."
  echo ""
fi

# Write trust list JSON to a temp file; print path. Empty file if none / error.
list_trusts_file() {
  local pkg="$1"
  local out
  out=$(mktemp)
  if ! npm trust list "$pkg" --json >"$out" 2>/dev/null; then
    : >"$out"
  fi
  echo "$out"
}

trust_ids_from_file() {
  node -e '
const fs = require("fs");
const raw = fs.readFileSync(process.argv[1], "utf8").trim();
if (!raw) process.exit(0);
let data;
try { data = JSON.parse(raw); } catch { process.exit(0); }
const items = Array.isArray(data) ? data : [data];
for (const t of items) if (t && t.id) console.log(t.id);
' "$1"
}

is_already_configured() {
  local pkg="$1"
  local file
  file=$(list_trusts_file "$pkg")
  DESIRED_FILE="$WORKFLOW_FILE" DESIRED_REPO="$REPO" node -e '
const fs = require("fs");
const raw = fs.readFileSync(process.argv[1], "utf8").trim();
fs.unlinkSync(process.argv[1]);
if (!raw) process.exit(1);
let data;
try { data = JSON.parse(raw); } catch { process.exit(1); }
const items = (Array.isArray(data) ? data : [data]).filter((t) => t && t.id);
if (items.length !== 1) process.exit(1);
const t = items[0];
process.exit(
  t.type === "github" &&
  t.file === process.env.DESIRED_FILE &&
  t.repository === process.env.DESIRED_REPO
    ? 0
    : 1
);
' "$file"
}

revoke_all_trusts() {
  local pkg="$1"
  local file id
  local -a ids=()
  file=$(list_trusts_file "$pkg")
  while IFS= read -r id; do
    [ -n "$id" ] || continue
    ids+=("$id")
  done < <(trust_ids_from_file "$file")
  rm -f "$file"

  if [ "${#ids[@]}" -eq 0 ]; then
    echo "  No existing trust to revoke for $pkg"
    return 0
  fi

  for id in "${ids[@]}"; do
    echo "  Revoke trust $id for $pkg"
    if [ "$DRY_RUN" = true ]; then
      echo "  [dry-run] Would: npm trust revoke $pkg --id=$id"
    else
      npm trust revoke "$pkg" --id="$id"
      sleep 1
    fi
  done
}

create_trust() {
  local pkg="$1"
  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] Would: npm trust github $pkg --file $WORKFLOW_FILE --repo $REPO --allow-publish -y"
    return 0
  fi
  echo "  Trust: $pkg"
  npm trust github "$pkg" --file "$WORKFLOW_FILE" --repo "$REPO" --allow-publish -y
}

ensure_trust() {
  local pkg="$1"

  if is_already_configured "$pkg"; then
    echo "  Already configured: $pkg ($WORKFLOW_FILE @ $REPO)"
    return 0
  fi

  # npm allows only one trusted publisher per package — always delete then create.
  revoke_all_trusts "$pkg"
  sleep 1

  set +e
  create_trust "$pkg"
  local ec=$?
  set -e

  if [ "$ec" -eq 0 ] || [ "$DRY_RUN" = true ]; then
    sleep 2
    return 0
  fi

  # E409 or stale list: revoke again and retry once.
  echo "  Create failed (exit $ec); revoking again and retrying once..."
  revoke_all_trusts "$pkg"
  sleep 2
  create_trust "$pkg"
  sleep 2
}

ROOT_PKG_NAME=$(node -p "require('$ROOT/package.json').name" 2>/dev/null || true)
for pkg_dir in packages/core packages/extension-* packages/create-app packages/cli; do
  [ -d "$pkg_dir" ] || continue
  [ -f "$pkg_dir/package.json" ] || continue
  if grep -q '"private":\s*true' "$pkg_dir/package.json" 2>/dev/null; then
    echo "Skip $pkg_dir (private)"
    continue
  fi
  PKG_NAME=$(node -p "require('$ROOT/$pkg_dir/package.json').name" 2>/dev/null || true)
  [ -n "$PKG_NAME" ] || continue
  if [ "$PKG_NAME" = "$ROOT_PKG_NAME" ]; then
    echo "Skip $pkg_dir (root package)"
    continue
  fi
  if [ -n "$ONLY_PACKAGE" ]; then
    if [ "$PKG_NAME" != "$ONLY_PACKAGE" ] && [ "$pkg_dir" != "$ONLY_PACKAGE" ] && [ "$pkg_dir" != "packages/$ONLY_PACKAGE" ]; then
      continue
    fi
  fi

  ensure_trust "$PKG_NAME"
done

echo ""
echo "Done. Ensure your workflow has: permissions.id-token: write"
