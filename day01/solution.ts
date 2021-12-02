import { getInput } from '../utils';

async function solution() {
    const input = await getInput();

    // part 1
    const increaseCount = input
        .map(Number)
        .map((depth, idx, arr) => depth > (arr[idx - 1] || Number.POSITIVE_INFINITY))
        .reduce((acc, sum) => (sum ? acc + 1 : acc), 0);
    console.log(`Part 1 solution: ${increaseCount}`);

    // part 2
    const windowedIncreaseCount = input
        .map(Number)
        .reduce(
            (acc, curr, idx, arr) =>
                idx + 2 > arr.length ? acc : [...acc, curr + arr[idx + 1] + arr[idx + 2]],
            [] as number[],
        )
        .map((depth, idx, arr) => depth > (arr[idx - 1] || Number.POSITIVE_INFINITY))
        .reduce((acc, sum) => (sum ? acc + 1 : acc), 0);
    console.log(`Part 2 solution: ${windowedIncreaseCount}`);
}

solution()
    .then()
    .catch((e) => console.error(e));
