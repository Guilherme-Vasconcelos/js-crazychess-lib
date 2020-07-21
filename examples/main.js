import Board from '../src/board.js';

let board = new Board();
board.move('e2', 'e4');
board.move('e7', 'e5');

board.showBoard();
