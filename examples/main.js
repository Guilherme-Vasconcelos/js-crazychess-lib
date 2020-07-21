import Board from '../src/board.js';

let board = new Board('8/8/3k4/8/3R4/4K3/8/8 w - - 0 1');
board._updateLegalSquares('d4');

board.showBoard();
