# @eclipse-docks/cli

Developer CLI for apps built on Eclipse Docks.

## Usage

```bash
npx @eclipse-docks/cli release                       # bump patch, prompt for release notes
npx @eclipse-docks/cli release minor                 # bump minor
npx @eclipse-docks/cli release major -m "notes"      # bump major with inline release notes
npx @eclipse-docks/cli release v1.2.3                # explicit version
npx @eclipse-docks/cli release --since v1.2.0        # notes from commits since that tag
npx @eclipse-docks/cli release --dry-run             # print what would be tagged
npx @eclipse-docks/cli release --no-push             # create the tag locally without pushing
```

## `release`

Creates an annotated tag whose name is the version (`vX.Y.Z`) and pushes it.
When pushing (the default), any unpushed commits on the current branch are pushed
to `origin` first so CI builds code that is on the remote branch, not only reachable
via the tag. Pair this with a CI workflow triggered by `v*` tag pushes (see
[`.github/workflows/app-release.yml`](../../.github/workflows/app-release.yml) for a
reusable one) — the tag message body becomes the GitHub Release notes.

The last version is the most recent `vX.Y.Z` tag reachable from `HEAD` (via
`git describe`), not the highest semver tag in the repository. That drives the
default bump and changelog range.

If no release notes are given via `-m`, an end-user-facing summary is generated from the
commits since that tag (or since `--since vX.Y.Z` when set), grouped under **Features**,
**Fixes**, **Docs**, and **Chore/Refactor**, and offered as the default (press Enter on
an empty first line to accept it).
