import Board from '../src/board.js';
// REMOVE THIS LATER
import { Rook } from '../src/pieces.js';

let rook = new Rook('white');
let board = new Board();

board.placePiece(rook, 'e4');
board.showBoard();
console.log(board.getPiece('e5'));
console.log(board._piecesBoard[4][4]);
