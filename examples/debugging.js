import Board from '../src/board.js';
import { _oppositeColor, _algebraicToInts, _intsToAlgebraic } from '../src/helpers.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory (see usage at README).
 */

const board = new Board();
console.log(board._getPiece('e2').legalSquares);
board.move('e2', 'e4');
board._updateAllLegalSquares();
console.log(board._getPiece('e4').legalSquares);
board.showBoard();
