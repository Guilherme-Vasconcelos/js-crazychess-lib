import Board from '../src/board.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board('8/7p/5nB1/1n4R1/P7/1r1r4/2P5/8 w - - 0 1');
board._updateLegalSquares('c2');
board._updateLegalSquares('h7');
board._updateLegalSquares('a4');

board.showBoard();
