# js-crazychess-lib

js-crazychess-lib is a (work in progress) library for chess which allows traditional chess, but also some variants which will be played at crazychess website.

---

### Installing project and dependencies

js-crazychess-lib uses a few dependencies (Babel and Jest) mainly for testing. In order to install js-crazychess-lib you must:
- Clone the project.
- cd into it `cd js-crazychess-lib`.
- If you are not interested in testing, you do not need to install anything else. Import src/board.js in your project and start using it.
- Instead, if you want to run the tests, run `yarn install` and `yarn test`.

### Usage

You can check out examples/main.js to see the main usage, but here are a few steps:
- Import library: `import Board from 'PATH/board.js';` (replace PATH with your path to src directory). The code is built so that you only have to import the board.js (the other files such as pieces.js and constants.js still need to exist and be in the same directory, but you don't have to import them), which means after this you are ready to go.
- Instance board: `const board = new Board();`. The Board class takes as optional parameter an Object. This object has two optional parameters:
  - FEN: Your initial FEN position. If you do not supply this parameter, the game will start with the traditional chess position.
  - checkless: Whether the board should ignore checks or not. This is set to false by default. If you set it to true, the board will no longer consider checks or mates, and the king will become just a regular piece.
  - Examples:
    - `const board = new Board({FEN: 'rnbqkbnr/pppp1p1p/8/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1 b kq - 0 6'});`
    - `const board = new Board();`
    - `const board = new Board({checkless: true});`

If you just want the chess to be a traditional game without any other additional rules, there is no reason to supply any parameters to the Board object constructor other than (possibly) the FEN, if you wish to have a custom position.
- Movements: `board.move('e2', 'e4');` will move the piece from e2 to e4. Keep in mind we still have no support for some important features (see "Features to be implemented" section)
- Show board: `board.showBoard();` will print a text representation of the board.
- Verify if you have a check position: `board.isCheck();`
- By convention, **Board methods and attributes that start with an underline should not be used**, as the library uses them for internal implementations, plus some of them are only updated when a specific thing happens. For example, `Board._currentFEN` is only updated by calling `Board.getCurrentFEN()`.

---

### Features implemented

- Start a chess game (with custom FEN, if you wish so)
- Move pieces around with legal moves and turn validation
- Validate each position for checks (can be turned off)

### Features to be implemented

- Castling
- En passant
- Pawns promotions
- Checkmate
- Stalemate
- If we come up with more features ideas, they will be added here too

---

### License

js-crazychess-lib is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>

### Dependencies licenses

js-crazychess-lib uses Jest and Babel for testing, which are both currently (as of 24/09/2020) licensed under the MIT License.
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

