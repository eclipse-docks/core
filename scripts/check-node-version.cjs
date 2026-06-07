#!/usr/bin/env node
/** Vitest 4 + Vite 8 (rolldown) require Node >= 20.12 for util.styleText. */
const [major, minor] = process.versions.node.split('.').map(Number);
const ok = major > 20 || (major === 20 && minor >= 12) || major >= 21;

if (!ok) {
  console.error(
    `Node.js ${process.versions.node} is too old (running: ${process.execPath}).\n` +
      'This project requires Node >= 20.12 (see .nvmrc; recommended: 26).\n' +
      '\n' +
      'Your interactive terminal may show a newer Node via nvm, but npm tasks / CI\n' +
      'often use /usr/bin/node unless nvm is on PATH.\n' +
      '\n' +
      'Fix:\n' +
      '  nvm use          # in this repo\n' +
      '  nvm alias default 26\n' +
      '  Reload the Cursor/VS Code window after updating .vscode/settings.json'
  );
  process.exit(1);
}
