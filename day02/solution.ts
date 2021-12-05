import { getInput } from '../utils';

enum Direction {
    FORWARD = 'forward',
    DOWN = 'down',
    UP = 'up',
}

interface Command {
    direction: Direction;
    value: number;
}

async function solution() {
    const input = await getInput();
    const commands = input.map<Command>((line) => ({
        direction: (line.match(/[a-z]+/) as RegExpMatchArray)[0] as Direction,
        value: parseInt((line.match(/[0-9]+/) as RegExpMatchArray)[0] as string, 10),
    }));

    // part 1
    let [finalDepth, finalHorizontal] = commands.reduce(
        ([depth, horizontal], command) => {
            switch (command.direction) {
                case Direction.DOWN:
                    return [depth + command.value, horizontal];
                case Direction.UP:
                    return [depth - command.value, horizontal];
                case Direction.FORWARD:
                    return [depth, horizontal + command.value];
                default:
                    return [depth, horizontal];
            }
        },
        [0, 0],
    );
    console.log(`Part 1 solution: ${finalDepth * finalHorizontal}`);

    // part 2
    [finalDepth, finalHorizontal] = commands.reduce(
        ([depth, horizontal, aim], command) => {
            switch (command.direction) {
                case Direction.DOWN:
                    return [depth, horizontal, aim + command.value];
                case Direction.UP:
                    return [depth, horizontal, aim - command.value];
                case Direction.FORWARD:
                    return [depth + aim * command.value, horizontal + command.value, aim];
                default:
                    return [depth, horizontal, aim];
            }
        },
        [0, 0, 0],
    );
    console.log(`Part 2 solution: ${finalDepth * finalHorizontal}`);
}

solution()
    .then()
    .catch((e) => console.error(e));
