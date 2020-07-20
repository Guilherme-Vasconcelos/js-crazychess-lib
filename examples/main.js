import Board from '../src/board.js';
// REMOVE THIS LATER
import { Rook, Queen } from '../src/pieces.js';

let rook = new Rook('white');
let rook2 = new Rook('black');
let queen = new Queen('white');
let board = new Board();

board._piecesBoard[0][0] = rook;
board._piecesBoard[7][7] = rook2;
board._piecesBoard[2][1] = queen;
board.showBoard();

console.log(board._intsToAlgebraic(2, 1));
