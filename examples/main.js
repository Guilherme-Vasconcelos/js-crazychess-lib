import Board from '../src/board.js';

let board = new Board('8/8/3b4/3Q4/3R3b/8/8/8 w - - 0 1');
board._updateLegalSquares('d4');

board.showBoard();
