/* eslint-disable no-param-reassign */
import { unzip } from 'lodash';
import { getInput, PuzzleInput } from '../utils';

type BitCount = Record<string, number>;

enum LifeSupportRating {
    OXYGEN_GENERATOR = 'oxygenGenerator',
    CO2_SCRUBBER = 'co2Scrubber',
}

// helper to inverse a binary number string (0 -> 1 and vice-versa)
const flipBits = (string: string) =>
    string
        .split('')
        .map((bit) => (bit === '1' ? '0' : '1'))
        .join('');

// helper to count occurences of bits at all positions in a list of binary number strings
const countOnPos = (numbers: PuzzleInput): BitCount[] => {
    const inputRotated = unzip(numbers.map((line) => line.split('')));
    const countsByPos = inputRotated.map((posBits) =>
        posBits.reduce(
            (sums, bit) => {
                sums[bit] += 1;
                return sums;
            },
            { 0: 0, 1: 0 } as BitCount,
        ),
    );
    return countsByPos;
};

async function solution() {
    const input = (await getInput()) as PuzzleInput;

    // part 1
    const gamma = countOnPos(input)
        .map((counts) => (counts[0] > counts[1] ? '0' : '1'))
        .join('');

    // there is a funky way to use bit shift operations and a bitmask to inverse a binary number
    // like `~num & bitmask`, but trying to understand it was too much at 9pm :P
    const epsilon = parseInt(flipBits(gamma), 2);
    const energyConsumption = parseInt(gamma, 2) * epsilon;

    console.log(`Part 1 solution: ${energyConsumption}`);

    // part 2
    const filterByCriteria = (
        partialInput: string[],
        pos: number,
        rating: LifeSupportRating,
    ): string => {
        if (partialInput.length === 1) return partialInput[0];

        const bitCounts = countOnPos(partialInput);
        const newInput = partialInput.filter((number) => {
            const [zeros, ones] = Object.values(bitCounts[pos]);
            if (rating === LifeSupportRating.OXYGEN_GENERATOR) {
                return number[pos] === '1' ? ones >= zeros : zeros > ones;
            }
            return number[pos] === '0' ? zeros <= ones : ones < zeros;
        });
        return filterByCriteria(newInput, pos + 1, rating);
    };

    const oxygenRating = filterByCriteria(input, 0, LifeSupportRating.OXYGEN_GENERATOR);
    const scrubberRating = filterByCriteria(input, 0, LifeSupportRating.CO2_SCRUBBER);

    console.log(`Part 2 solution: ${parseInt(oxygenRating, 2) * parseInt(scrubberRating, 2)}`);
}

solution()
    .then()
    .catch((e) => console.error(e));
