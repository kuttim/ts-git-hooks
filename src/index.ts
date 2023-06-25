import * as fs from 'fs';
import * as path from 'path';

function install(targetDir: string) {
  const sourceDir = path.join(__dirname, 'hooks');
  const targetHookDir = path.join(targetDir, '.git', 'hooks');

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Could not find source hooks directory at ${sourceDir}`);
    return;
  }

  if (!fs.existsSync(targetHookDir)) {
    console.error(`Error: Could not find target hooks directory at ${targetHookDir}`);
    return;
  }

  fs.readdirSync(sourceDir).forEach((file) => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetHookDir, file);
    fs.copyFileSync(sourceFile, targetFile);
    fs.chmodSync(targetFile, '755');
  });

  console.log(`Installed git hooks in ${targetDir}`);
}

export { install };
