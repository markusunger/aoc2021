/**
 * This file includes utility functions for getting external data, i.e. from the AoC website
 */

import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SESSION_COOKIE) {
    throw new Error(
        'AoC website session cookie not found. Add it to the .env file of the project.',
    );
}

const instance = axios.create({
    baseURL: 'https://adventofcode.com/',
    timeout: 1000,
    headers: {
        Cookie: `session=${process.env.SESSION_COOKIE}`,
    },
});

export async function getInput(day: number): Promise<string | void> {
    let result;
    try {
        result = await instance.request({
            url: `2021/${day}/input`,
            method: 'GET',
        });
    } catch (e) {
        if ((e as AxiosError).response?.status === 404) {
            // receiving a 404 means there is no input for this particular day's puzzle
            result = undefined;
        } else {
            console.error(e);
            throw new Error(`Request for getting day ${day} input failed.`);
        }
    }

    return result?.data;
}
