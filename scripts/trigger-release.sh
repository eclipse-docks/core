#!/bin/bash
set -e

# Load .env file if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Parse command-line arguments
DRY_RUN=false
VERSION_PART="patch"

for arg in "$@"; do
    case $arg in
        --dry-run|-n)
            DRY_RUN=true
            ;;
        major|minor|patch)
            VERSION_PART="$arg"
            ;;
        *)
            echo "Unknown option: $arg"
            echo "Usage: $0 [--dry-run|-n] [major|minor|patch]"
            exit 1
            ;;
    esac
done

if [ "$DRY_RUN" = true ]; then
    echo "🔍 DRY RUN MODE - No changes will be pushed"
    echo ""
fi

echo "Running pre-release health checks (type-check, test, build, app build)..."
echo ""

npm run type-check
npm run test
npm run build
npm run build:app

echo ""
echo "✅ Pre-release health checks passed"
echo ""

echo "Incrementing $VERSION_PART version"

# Get latest version tag: try GitHub API first (works when git ls-remote gets no refs e.g. auth), then git ls-remote
echo "Fetching latest tags from remote..."
LATEST_TAG=""
if command -v gh &>/dev/null; then
  REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)
  if [ -n "$REPO" ]; then
    LATEST_TAG=$(gh api "/repos/$REPO/git/refs/tags" --paginate -q '.[].ref' 2>/dev/null | sed 's|^refs/tags/||' | grep -E '^v?[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1)
    [ -n "$LATEST_TAG" ] && echo "  (via GitHub: $REPO)"
  fi
fi
if [ -z "$LATEST_TAG" ]; then
  LATEST_TAG=$(git ls-remote --refs origin refs/tags/ 2>/dev/null | sed 's|.*refs/tags/||' | sed 's|\^{}$||' | grep -E '^v?[0-9]+\.[0-9]+\.[0-9]+$' | sort -V | tail -1)
fi
if [ -n "$LATEST_TAG" ]; then
  git fetch origin tag "$LATEST_TAG" 2>/dev/null || true
fi

if [ -z "$LATEST_TAG" ]; then
    echo "No version tags found on origin or GitHub. Starting with version 0.1.0"
    echo "  (Ensure origin points to the repo with releases: git remote -v)"
    NEXT_VERSION="0.1.0"
else
    echo "Latest tag: $LATEST_TAG"
    
    # Parse version parts (handle both v1.2.3 and 1.2.3 formats)
    if [[ $LATEST_TAG =~ ^v?([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
        MAJOR="${BASH_REMATCH[1]}"
        MINOR="${BASH_REMATCH[2]}"
        PATCH="${BASH_REMATCH[3]}"
        
        # Increment the specified version part and reset lower parts
        case $VERSION_PART in
            major)
                MAJOR=$((MAJOR + 1))
                MINOR=0
                PATCH=0
                ;;
            minor)
                MINOR=$((MINOR + 1))
                PATCH=0
                ;;
            patch)
                PATCH=$((PATCH + 1))
                ;;
        esac
        NEXT_VERSION="$MAJOR.$MINOR.$PATCH"
    else
        echo "Error: Could not parse version from tag: $LATEST_TAG"
        exit 1
    fi
fi

echo "Next version: $NEXT_VERSION"

# Get changes since last tag (with file stats for better AI context)
if [ -n "$LATEST_TAG" ]; then
    CHANGES=$(git log $LATEST_TAG..HEAD --oneline --no-decorate --stat)
else
    CHANGES=$(git log --oneline --no-decorate --stat)
fi

# Show changes
echo ""
if [ -n "$LATEST_TAG" ]; then
    echo "Changes since $LATEST_TAG:"
else
    echo "All changes:"
fi
echo "---"
echo "$CHANGES"
echo "---"
echo ""

if [ -z "$OPENAI_API_KEY" ] && [ -n "$CHANGES" ]; then
    echo "⚠ OPENAI_API_KEY not set — release description will use raw changelog. Set it in .env to enable AI summary."
    echo ""
fi

SUMMARY=""
if [ -n "$OPENAI_API_KEY" ] && [ -n "$CHANGES" ]; then
    echo "Generating AI summary of changes..."
    PAYLOAD_FILE=$(mktemp)
    trap "rm -f $PAYLOAD_FILE" EXIT
    # Build JSON in Python to avoid "Argument list too long" when CHANGES is large
    python3 - "$PAYLOAD_FILE" "$LATEST_TAG" << 'PYEOF'
import json, subprocess, sys
payload_path = sys.argv[1]
tag = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] else None
cmd = ['git', 'log', tag + '..HEAD', '--oneline', '--no-decorate', '--stat'] if tag else ['git', 'log', '--oneline', '--no-decorate', '--stat']
out = subprocess.run(cmd, capture_output=True, text=True)
content = (out.stdout or '')[:12000]
prompt = "Summarize the following git commits at an abstract level for end users. Focus on features, fixes, and improvements without technical implementation details. Keep it concise:\n\n" + content
with open(payload_path, 'w') as f:
    json.dump({"model": "gpt-4o-mini", "messages": [{"role": "user", "content": prompt}], "temperature": 0.7, "max_tokens": 500}, f)
PYEOF
    API_RESPONSE=$(curl -s https://api.openai.com/v1/chat/completions \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $OPENAI_API_KEY" \
        -d @"$PAYLOAD_FILE")
    
    # Extract content using python if available, otherwise fallback to grep/sed
    if command -v python3 &> /dev/null; then
        SUMMARY=$(echo "$API_RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['choices'][0]['message']['content'] if 'choices' in data else '')" 2>/dev/null)
    else
        SUMMARY=$(echo "$API_RESPONSE" | grep -o '"content"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/"content"[[:space:]]*:[[:space:]]*"\(.*\)"/\1/')
    fi
    
    if [ -n "$SUMMARY" ]; then
        echo ""
        echo "AI Summary:"
        echo "---"
        echo "$SUMMARY"
        echo "---"
        echo ""
    else
        echo "⚠ Could not extract AI summary (API error or invalid response). Release will use raw changelog."
        echo "$API_RESPONSE" | head -c 300
        echo ""
    fi
fi

# Commit subject for CI to detect (auto-tag workflow creates tag and release from commit body)
RELEASE_VERSION="v$NEXT_VERSION"

if [ "$DRY_RUN" = true ]; then
    echo ""
    echo "📝 Would create empty commit with message:"
    echo "---"
    echo "Subject: Release: $RELEASE_VERSION"
    echo ""
    echo "Body:"
    if [ -z "$CHANGES" ]; then
        echo "No changes since last release."
    elif [ -n "$SUMMARY" ]; then
        echo "$SUMMARY"
    else
        if [ -n "$LATEST_TAG" ]; then
            echo "Changes since $LATEST_TAG:"
        else
            echo "Initial release:"
        fi
        echo "$CHANGES"
    fi
    echo "---"
    echo ""
    git fetch origin 2>/dev/null || true
    LOCAL_COMMITS=$(git log origin/main..HEAD --oneline 2>/dev/null || git log origin/master..HEAD --oneline 2>/dev/null || echo "")
    if [ -n "$LOCAL_COMMITS" ]; then
        echo "Local commits that would be pushed:"
        echo "$LOCAL_COMMITS"
        echo ""
    fi
    echo "🚫 DRY RUN: No commit created, nothing pushed"
else
    MAIN_BRANCH="main"
    if ! git show-ref --verify --quiet refs/remotes/origin/main 2>/dev/null; then
        MAIN_BRANCH="master"
    fi
    git fetch origin 2>/dev/null || true
    LOCAL_COMMITS=$(git log origin/$MAIN_BRANCH..HEAD --oneline 2>/dev/null || echo "")
    if [ -n "$LOCAL_COMMITS" ]; then
        echo "Pushing local commits first..."
        echo "$LOCAL_COMMITS"
        echo ""
        git push origin HEAD:$MAIN_BRANCH
        echo "✓ Local commits pushed"
        echo ""
    fi

    COMMIT_MSG_FILE=$(mktemp)
    if [ -z "$CHANGES" ]; then
        printf 'Release: %s\n\nNo changes since last release.\n' "$RELEASE_VERSION" > "$COMMIT_MSG_FILE"
    elif [ -n "$SUMMARY" ]; then
        printf 'Release: %s\n\n%s\n' "$RELEASE_VERSION" "$SUMMARY" > "$COMMIT_MSG_FILE"
    else
        if [ -n "$LATEST_TAG" ]; then
            printf 'Release: %s\n\nChanges since %s:\n\n%s\n' "$RELEASE_VERSION" "$LATEST_TAG" "$CHANGES" > "$COMMIT_MSG_FILE"
        else
            printf 'Release: %s\n\nInitial release:\n\n%s\n' "$RELEASE_VERSION" "$CHANGES" > "$COMMIT_MSG_FILE"
        fi
    fi
    git commit --allow-empty -F "$COMMIT_MSG_FILE"
    rm -f "$COMMIT_MSG_FILE"
    echo "Pushing to remote..."
    git push origin HEAD:$MAIN_BRANCH
    echo "✓ Release $RELEASE_VERSION triggered successfully!"
    echo "The auto-tag workflow will create the tag and GitHub release (with this message as description), then publish to npm."
fi

