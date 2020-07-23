import Board from '../src/board.js';

/**
 * This file is an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1');
board.move('f7', 'f5');
board.showBoard();
