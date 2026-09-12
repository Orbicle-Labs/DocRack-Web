import { spawnSync } from 'node:child_process';

// The optional webpack analyser has its own command; ordinary builds use Turbopack.
const result = spawnSync(
  process.execPath,
  ['node_modules/next/dist/bin/next', 'build', '--webpack'],
  {
    stdio: 'inherit',
    env: { ...process.env, ANALYZE: 'true' },
  }
);
process.exit(result.status ?? 1);
