#!/usr/bin/env node

import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs';
import { dirname, join, resolve, basename } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = join(__dirname, 'template');

function parseArgs() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const projectDir = args[0] || 'my-docks-app';
  const yes = process.argv.includes('--yes') || process.argv.includes('-y');
  return { projectDir, yes };
}

function main() {
  const { projectDir, yes } = parseArgs();
  const targetDir = resolve(process.cwd(), projectDir);
  const appName = basename(targetDir);

  if (existsSync(targetDir)) {
    console.error(`Error: Directory "${projectDir}" already exists.`);
    process.exit(1);
  }

  if (!existsSync(TEMPLATE_DIR)) {
    console.error('Error: Template directory not found. Reinstall @eclipse-docks/create-app.');
    process.exit(1);
  }

  console.log(`Creating app in ${targetDir}...`);
  mkdirSync(targetDir, { recursive: true });
  cpSync(TEMPLATE_DIR, targetDir, { recursive: true });
  const appDescription = `${appName} – Application built with Eclipse Docks.`;

  const rootPkgPath = join(targetDir, 'package.json');
  const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));
  rootPkg.name = appName;
  rootPkg.scripts.dev = `npm run dev -w ${appName}`;
  rootPkg.scripts.build = `npm run build -w ${appName}`;
  rootPkg.scripts.preview = `npm run preview -w ${appName}`;
  writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');

  const appPkgPath = join(targetDir, 'packages', 'app', 'package.json');
  const appPkg = JSON.parse(readFileSync(appPkgPath, 'utf8'));
  appPkg.name = appName;
  appPkg.description = appDescription;
  writeFileSync(appPkgPath, JSON.stringify(appPkg, null, 2) + '\n');

  const mainTsPath = join(targetDir, 'packages', 'app', 'src', 'main.ts');
  let mainTs = readFileSync(mainTsPath, 'utf8');
  mainTs = mainTs.replace(/\{\{APP_NAME\}\}/g, appName);
  writeFileSync(mainTsPath, mainTs);

  function escapeForSingleQuotedTs(s) {
    return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
  const viteConfigPath = join(targetDir, 'packages', 'app', 'vite.config.ts');
  let viteConfig = readFileSync(viteConfigPath, 'utf8');
  viteConfig = viteConfig.replace(/\{\{APP_NAME\}\}/g, escapeForSingleQuotedTs(appName));
  viteConfig = viteConfig.replace(/\{\{APP_DESCRIPTION\}\}/g, escapeForSingleQuotedTs(appDescription));
  writeFileSync(viteConfigPath, viteConfig);

  const logoSvgPath = join(targetDir, 'packages', 'app', 'public', 'logo.svg');
  let logoSvg = readFileSync(logoSvgPath, 'utf8');
  logoSvg = logoSvg.replace(/\{\{APP_NAME\}\}/g, appName);
  writeFileSync(logoSvgPath, logoSvg);

  const logoLoadingPath = join(targetDir, 'packages', 'app', 'public', 'logo-loading.svg');
  let logoLoading = readFileSync(logoLoadingPath, 'utf8');
  logoLoading = logoLoading.replace(/\{\{APP_NAME\}\}/g, appName);
  writeFileSync(logoLoadingPath, logoLoading);

  const readmePath = join(targetDir, 'README.md');
  let readme = readFileSync(readmePath, 'utf8');
  readme = readme.replace(/\{\{APP_NAME\}\}/g, appName);
  writeFileSync(readmePath, readme);

  const gitignoreSrc = join(targetDir, '_gitignore');
  if (existsSync(gitignoreSrc)) {
    writeFileSync(join(targetDir, '.gitignore'), readFileSync(gitignoreSrc, 'utf8'));
    unlinkSync(gitignoreSrc);
  }

  console.log('Installing dependencies...');
  const install = spawnSync('npm', ['install'], { cwd: targetDir, stdio: 'inherit', shell: true });
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }

  console.log('\nDone! Next steps:\n');
  console.log(`  cd ${projectDir}`);
  console.log('  npm run dev\n');
}

main();
