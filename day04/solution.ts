import { remove, unzip } from 'lodash';
import { getInput, PuzzleInput } from '../utils';

interface BoardTile {
    number: number;
    marked?: boolean;
}
type Board = BoardTile[][];

/**
 * class BingoBoard
 *
 * represents a bingo grid that can keep track of marked off numbers and determine whether
 * it is a solved (read: winning) board and what its score is
 */
class BingoBoard {
    private readonly board: Board;

    constructor(boardRaw: string[][]) {
        this.board = boardRaw.map((row) => row.map(Number).map((number) => ({ number })));
    }

    // marks off a number if it is on the board
    public mark(number: number): void {
        const [tile] = this.board.flatMap((t) => t).filter((t) => t.number === number);
        if (tile) tile.marked = true;
    }

    // returns whether the board is solved (all tiles in a row or column are marked)
    public isSolved(): boolean {
        return (
            this.board.some((row) => row.every((t) => t.marked)) ||
            unzip(this.board).some((row) => row.every((t) => t.marked))
        );
    }

    // returns the score of the board
    public score(): number {
        return this.board.reduce(
            (sum, val) => sum + val.reduce((s, v) => (v.marked ? s : s + v.number), 0),
            0,
        );
    }
}

// helper to convert input to list of bingo numbers and boards
async function fromInput(): Promise<[number[], BingoBoard[]]> {
    const input = ((await getInput()) as PuzzleInput).join('\n');

    const [numberString, ...boardsRaw] = input.split('\n\n');
    const numbers = numberString.split(',').map(Number);
    const boards = boardsRaw
        .map((boardLine) => boardLine.split('\n').map((row) => row.trim().split(/\s+/)))
        .map((b) => new BingoBoard(b));
    return [numbers, boards];
}

async function part1() {
    const [numbers, boards] = await fromInput();

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const number = numbers.shift() as number;
        boards.forEach((board) => board.mark(number));
        const [result] = boards.filter((board) => board.isSolved());
        if (result) {
            console.log(`Part 1 solution: ${result.score() * number}`);
            break;
        }
    }
}

async function part2() {
    const [numbers, boards] = await fromInput();

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const number = numbers.shift() as number;
        boards.forEach((board) => board.mark(number));
        const lastRemoved = remove(boards, (board) => board.isSolved())?.pop();
        if (boards.length === 0) {
            console.log(`Part 2 solution: ${(lastRemoved as BingoBoard).score() * number}`);
            break;
        }
    }
}

part1()
    .then(() => part2())
    .catch((e) => console.error(e));
