import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_BISHOP_NAME, BLACK_BISHOP_NAME
} from '../src/constants.js';

test('Bishops valid general movements with simple position', () => {
    const board = new Board('b6b/8/8/8/8/8/8/B6B b - - 0 1');
    const moves = [
        ['a8', 'g2'], ['a1', 'd4'], ['h8', 'f6'], ['h1', 'g2'],
        ['f6', 'd4'], ['g2', 'a8']
    ];

    moves.forEach( ([initialSquare, targetSquare]) => {
        // Variable to store color because board.move will switch the activeColor
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(WHITE_BISHOP_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(BLACK_BISHOP_NAME);
                break;
        }
    });
});

test('Bishops valid general movements with more pieces and randomly placed', () => {
    const board = new Board('2B1b3/8/3BBb1b/1Bb5/4BB2/2b1b3/2B4b/6B1 w - - 0 1');
    const moves = [
        ['b5', 'a4'], ['c5', 'd6'], ['e6', 'h3'], ['h2', 'f4'],
        ['g1', 'e3'], ['e8', 'd7'], ['h3', 'e6'], ['d7', 'c8'],
        ['e3', 'f4'], ['f6', 'h8'], ['f4', 'd6']
    ];

    moves.forEach( ([initialSquare, targetSquare]) => {
        // Variable to store color because board.move will switch the activeColor
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(WHITE_BISHOP_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(BLACK_BISHOP_NAME);
                break;
        }
    });
});

// The tests for white bishops and black bishops are split because move validates
// the color which should play next, so it would throw another error which
// we are not interested in now.
test('Invalid white bishops moves', () => {
    const board = new Board('2B1b3/2B2bB1/B1b3b1/4b3/3b1B2/2B5/2B3b1/7B w - - 0 1');
    const moves = [
        ['h1', 'f3'], ['a6', 'h6'], ['c8', 'a6'], ['g7', 'd4'],
        ['c7', 'f4'], ['c3', 'e5'], ['c2', 'a1'], ['a6', 'c8'],
        ['f4', 'd6']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});

test('Invalid black bishops moves', () => {
    const board = new Board('3b3b/1bB3B1/4Bb2/2bB1B2/1b2b1b1/2B2B2/1b2B1b1/3b4 b - - 0 1');
    const moves = [
        ['b2', 'd4'], ['b4', 'd2'], ['b4', 'c5'], ['b7', 'e4'],
        ['c5', 'a3'], ['d1', 'e6'], ['d8', 'b8'], ['e4', 'g6'],
        ['f6', 'h8'], ['h8', 'f6'], ['g4', 'e6'], ['g2', 'e4']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});
