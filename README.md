# js-crazychess-lib

### What is js-crazychess-lib?

js-crazychess-lib is a (work in progress) highly customizable chess library built for chess variants at crazychess website.
Before considering using this library, you should be aware that since it is meant to be used in a website in which there are only chess variants, it may not be as complete as a regular library, even though it will support regular chess in the future.

### Dependencies and running

js-crazychess-lib uses a few dependencies (Babel and Jest) mainly for testing. In order to install js-crazychess-lib you must:
- Clone the project.
- cd into it `cd js-crazychess-lib`.
- Currently, the only dependencies are used for testing. If you are not interested in testing, you do not need to install anything else. Import src/board.js in your project and start using.
- Instead, if you want to run the tests, run `yarn install` and `yarn test`.

### Usage

You can check out examples/main.js to see the main usage, but here are a few steps:
- To import library: `import Board from 'PATH/board.js';` (replace PATH with your path to src directory).
- Instance board: `const board = new Board();` (Board takes an optional parameter, which is your initial position FEN. If you do not inform this parameter, the board will start in chess initial position).
- Movements: `board.move('e2', 'e4');` will move the piece from e2 to e4. This method still has a lot to improve and is not really usable yet.
- Show board: `board.showBoard();` will print a text representation of the board. This can be used for debugging or to see the current position.
- By convention, Board methods that start with an underline should not be used, as the library uses them for internal implementations.

### Features implemented

- Start a chess game (with custom FEN, if you wish so)
- Move pieces around with legal moves validation

### Features to be implemented

- Castling
- En passant
- Pawns promotions
- Check / checkmate
- Determine whose turn is it
- If we come up with more features ideas, they will be added here too

### License

js-crazychess-lib is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>

### Dependencies licenses

js-crazychess-lib uses Jest and Babel for testing, which are both licensed under the MIT License.
You can check the repositories here:
- [Babel](https://github.com/babel/babel/blob/main/LICENSE)
- [Jest](https://github.com/facebook/jest/blob/master/LICENSE)

For dependencies licensed under the MIT license, you can check its copyright notice below:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

