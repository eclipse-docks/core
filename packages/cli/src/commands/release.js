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
  const tag = gitOrNull(['describe', '--tags', '--abbrev=0', '--match', 'v*', 'HEAD'], cwd);
  if (!tag) return null;
  const trimmed = tag.trim();
  return VERSION_RE.test(trimmed) ? trimmed : null;
}

function findVersionCommit(cwd, version) {
  return gitOrNull(['rev-parse', '--verify', `${version}^{commit}`], cwd);
}

function currentBranch(cwd) {
  const branch = gitOrNull(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
  if (!branch || branch === 'HEAD') return null;
  return branch;
}

function upstreamStatus(cwd) {
  const upstream = gitOrNull(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}'], cwd);
  if (!upstream) return null;
  const counts = git(['rev-list', '--left-right', '--count', `${upstream}...HEAD`], cwd);
  const [behind, ahead] = counts.split('\t').map(Number);
  return { upstream, behind, ahead };
}

function pushBranchIfNeeded(cwd, { dryRun = false } = {}) {
  const branch = currentBranch(cwd);
  if (!branch) {
    throw new Error('Detached HEAD — checkout a branch before releasing.');
  }

  const status = upstreamStatus(cwd);
  if (!status) {
    throw new Error(`Branch ${branch} has no upstream. Push it first:\n  git push -u origin ${branch}`);
  }

  if (status.behind > 0) {
    throw new Error(
      `Branch ${branch} is ${status.behind} commit(s) behind ${status.upstream}. Pull before releasing.`,
    );
  }

  if (status.ahead === 0) return branch;

  if (dryRun) {
    console.log(`[dry run] would push ${status.ahead} commit(s) to origin ${branch}`);
    return branch;
  }

  console.log(`Pushing ${status.ahead} commit(s) to origin ${branch}...`);
  git(['push', 'origin', branch], cwd);
  return branch;
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
    if (since) console.log(`Summarizing commits since ${since}`);
    const summary = generateSummary(cwd, since);
    notes = await promptNotes(version, summary);
  }

  if (opts.dryRun) {
    if (opts.push) pushBranchIfNeeded(cwd, { dryRun: true });
    console.log(`\n[dry run] would create annotated tag ${version} at HEAD`);
    console.log(notes.replace(/^/gm, '  '));
    if (opts.push) {
      console.log(`[dry run] would push tag to origin ${version}`);
    }
    return;
  }

  if (opts.push) {
    pushBranchIfNeeded(cwd);
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
    console.log(`\nCreated annotated tag ${version}. Push your branch and tag to trigger the release:`);
    const branch = currentBranch(cwd);
    if (branch) console.log(`  git push origin ${branch}`);
    console.log(`  git push origin ${version}`);
  }
}
