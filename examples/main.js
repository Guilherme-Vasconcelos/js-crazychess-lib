import Board from '../src/board.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board('8/5r2/8/3qn3/2B5/2QK4/3R4/8 w - - 0 1');
board._updateLegalSquares('d2');
board._updateLegalSquares('c4');
board._updateLegalSquares('e5');
board._updateLegalSquares('f7');
board._updateLegalSquares('c3');
board._updateLegalSquares('d5');

board.showBoard();
