#!/usr/bin/env bash
set -e
VERSION="${1:-0.0.0}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "Publishing core and all extensions as version: $VERSION"
echo ""

echo "Updating package versions..."
for pkg in packages/core packages/extension-*; do
  if [ -d "$pkg" ] && [ -f "$pkg/package.json" ]; then
    (cd "$pkg" && npm version "$VERSION" --no-git-tag-version --allow-same-version) && echo "  $pkg -> $VERSION"
  fi
done

echo ""
echo "Building core..."
npm run build

echo ""
echo "Publishing to npm (you must be logged in: npm login)..."
for pkg in packages/core packages/extension-*; do
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
echo "Done. Published core and all extensions at $VERSION"
