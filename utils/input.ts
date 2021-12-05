/**
 * This file includes utility functions to read/process puzzle input
 */

import fs from 'fs/promises';
import path from 'path';

import { getRootPath } from './helpers';

export interface GetInputOptions {
    test?: boolean;
}

export type PuzzleInput = string[];

export async function getInput({ test }: GetInputOptions = {}): Promise<PuzzleInput> {
    const file = fs.readFile(path.join(getRootPath(), `input${test ? '_test' : ''}`), {
        encoding: 'utf-8',
    });
    return (await file).split('\n');
}
