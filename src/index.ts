import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

async function askQuestion(query: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve =>
        rl.question(query, ans => {
            rl.close();
            resolve(ans.toLowerCase() === 'y');
        })
    );
}

async function install(targetDir: string) {
    const sourceDir = path.join(__dirname, 'hooks');
    const gitDir = path.join(targetDir, '.git');
    const targetHookDir = path.join(gitDir, 'hooks');

    if (!fs.existsSync(sourceDir)) {
        console.error(`Error: Could not find source hooks directory at ${sourceDir}`);
        return;
    }

    if (!fs.existsSync(gitDir) || !fs.lstatSync(gitDir).isDirectory()) {
        console.error(`Error: Target directory is not a Git repository: ${targetDir}`);
        return;
    }

    fs.readdirSync(sourceDir).forEach(async (file) => {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetHookDir, file);

        if (fs.existsSync(targetFile)) {
            console.log(`Warning: Hook already exists: ${file}`);
            const overwrite = await askQuestion('Do you want to overwrite it? (y/n): ');
            if (!overwrite) {
                console.log(`Skipping: ${file}`);
                return;
            }
        }

        fs.copyFileSync(sourceFile, targetFile);
        fs.chmodSync(targetFile, '755');
    });

    console.log(`Installed git hooks in ${targetDir}`);
}

export { install };
