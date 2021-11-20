/**
 * This file includes utility functions that don't fit anywhere else
 */

import path from 'path';

/**
 * From the input number that represents the day returns the directory string
 * under which this day's solution and input resides
 *
 * @params day - The day for which to get the directory string
 * @returns The directory string for the given day
 */
export function getDayDirectoryString(day: number) {
    return day < 10 ? `day0${day}` : `day${day.toString()}`;
}

/**
 * Returns the root path of this repository
 *
 * @returns The root path of the initial context of execution
 */
export function getRootPath() {
    return path.dirname(process.argv[1]);
}
