# @eclipse-docks/cli

Developer CLI for apps built on Eclipse Docks.

## Usage

```bash
npx @eclipse-docks/cli release                       # bump patch, prompt for release notes
npx @eclipse-docks/cli release minor                 # bump minor
npx @eclipse-docks/cli release major -m "notes"      # bump major with inline release notes
npx @eclipse-docks/cli release v1.2.3                # explicit version
npx @eclipse-docks/cli release --since v1.2.0        # notes from that version (bump still from latest)
npx @eclipse-docks/cli release --dry-run             # print what would be committed
npx @eclipse-docks/cli release --no-push             # commit locally without pushing
```

## `release`

Creates an empty commit whose subject is the next version (`vX.Y.Z`) and pushes it.
Pair this with a CI workflow that tags/releases on that commit subject (see
[`.github/workflows/app-release.yml`](../../.github/workflows/app-release.yml) for a
reusable one) — the commit body becomes the release notes.

The last version is taken from the most recent commit whose subject is exactly `vX.Y.Z`
or the legacy form `Release: vX.Y.Z`. That drives the default bump.

If no release notes are given via `-m`, an end-user-facing summary is generated from the
commits since that version (or since `--since vX.Y.Z` when set), grouped under
**Features**, **Fixes**, **Docs**, and **Chore/Refactor**, and offered as the default
(press Enter on an empty first line to accept it).
