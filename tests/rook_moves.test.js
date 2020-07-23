import Board from '../src/board.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from '../src/constants.js';

/**
 * Tests in this file:
 * - White rook valid movements
 */

test('White rook valid movements', () => {
    const board = new Board('8/2r5/8/R3r3/4R3/8/8/8 w - - 0 1');
    expect(board._getPiece('e4').name).toBe('R');
    board.move('e4', 'h4');
    expect(board._getPiece('e4').isNullPiece()).toBe(true);
    expect(board._getPiece('h4').name).toBe('R');
    board.move('e5', 'e4');
    expect(board._getPiece('e5').isNullPiece()).toBe(true);
    expect(board._getPiece('e4').name).toBe('r');
});
