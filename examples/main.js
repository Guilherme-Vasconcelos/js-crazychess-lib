import Board from '../src/board.js';

/**
 * This file is an example. If you want to use the library, the only
 * files you actually need are the ones inside src directory.
 */

// Traditional chess with traditional initial position
const board = new Board();
board.move('e2', 'e4');
board.move('e7', 'e5');
board.showBoard();
console.log(board.isCheck())  // Verify if you have a check position

// Traditional chess with custom position
const board2 = new Board({FEN: 'rnb1kbnr/pppp1ppp/8/4p3/4PP1q/8/PPPP2PP/RNBQKBNR w KQkq - 1 3'});
board2.showBoard();
console.log(board2.isCheck())

// Chess game ignoring checks
const board3 = new Board({checkless: true});
board3.showBoard();

// Chess game with custom position and ignoring checks
const board4 = new Board({FEN: 'rnbqkbnr/pppp1p1p/8/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1 b kq - 0 6', checkless: true});
board4.showBoard();
console.log(board4.isCheck());
