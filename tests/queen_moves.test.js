import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_QUEEN_NAME, BLACK_QUEEN_NAME
} from '../src/constants.js';

test('Queens valid general moves with a simple position', () => {
    const board = new Board({
        FEN: '8/2q2q2/1Q6/2Q5/5q2/8/2Q5/7q w - - 0 1',
        checkless: true
    });
    const moves = [
        ['c2', 'c4'], ['f4', 'c4'], ['c5', 'c4'], ['c7', 'h2'],
        ['b6', 'd8'], ['h2', 'a2'], ['c4', 'a2'], ['h1', 'a8'],
        ['a2', 'a8'], ['f7', 'a7'], ['a8', 'a7']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(WHITE_QUEEN_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(BLACK_QUEEN_NAME);
                break;
        }
    });
});

test('Queens valid general moves with more pieces and randomly placed', () => {
    const board = new Board({
        FEN: 'Q3Q1Qq/2q5/2q2Q1q/8/4qQ2/1Q1Q2q1/1q1q4/1Q5Q b - - 0 1', checkless: true
    });
    const moves = [
        ['h6', 'h2'], ['b3', 'b2'], ['d2', 'b2'], ['f6', 'h8'],
        ['c6', 'a8'], ['e8', 'a4'], ['e4', 'e8'], ['g8', 'a2'],
        ['b2', 'a2'], ['b1', 'b7'], ['a8', 'b7'], ['a4', 'e8'],
        ['h2', 'h8'], ['h1', 'h8'], ['g3', 'f4'], ['e8', 'e5']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(WHITE_QUEEN_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board._getPiece(targetSquare).name).toBe(BLACK_QUEEN_NAME);
                break;
        }
    });
});

// The tests for white queens and black queens are split because move validates
// the color which should play next, so it would throw another error which
// we are not interested in now.
test('Invalid white queens moves', () => {
    const board = new Board({
        FEN: '6Q1/1Q2q2Q/2q5/Q3Q3/3Qq3/1q4Q1/2Q5/4Q2q w - - 0 1',
        checkless: true
    });
    const moves = [
        ['a5', 'e5'], ['b7', 'b2'], ['c2', 'a4'], ['d4', 'b5'],
        ['e5', 'd7'], ['g8', 'g3'], ['h7', 'g8'], ['h7', 'd7'],
        ['h7', 'a1']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});

test('Invalid black queens moves', () => {
    const board = new Board({
        FEN: '2Q3q1/1q1qQ3/7q/2q1q3/2Q3q1/1q3Q2/2q5/q3Q2q b - - 0 1',
        checkless: true
    });
    const moves = [
        ['a1', 'e5'], ['a1', 'f1'], ['b3', 'c2'], ['b3', 'd1'],
        ['b3', 'b8'], ['b7', 'b1'], ['c2', 'd4'], ['d7', 'a8'],
        ['e5', 'g1'], ['g4', 'b4'], ['g8', 'b3'], ['h6', 'b5'],
        ['h1', 'e4']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});
