import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

/** CLI arg / release tag name: exact `vX.Y.Z`. */
const VERSION_RE = /^v\d+\.\d+\.\d+$/;

function git(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed: ${result.stderr.trim()}`);
  }
  return result.stdout.trim();
}

function gitOrNull(args, cwd) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
}

function usage() {
  return 'Usage: docks release [major|minor|patch|vX.Y.Z] [-m "release notes"] [--since vX.Y.Z] [--dry-run] [--no-push]';
}

function parseArgs(argv) {
  const opts = { bump: 'patch', version: '', since: '', notes: '', dryRun: false, push: true };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === 'major' || arg === 'minor' || arg === 'patch') {
      opts.bump = arg;
    } else if (VERSION_RE.test(arg)) {
      opts.version = arg;
    } else if (arg === '--since') {
      const value = argv[++i] ?? '';
      if (!VERSION_RE.test(value)) {
        throw new Error(`--since requires a version like v1.2.3\n${usage()}`);
      }
      opts.since = value;
    } else if (arg === '-m' || arg === '--message') {
      opts.notes = argv[++i] ?? '';
    } else if (arg === '-n' || arg === '--dry-run') {
      opts.dryRun = true;
    } else if (arg === '-p' || arg === '--push') {
      opts.push = true;
    } else if (arg === '--no-push') {
      opts.push = false;
    } else {
      throw new Error(`Unknown argument: ${arg}\n${usage()}`);
    }
  }

  return opts;
}

function findLastVersion(cwd) {
  const tags = gitOrNull(['tag', '--list', 'v*', '--sort=-v:refname'], cwd);
  if (!tags) return null;
  for (const tag of tags.split('\n')) {
    const trimmed = tag.trim();
    if (VERSION_RE.test(trimmed)) return trimmed;
  }
  return null;
}

function findVersionCommit(cwd, version) {
  return gitOrNull(['rev-parse', '--verify', `${version}^{commit}`], cwd);
}

function bumpVersion(last, bump) {
  const [major, minor, patch] = last.slice(1).split('.').map(Number);
  switch (bump) {
    case 'major':
      return `v${major + 1}.0.0`;
    case 'minor':
      return `v${major}.${minor + 1}.0`;
    default:
      return `v${major}.${minor}.${patch + 1}`;
  }
}

function generateSummary(cwd, since) {
  const sinceCommit = since ? findVersionCommit(cwd, since) : null;
  if (since && !sinceCommit) {
    throw new Error(`No tag found for --since ${since}.`);
  }
  const range = sinceCommit ? `${sinceCommit}..HEAD` : 'HEAD';

  const log = gitOrNull(['log', range, '--no-merges', '--pretty=%s'], cwd) ?? '';
  const buckets = { features: [], fixes: [], docs: [], chores: [] };

  for (const subject of log.split('\n')) {
    if (!subject || VERSION_RE.test(subject.trim())) continue;

    const stripped = subject.includes(': ') ? subject.slice(subject.indexOf(': ') + 2) : subject;
    const text = stripped.charAt(0).toUpperCase() + stripped.slice(1);

    if (/^(feat|perf)/.test(subject)) buckets.features.push(text);
    else if (/^fix/.test(subject)) buckets.fixes.push(text);
    else if (/^docs/.test(subject)) buckets.docs.push(text);
    else if (/^(chore|ci|build|test|refactor|style)/.test(subject)) buckets.chores.push(text);
    else buckets.features.push(text);
  }

  const sections = [];
  const render = (title, items) => {
    if (items.length) sections.push(`${title}\n${items.map((i) => `- ${i}`).join('\n')}`);
  };
  render('Features', buckets.features);
  render('Fixes', buckets.fixes);
  render('Docs', buckets.docs);
  render('Chore/Refactor', buckets.chores);

  return sections.join('\n\n');
}

async function promptNotes(version, summary) {
  console.log(`Enter release notes for ${version} (end with an empty line).`);
  if (summary) {
    console.log('Press Enter on an empty first line to use this auto-generated summary:');
    console.log(summary.replace(/^/gm, '  '));
  }

  const rl = createInterface({ input: process.stdin });
  const lines = [];
  for await (const line of rl) {
    if (line === '') break;
    lines.push(line);
  }
  rl.close();

  return lines.length ? lines.join('\n') + '\n' : summary ? summary + '\n' : '';
}

export async function release(argv, cwd = process.cwd()) {
  const opts = parseArgs(argv);

  if (!opts.dryRun && git(['status', '--porcelain'], cwd) !== '') {
    throw new Error('Working tree is not clean. Commit or stash your changes first.');
  }

  const last = findLastVersion(cwd);
  let version = opts.version;
  if (!version) {
    version = bumpVersion(last ?? 'v0.0.0', opts.bump);
    console.log(`Last release tag: ${last ?? 'v0.0.0'}`);
  }

  if (gitOrNull(['rev-parse', version], cwd)) {
    throw new Error(`Tag ${version} already exists.`);
  }

  let notes = opts.notes;
  if (!notes) {
    const since = opts.since || last;
    if (opts.since) console.log(`Summarizing commits since ${opts.since}`);
    const summary = generateSummary(cwd, since);
    notes = await promptNotes(version, summary);
  }

  if (opts.dryRun) {
    console.log(`\n[dry run] would create annotated tag ${version} at HEAD`);
    console.log(notes.replace(/^/gm, '  '));
    if (opts.push) {
      console.log(`[dry run] would push tag to origin ${version}`);
    }
    return;
  }

  const tagArgs = ['tag', '-a', version, '-m', version];
  if (notes.trim()) {
    tagArgs.push('-m', notes.trimEnd());
  }
  git(tagArgs, cwd);

  if (opts.push) {
    git(['push', 'origin', version], cwd);
    console.log(`\nPushed tag ${version}; the release workflow will take over.`);
  } else {
    console.log(`\nCreated annotated tag ${version}. Push it to trigger the release:`);
    console.log(`  git push origin ${version}`);
  }
}
