import Board from '../src/board.js';

/**
 * This file is an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board();
board.move('g1', 'f3');
board.showBoard();
console.log(board.getCurrentFEN());
