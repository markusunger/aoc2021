import { getInput } from '../utils';

async function part1() {
    // keeping the fish simulation approach because it at least works for part 1
    const input = await getInput();
    let fish = input[0].split(',').map(Number);

    for (let i = 1; i <= 80; i += 1) {
        let newFishCount = 0;
        fish = fish
            .map((f) => {
                if (f === 0) {
                    newFishCount += 1;
                    return 6;
                }
                return f - 1;
            })
            .concat(Array.from({ length: newFishCount }, () => 8));
    }

    console.log(`Part 1 solution: ${fish.length}`);
}

async function part2() {
    const input = await getInput();
    const dailyFish = input[0]
        .split(',')
        .map(Number)
        .reduce(
            (acc, value) => {
                acc[value] += 1;
                return acc;
            },
            Array.from({ length: 9 }, () => 0),
        );

    for (let i = 1; i <= 256; i += 1) {
        const zeros = dailyFish.shift() as number;
        dailyFish.push(zeros);
        dailyFish[6] += zeros;
    }

    console.log(`Part 2 solution: ${dailyFish.reduce((acc, val) => acc + val)}`);
}

part1()
    .then(() => part2())
    .catch((e) => console.error(e));
