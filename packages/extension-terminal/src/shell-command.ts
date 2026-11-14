import {
  commandRegistry,
  describeShellCommands,
  registerAll,
  type ExecutionContext,
} from '@eclipse-docks/core';
import { runShellLine } from './commands-backend';

registerAll({
  command: {
    id: 'shell',
    name: 'Shell',
    description: describeShellCommands(),
    parameters: [
      {
        name: 'line',
        description: 'Shell line. && sequences, | passes the previous result, & does not wait. Any command id is allowed.',
        required: false,
      },
      {
        name: 'cwd',
        description: 'Workspace directory this line starts in. Omit to continue the current shell session.',
        required: false,
      },
    ],
  },
  handler: {
    execute: async (context: ExecutionContext) => {
      const line = context.params?.line;
      if (typeof line !== 'string' || !line.trim()) {
        return describeShellCommands();
      }
      const cwd = typeof context.params?.cwd === 'string'
        ? context.params.cwd
        : (context.cwd ?? '');
      return runShellLine(line, commandRegistry, {
        cwd,
        initialCwd: context.initialCwd ?? cwd,
        readLine: context.readLine,
        ask: context.ask,
      });
    },
  },
});
