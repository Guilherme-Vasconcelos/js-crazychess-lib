import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME
} from '../src/constants.js';

/**
 * Tests in this file:
 * - Rooks valid movements
 * - (TODO) Board.move handles invalid moves for rooks
 */

test('Rooks valid movements', () => {
    const board = new Board('R6r/8/8/8/8/8/8/R6r w - - 0 1');
    // Pattern: [move from, move to]. Remember to follow the color rule
    // i.e. first a move with a black piece, then a move with white piece
    // and so on. It starts with a black piece here because of 'b' in FEN.
    const moves = [
        ['a1', 'a2'], ['h1', 'h2'], ['a8', 'a7'], ['h8', 'h7'],
        ['a7', 'd7'], ['h7', 'e7'], ['a2', 'd2'], ['h2', 'e2']
    ];

    moves.forEach( ([initialSquare, targetSquare]) => {
        // Variable to store color because board.move will switch the activeColor
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(WHITE_ROOK_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(BLACK_ROOK_NAME);
                break;
        }
    });
});
