# :santa: Advent of Code 2021 :santa:

This repository includes my setup and the solutions for the 2021 edition of [Advent of Code](https://adventofcode.com/) :santa:

All solutions are written using **TypeScript 4.5** and **Node.js 16.13.0** (the current LTS release).

## Usage

```
npm start <day>
```

E.g.

```
npm start 5
```

This will execute `nodemon` to invoke the day 5 solution file with `ts-node`.  
If no solution directory currently exists, it will create the required directory, an empty `solution.ts` file and try to download the puzzle input.

For the automatic input download to work, an active session cookie for the [Advent of Code homepage](https://adventofcode.com/) needs to be specified in a `.env` file in the repository's root directory (see `.env.example`).

## Solutions

Here will be direct links to all of the puzzles and solutions, plus an overview of my current progress (as indicated by one or two :star: symbols, representing the successful completion of each day's puzzle parts):

-   [Day 01](https://adventofcode.com/2021/day/1): [Solution](day01/solution.ts) :star: :star:
-   [Day 02](https://adventofcode.com/2021/day/2): [Solution](day02/solution.ts) :star: :star:
-   [Day 03](https://adventofcode.com/2021/day/3): [Solution](day03/solution.ts) :star: :star:
-   [Day 04](https://adventofcode.com/2021/day/4): [Solution](day04/solution.ts) :star: :star:
