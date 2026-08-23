#!/usr/bin/env bash
# Publish npm workspace packages.
#
# All packages (core, extension-*, create-app, cli) at one version:
#   ./scripts/publish-packages.sh [VERSION]
#   Default VERSION is 0.0.0
#
# Single package only:
#   ./scripts/publish-packages.sh --package packages/extension-pwa [VERSION]
#   ./scripts/publish-packages.sh -p extension-pwa [VERSION]
#
# Runs `npm login` first (interactive), then version bumps, build, and publish.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Log in to npm (required before publish)."
npm login
echo ""

PACKAGE=""
VERSION=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --package|-p)
      PACKAGE="${2:?--package requires a path}"
      shift 2
      ;;
    *)
      VERSION="$1"
      shift
      ;;
  esac
done

normalize_pkg_path() {
  local p="$1"
  [[ "$p" == packages/* ]] || p="packages/$p"
  echo "$p"
}

if [[ -n "$PACKAGE" ]]; then
  PUBLISH_PKGS=("$(normalize_pkg_path "$PACKAGE")")
else
  PUBLISH_PKGS=(packages/core packages/extension-* packages/create-app packages/cli)
fi

VERSION="${VERSION:-0.0.0}"

has_build_script() {
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
    process.exit(pkg.scripts?.build ? 0 : 1);
  " "$1/package.json"
}

is_private() {
  grep -q '"private":\s*true' "$1/package.json" 2>/dev/null
}

if [[ ${#PUBLISH_PKGS[@]} -eq 1 ]]; then
  pkg="${PUBLISH_PKGS[0]}"
  if [[ ! -f "$pkg/package.json" ]]; then
    echo "No package.json at $pkg" >&2
    exit 1
  fi
  if is_private "$pkg"; then
    echo "Refusing to publish: $pkg is private" >&2
    exit 1
  fi
fi

echo "Publishing ${#PUBLISH_PKGS[@]} package(s) as version: $VERSION"
echo ""

echo "Updating package versions..."
for pkg in "${PUBLISH_PKGS[@]}"; do
  if [[ -d "$pkg" && -f "$pkg/package.json" ]]; then
    (cd "$pkg" && npm version "$VERSION" --no-git-tag-version --allow-same-version) && echo "  $pkg -> $VERSION"
  fi
done

echo ""
echo "Building..."
if [[ ${#PUBLISH_PKGS[@]} -eq 1 ]]; then
  pkg="${PUBLISH_PKGS[0]}"
  if has_build_script "$pkg"; then
    echo "  $pkg"
    (cd "$pkg" && npm run build)
  else
    echo "  (no build script in $pkg)"
  fi
else
  npm run build
  npm run build:extensions
fi

echo ""
echo "Publishing to npm..."
published=0
for pkg in "${PUBLISH_PKGS[@]}"; do
  if [[ ! -d "$pkg" || ! -f "$pkg/package.json" ]]; then
    continue
  fi
  if is_private "$pkg"; then
    echo "  Skip $pkg (private)"
    continue
  fi
  echo "  Publishing $pkg..."
  (cd "$pkg" && npm publish --access public)
  published=$((published + 1))
done

echo ""
echo "Done. Published $published package(s) at $VERSION"
