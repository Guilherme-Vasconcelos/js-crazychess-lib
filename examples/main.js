import Board from '../src/board.js';
// REMOVE THIS LATER
import { Rook, Queen } from '../src/pieces.js';

let rook = new Rook('white');
let rook2 = new Rook('black');
let queen = new Queen('white');
let board = new Board();

board.placePiece(rook, 'a1');
board.placePiece(rook2, 'a8');
board.placePiece(queen, 'h1');
board.showBoard();

console.log(board.getPiece('a1'));
