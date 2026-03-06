#!/usr/bin/env bash
# Configure npm trusted publishing (OIDC) for GitHub Actions on each publishable package.
# Requires: npm@11.10.0+, 2FA enabled on npm account, packages already published at least once.
# Usage: ./scripts/setup-npm-trusted-publishing.sh [--dry-run] [package]
#   package: optional — package name (e.g. @eclipse-lyra/extension-foo) or path (e.g. packages/extension-foo).
#   If omitted, configures all publishable packages (core + extensions).
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

WORKFLOW_FILE="${WORKFLOW_FILE:-publish.yml}"
REPO="${NPM_TRUST_REPO:-eclipse-lyra/core}"

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
const [a, b] = (v.match(/^(\d+)\.(\d+)/) || []).slice(1, 3).map(Number);
if (!a || !b) process.exit(1);
if (a > 11 || (a === 11 && b >= 10)) process.exit(0);
process.exit(1);
"; then
  echo "Error: npm trust requires npm@11.10.0 or above. Current: $NPM_VER"
  echo "  Run: npm install -g npm@^11.10.0"
  exit 1
fi

ROOT_PKG_NAME=$(node -p "require('$ROOT/package.json').name" 2>/dev/null || true)
for pkg_dir in packages/core packages/extension-*; do
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

  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] Would run: npm trust github $PKG_NAME --file $WORKFLOW_FILE --repo $REPO -y"
  else
    echo "  Trust: $PKG_NAME"
    (npm trust github "$PKG_NAME" --file "$WORKFLOW_FILE" --repo "$REPO" -y) || true
    sleep 2
  fi
done

echo ""
echo "Done. Ensure your workflow has: permissions.id-token: write"
