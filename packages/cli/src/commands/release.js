import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';

/** CLI arg / new release commit subject: exact `vX.Y.Z`. */
const VERSION_RE = /^v\d+\.\d+\.\d+$/;
/** Discover last release from exact `vX.Y.Z` or legacy `Release: vX.Y.Z`. */
const VERSION_IN_SUBJECT_RE = /^(?:Release:\s*)?(v\d+\.\d+\.\d+)$/i;

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

function parseVersionSubject(subject) {
  const m = subject.trim().match(VERSION_IN_SUBJECT_RE);
  if (!m) return null;
  return `v${m[1].slice(1)}`;
}

function parseArgs(argv) {
  const opts = { bump: 'patch', version: '', notes: '', dryRun: false, push: true };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === 'major' || arg === 'minor' || arg === 'patch') {
      opts.bump = arg;
    } else if (VERSION_RE.test(arg)) {
      opts.version = arg;
    } else if (arg === '-m' || arg === '--message') {
      opts.notes = argv[++i] ?? '';
    } else if (arg === '-n' || arg === '--dry-run') {
      opts.dryRun = true;
    } else if (arg === '-p' || arg === '--push') {
      opts.push = true;
    } else if (arg === '--no-push') {
      opts.push = false;
    } else {
      throw new Error(
        `Unknown argument: ${arg}\nUsage: docks release [major|minor|patch|vX.Y.Z] [-m "release notes"] [--dry-run] [--no-push]`,
      );
    }
  }

  return opts;
}

function findLastVersion(cwd) {
  const log = gitOrNull(['log', '--pretty=%s'], cwd);
  if (!log) return null;
  for (const subject of log.split('\n')) {
    const version = parseVersionSubject(subject);
    if (version) return version;
  }
  return null;
}

function findVersionCommit(cwd, version) {
  const escaped = version.replace(/\./g, '\\.');
  return gitOrNull(
    ['log', '-E', '-i', '--pretty=%H', '-1', `--grep=^(Release:[[:space:]]*)?${escaped}$`],
    cwd,
  );
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

function generateSummary(cwd, last) {
  const lastCommit = last ? findVersionCommit(cwd, last) : null;
  const range = lastCommit ? `${lastCommit}..HEAD` : 'HEAD';

  const log = gitOrNull(['log', range, '--no-merges', '--pretty=%s'], cwd) ?? '';
  const buckets = { features: [], fixes: [], docs: [], chores: [] };

  for (const subject of log.split('\n')) {
    if (!subject || parseVersionSubject(subject)) continue;

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
    console.log(`Last version commit: ${last ?? 'v0.0.0'}`);
  }

  if (gitOrNull(['rev-parse', version], cwd)) {
    throw new Error(`Tag ${version} already exists.`);
  }

  let notes = opts.notes;
  if (!notes) {
    const summary = generateSummary(cwd, last);
    notes = await promptNotes(version, summary);
  }

  if (opts.dryRun) {
    console.log(`\n[dry run] would create empty commit:\n  ${version}\n`);
    console.log(notes.replace(/^/gm, '  '));
    if (opts.push) {
      const branch = git(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
      console.log(`[dry run] would push to origin ${branch}`);
    }
    return;
  }

  git(['commit', '--allow-empty', '-m', version, '-m', notes], cwd);

  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
  if (opts.push) {
    git(['push', 'origin', branch], cwd);
    console.log(`\nPushed ${version} to origin/${branch}; the release workflow will take over.`);
  } else {
    console.log(`\nCreated release commit for ${version}. Push it to trigger the release:`);
    console.log(`  git push origin ${branch}`);
  }
}
