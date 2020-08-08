import Board from '../src/board.js';
import { oppositeColor, algebraicToInts, intsToAlgebraic } from '../src/helpers.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory (see usage at README).
 */

const board = new Board();
board.showBoard();
console.log('BEFORE MOVING:');
console.log(board._getPiece('e2').legalSquares);
console.log(board._getPiece('e1').legalSquares);
console.log(board._getPiece('f2').legalSquares);
console.log('\nAFTER MOVING:')
board.move('e2', 'e4');
console.log(board._getPiece('e4').legalSquares);
console.log(board._getPiece('e1').legalSquares);
console.log(board._getPiece('f2').legalSquares);
board.move('e7', 'e5');
board.move('f1', 'a6');
board.move('a7', 'a6');
