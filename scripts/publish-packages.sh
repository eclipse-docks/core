#!/usr/bin/env bash
# Publish npm workspace packages.
#
# All packages (core, extension-*, create-app, cli) at one version:
#   ./scripts/publish-packages.sh [VERSION]
#   Default VERSION is 0.0.0
#
# Single package only (build + publish that package; optional version bump):
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

SINGLE_PKG=""
ARGS=()
while [[ $# -gt 0 ]]; do
  case $1 in
    --package|-p)
      SINGLE_PKG="${2:?--package requires a path}"
      shift 2
      ;;
    *)
      ARGS+=("$1")
      shift
      ;;
  esac
done

normalize_pkg_path() {
  local p="$1"
  if [[ "$p" != packages/* ]]; then
    p="packages/$p"
  fi
  echo "$p"
}

publish_one() {
  local pkg_rel
  pkg_rel="$(normalize_pkg_path "$1")"
  local pkg_dir="$ROOT/$pkg_rel"
  local ver="${2:-}"

  if [[ ! -f "$pkg_dir/package.json" ]]; then
    echo "No package.json at $pkg_dir" >&2
    exit 1
  fi
  if grep -q '"private":\s*true' "$pkg_dir/package.json" 2>/dev/null; then
    echo "Refusing to publish: $pkg_rel is private" >&2
    exit 1
  fi

  echo "Publishing single package: $pkg_rel"
  echo ""

  if [[ -n "$ver" ]]; then
    echo "Setting version to $ver in $pkg_rel..."
    (cd "$pkg_dir" && npm version "$ver" --no-git-tag-version --allow-same-version)
    echo ""
  fi

  if node -e "
    const fs=require('fs');
    const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));
    process.exit(p.scripts && p.scripts.build ? 0 : 1);
  " "$pkg_dir/package.json"; then
    echo "Building $pkg_rel..."
    (cd "$pkg_dir" && npm run build)
    echo ""
  else
    echo "No build script in $pkg_rel; skipping build."
    echo ""
  fi

  echo "Publishing to npm..."
  (cd "$pkg_dir" && npm publish --access public)

  echo ""
  echo "Done. Published $pkg_rel${ver:+ at $ver}"
}

if [[ -n "$SINGLE_PKG" ]]; then
  publish_one "$SINGLE_PKG" "${ARGS[0]:-}"
  exit 0
fi

VERSION="${ARGS[0]:-0.0.0}"
PUBLISH_PKGS=(packages/core packages/extension-* packages/create-app packages/cli)

echo "Publishing core, extensions, create-app, and cli as version: $VERSION"
echo ""

echo "Updating package versions..."
for pkg in "${PUBLISH_PKGS[@]}"; do
  if [ -d "$pkg" ] && [ -f "$pkg/package.json" ]; then
    (cd "$pkg" && npm version "$VERSION" --no-git-tag-version --allow-same-version) && echo "  $pkg -> $VERSION"
  fi
done

echo ""
echo "Building core..."
npm run build

echo ""
echo "Publishing to npm..."
for pkg in "${PUBLISH_PKGS[@]}"; do
  if [ -d "$pkg" ] && [ -f "$pkg/package.json" ]; then
    if grep -q '"private":\s*true' "$pkg/package.json" 2>/dev/null; then
      echo "  Skip $pkg (private)"
    else
      echo "  Publishing $pkg..."
      (cd "$pkg" && npm publish --access public)
    fi
  fi
done

echo ""
echo "Done. Published core, extensions, create-app, and cli at $VERSION"
