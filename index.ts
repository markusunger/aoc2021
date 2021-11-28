import path from 'path';
import fs from 'fs/promises';
import { spawn } from 'child_process';

import { createSolutionTemplate } from './utils/setup';
import { getDayDirectoryString } from './utils';

const [, , dayString] = process.argv;
const day = parseInt(dayString, 10);

if (Number.isNaN(day)) {
    console.error(
        'Please start with npm start <day> - day being the numerical value of the day you want to solve the puzzle for.',
    );
    process.exit(1);
}

async function main() {
    let solutionExists = false;

    try {
        await fs.lstat(path.join(__dirname, getDayDirectoryString(day)));
        solutionExists = true;
    } catch (e) {
        // continue
    }

    if (!solutionExists) await createSolutionTemplate(day);

    spawn('nodemon', ['-x', 'ts-node', `./solution.ts`], {
        stdio: 'inherit',
        shell: true,
        cwd: path.join(__dirname, getDayDirectoryString(day)),
    });
}

try {
    main();
} catch (e) {
    console.error(e);
}
