import Board from '../src/board.js';
import { _oppositeColor, _algebraicToInts, _intsToAlgebraic } from '../src/helpers.js';

/**
 * This file is mainly used for making sure new functionalities are working
 * and can be seen as an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory (see usage at README).
 */

const board = new Board();
board.move('e2', 'e4');
board.move('e7', 'e6');
board.move('a2', 'a3');
board.move('d8', 'h4');
board.move('f2', 'f4');
board.showBoard();
