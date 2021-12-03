/**
 * This file includes utility functions to read/process puzzle input
 */

import fs from 'fs/promises';
import path from 'path';

import { getRootPath } from './helpers';

export interface GetInputOptions {
    test?: boolean;
    transform?: (line: string) => unknown;
}

export type PuzzleInput = string[];

export async function getInput({ test, transform }: GetInputOptions = {}): Promise<
    PuzzleInput | unknown[]
> {
    const file = fs.readFile(path.join(getRootPath(), `input${test ? '_test' : ''}`), {
        encoding: 'utf-8',
    });
    return (await file).split('\n').map((line) => (transform ? transform(line) : line));
}
