const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.join(rootDir, 'apps', 'workffice-backend');
const envFile = path.join(backendDir, '.env');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    process.env[key] = value;
  });
}

function removeIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function removeStaleDbFiles() {
  const dbFiles = [
    'db_authentication.mv.db',
    'db_authentication.trace.db',
    'db_backoffice.mv.db',
    'db_backoffice.trace.db',
    'db_booking.mv.db',
    'db_booking.trace.db',
  ];

  dbFiles.forEach((fileName) => removeIfExists(path.join(backendDir, fileName)));
}

loadEnvFile(envFile);
removeStaleDbFiles();

const executable = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
const args = ['bootRun', '--no-daemon', '--continuous'];

const child = spawn(executable, args, {
  cwd: backendDir,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
