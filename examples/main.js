import Board from '../src/board.js';

let board = new Board('1q6/6n1/8/3RB3/3K4/8/8/8 w - - 0 1');
board._updateLegalSquares('d5');
board._updateLegalSquares('e5');

board.showBoard();
