import Board from '../src/board.js';
// REMOVE THIS LATER
import { Rook, Queen } from '../src/pieces.js';

let board = new Board();
board._setFENPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
board.showBoard();
