import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME
} from '../src/constants.js';

test('Rooks valid general movements with simple position', () => {
    const board = new Board('R6r/8/8/8/8/8/8/R6r w - - 0 1');
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

test('Rooks valid general movements with more pieces and randomly placed', () => {
    const board = new Board('R6r/4R3/2r2R2/1r6/2R5/8/2R2r2/R6r b - - 0 1');
    const moves = [
        ['c6', 'c4'], ['c2', 'c4'], ['h8', 'b8'], ['a8', 'b8'],
        ['h1', 'g1'], ['a1', 'g1'], ['f2', 'f6'], ['c4', 'c8']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
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

// The tests for white rooks and black rooks are split because move validates
// the color which should play next, so it would throw another error which
// we are not interested in now.
test('Invalid white rooks moves', () => {
    const board = new Board('1R5r/2R1R3/4rr2/1r2r3/2R5/8/6R1/R5R1 w - - 0 1');
    const moves = [
        ['a1', 'g1'], ['b8', 'a7'], ['c7', 'e5'], ['c4', 'b5'],
        ['e7', 'd2'], ['g2', 'g1'], ['g1', 'g2'], ['g1', 'a8']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});

test('Invalid black rooks moves', () => {
    const board = new Board('3R4/4r1r1/2r3R1/2R1r3/1r1rR3/3R4/8/4r3 b - - 0 1');
    const moves = [
        ['b4', 'c5'], ['c6', 'b4'], ['d4', 'b4'], ['e7', 'e5'],
        ['e5', 'h2'], ['e1', 'f2'], ['g7', 'f8'], ['e7', 'f8']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});
