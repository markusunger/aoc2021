/**
 * This file includes utility functions for setting up the solutions folder structure
 */

import path from 'path';
import fs from 'fs/promises';

import { fetchInput } from './external';
import { getRootPath, getDayDirectoryString } from './helpers';

export async function createSolutionTemplate(day: number) {
    try {
        const dirName = path.join(getRootPath(), getDayDirectoryString(day));
        await fs.mkdir(dirName);
        await fs.writeFile(`${dirName}/solution.ts`, '', { encoding: 'utf-8' });

        const puzzleInput = await fetchInput(day);
        if (puzzleInput) {
            await fs.writeFile(`${dirName}/input`, puzzleInput, { encoding: 'utf-8' });
            console.log(`Saved puzzle input for day ${day} ...`);
        } else {
            console.log(`No puzzle input file for day ${day} ...`);
        }
    } catch (e) {
        console.error(e);
        throw new Error(`Error during setup for day ${day}.`);
    }
}
