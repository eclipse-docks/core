#!/usr/bin/env node
import { commands } from './src/index.js';

async function main() {
  const [name, ...rest] = process.argv.slice(2);
  const command = name ? commands[name] : undefined;

  if (!command) {
    console.error(
      `Usage: docks <command> [...args]\n\nCommands:\n${Object.keys(commands)
        .map((c) => `  ${c}`)
        .join('\n')}`,
    );
    process.exit(name ? 1 : 0);
  }

  await command(rest);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
