import Board from '../src/board.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board();
board.showBoard();

console.log(board._piecesBoard[1][1].legalSquares);
