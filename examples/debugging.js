import Board from '../src/board.js';
import { _oppositeColor, _algebraicToInts, _intsToAlgebraic } from '../src/helpers.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory (see usage at README).
 */

const board = new Board('rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - - 2');
board.move('f2', 'f4');
board.move('f7', 'f5');
board.move('d1', 'h5');
console.log(board.isPieceUnderAttack('e8'));
board.showBoard();
