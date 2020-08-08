import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_KNIGHT_NAME, BLACK_KNIGHT_NAME, NULL_PIECE_NAME
} from "../src/constants.js";

test('Knights valid general movements with simple position', () => {
    const board = new Board({
        FEN: '8/8/3N4/4n3/6n1/2N5/8/8 w - - 0 1',
        checkless: true
    });
    const moves = [
        ['c3', 'b5'], ['g4', 'h6'], ['d6', 'e8'], ['h6', 'g8'],
        ['b5', 'a3'], ['e5', 'f3'], ['a3', 'c2'], ['f3', 'e1'],
        ['c2', 'e1'], ['g8', 'f6'], ['e8', 'f6']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board.getPieceNameAt(initialSquare)).toBe(NULL_PIECE_NAME);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board.getPieceNameAt(targetSquare)).toBe(WHITE_KNIGHT_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board.getPieceNameAt(targetSquare)).toBe(BLACK_KNIGHT_NAME);
                break;
        }
    });
});

test('Knights valid general movements with more pieces and randomly placed', () => {
    const board = new Board({
        FEN: '1N3n1n/n5N1/3n2nN/3N4/1Nn1nN2/2N2n2/1n6/3n2N1 b - - 0 1',
        checkless: true
    });
    const moves = [
        ['f3', 'g1'], ['f4', 'g6'], ['h8', 'g6'], ['b8', 'd7'],
        ['g1', 'h3'], ['c3', 'e4'], ['d6', 'e4'], ['b4', 'a2'],
        ['d1', 'f2'], ['g7', 'e6'], ['f8', 'e6'], ['d5', 'f4'],
        ['a7', 'b5'], ['f4', 'e6'], ['g6', 'f4']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        const movedPieceColor = board.activeColor;
        board.move(initialSquare, targetSquare);
        expect(board.getPieceNameAt(initialSquare)).toBe(NULL_PIECE_NAME);
        switch (movedPieceColor) {
            case WHITE_PIECE_COLOR:
                expect(board.getPieceNameAt(targetSquare)).toBe(WHITE_KNIGHT_NAME);
                break;
            case BLACK_PIECE_COLOR:
                expect(board.getPieceNameAt(targetSquare)).toBe(BLACK_KNIGHT_NAME);
                break;
        }
    });
});

// The tests for white knights and black knights are split because move validates
// the color which should play next, so it would throw another error which
// we are not interested in now.
test('Invalid white knights moves', () => {
    const board = new Board({
        FEN: '5N2/1N1n2nN/3N4/1n2nN2/2N3n1/3nN3/2N2nN1/8 w - - 0 1',
        checkless: true
    });
    const moves = [
        ['b7', 'd6'], ['c4', 'd6'], ['c2', 'a2'], ['e3', 'c3'],
        ['g2', 'e3'], ['f5', 'e3'], ['h7', 'a1'], ['f8', 'd3'],
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});

test('Invalid black knights moves', () => {
    const board = new Board({
        FEN: 'n6n/2Nn2N1/8/2nNn3/5Nn1/2n2N2/2Nn4/n6n b - - 0 1',
        checkless: true
    });
    const moves = [
        ['a1', 'f3'], ['a8', 'b5'], ['d7', 'b7'], ['c5', 'f3'],
        ['c3', 'f4'], ['d2', 'h8'], ['e5', 'g2'], ['g4', 'g7'],
        ['h1', 'a8'], ['h8', 'g7']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`Move ${targetSquare} is not allowed`);
    });
});
