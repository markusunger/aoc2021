import { zip } from 'lodash';
import { getInput, PuzzleInput } from '../utils';

type Vent = [string, string];
type Tile = { ventCount: number };
type Grid = Record<string, Tile>;

// helper to create all number values between the min and max value of an array of numbers
const fromMinToMax = (limits: number[]) =>
    Array.from(
        { length: Math.max(...limits) - Math.min(...limits) + 1 },
        (_, i) => i + Math.min(...limits),
    );

// helper to create all number values between (and including) two numbers in correct ascending or descending order
const fromTo = (p1: number, p2: number): number[] =>
    p1 > p2
        ? Array.from({ length: p1 - p2 + 1 }, (_, i) => p1 - i)
        : Array.from({ length: p2 - p1 + 1 }, (_, i) => p1 + i);

async function solution(part2 = false) {
    const input = (await getInput()) as PuzzleInput;
    const vents = input.map((line) => line.split(' -> ')) as Vent[];

    const grid = vents.reduce((acc, vent) => {
        const groups = (
            vent.join(' ').match(/(?<x1>\d+),(?<y1>\d+)\s(?<x2>\d+),(?<y2>\d+)/) as RegExpMatchArray
        ).groups as Record<string, string>;

        let coords: string[] = [];
        if (groups.x1 === groups.x2) {
            const limits = [Number(groups.y1), Number(groups.y2)];
            const ys = fromMinToMax(limits);
            coords = ys.map((y) => `${groups.x1},${y}`);
        } else if (groups.y1 === groups.y2) {
            const limits = [Number(groups.x1), Number(groups.x2)];
            const xs = fromMinToMax(limits);
            coords = xs.map((x) => `${x},${groups.y1}`);
        } else if (part2) {
            const xs = fromTo(Number(groups.x1), Number(groups.x2));
            const ys = fromTo(Number(groups.y1), Number(groups.y2));

            coords = zip(xs, ys).map(([x, y]) => `${x},${y}`);
        }
        coords.forEach((coord) => {
            if (acc[coord]) {
                acc[coord].ventCount += 1;
            } else {
                acc[coord] = { ventCount: 1 };
            }
        });

        return acc;
    }, {} as Grid);

    console.log(
        `Part ${part2 ? '2' : '1'} solution: ${
            Object.values(grid).filter((tile) => tile.ventCount > 1).length
        }`,
    );
}

solution()
    .then(() => solution(true))
    .catch((e) => console.error(e));
