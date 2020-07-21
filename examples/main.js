import Board from '../src/board.js';

let board = new Board('8/3k4/8/3B4/3R4/3K4/8/8 w - - 0 1');
board._updateLegalSquares('d4');
board._updateLegalSquares('d5');

board.showBoard();
