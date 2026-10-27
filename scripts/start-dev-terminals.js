#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

function quoteForAppleScript(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function openTerminal(command, title) {
  const escapedCommand = quoteForAppleScript(command);
  const script = `tell application "Terminal"\n activate\n do script "${escapedCommand}"\n set custom title of front window to "${title}"\nend tell`;
  spawn('osascript', ['-e', script], { stdio: 'inherit' });
}

if (process.platform !== 'darwin') {
  console.error('This script currently opens separate macOS Terminal windows.');
  process.exit(1);
}

openTerminal(`cd "${repoRoot}" && npm run dev:frontend`, 'Workffice Frontend');
openTerminal(`cd "${repoRoot}" && npm run dev:backend`, 'Workffice Backend');
