import { getInput } from '../utils';

async function solution(part2 = false) {
    const input = (await getInput())[0].split(',').map(Number);
    const positions = Array.from(Array(Math.max(...input) - Math.min(...input) + 1)).map(
        (_, i) => i,
    );
    const costsTotal = positions.map((position) =>
        input.reduce((cost, pos) => {
            const absDifference = Math.abs(pos - position);
            if (part2) {
                // see https://en.wikipedia.org/wiki/Triangular_number
                return cost + (absDifference / 2) * (absDifference + 1) || 0;
            }
            return cost + absDifference;
        }, 0),
    );

    console.log(`Part ${part2 ? '2' : '1'} solution: ${Math.min(...costsTotal)}`);
}

solution()
    .then(() => solution(true))
    .catch((e) => console.error(e));
