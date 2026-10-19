const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() && entry.name !== 'node_modules' ? files(path.join(dir, entry.name)) : entry.isFile() && entry.name.endsWith('.js') ? [path.join(dir, entry.name)] : []); }
const targets = [...files(path.join(root, 'server')), ...files(path.join(root, 'scripts'))];
for (const file of targets) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
console.log(`Syntax check passed for ${targets.length} JavaScript files.`);