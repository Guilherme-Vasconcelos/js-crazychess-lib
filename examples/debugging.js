import Board from '../src/board.js';
import { _oppositeColor, _algebraicToInts, _intsToAlgebraic } from '../src/helpers.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

const board = new Board();
board.move('e2', 'e4');
board._updateLegalSquares('e1');
board._updateLegalSquares('d1');
console.log(board._getPiece('e1').legalSquares);
console.log(board._getPiece('d1').legalSquares);
board.move('e7', 'e5');
board.showBoard();
