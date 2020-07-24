import Board from '../src/board.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME
} from '../src/constants.js';

test('Rooks valid general movements', () => {
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

// Pattern: [initialSquare, targetSquare]. This test is meant to test only
// valid movements for white rooks going up or down (walking around the column)
const whiteRooksColumnsMoves = [
    ['a2', 'a8'], ['b5', 'b6'], ['b7', 'b8'], ['c6', 'c1'],
    ['d4', 'd2'], ['e3', 'e5'], ['e7', 'e6'], ['f5', 'f4'],
    ['g2', 'g3'], ['h8', 'h1']
];
whiteRooksColumnsMoves.forEach(([initialSquare, targetSquare]) => {
    test(`White rook on ${initialSquare} can move to ${targetSquare}`, () => {
        const board = new Board('7R/1R2R3/2R5/1R3R2/3R4/4R3/R5R1/8 w - - 0 1');
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(targetSquare).name).toBe(WHITE_ROOK_NAME);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
    });
});

// Pattern: [initialSquare, targetSquare]. This test is meant to test only
// valid movements for white rooks going left or right (walking around the row)
const whiteRooksRowsMoves = [
    ['a2', 'b2'], ['b5', 'e5'], ['b7', 'a7'], ['c6', 'a6'],
    ['e7', 'h7'], ['e3', 'a3'], ['f5', 'c5'], ['g2', 'f2'],
    ['h8', 'a8'], ['d4', 'h4']
];
whiteRooksRowsMoves.forEach(([initialSquare, targetSquare]) => {
    test(`White rook on ${initialSquare} can move to ${targetSquare}`, () => {
        const board = new Board('7R/1R2R3/2R5/1R3R2/3R4/4R3/R5R1/8 w - - 0 1');
        board.move(initialSquare, targetSquare);
        expect(board._getPiece(targetSquare).name).toBe(WHITE_ROOK_NAME);
        expect(board._getPiece(initialSquare).isNullPiece()).toBe(true);
    });
});

// Pattern: [initialSquare, targetSquare]. This test is meant to test only
// valid movements for black rooks going up or down (walking around the column)
const blackRooksColumnMoves = [

]
