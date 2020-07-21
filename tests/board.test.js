import Board from '../src/board.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from '../src/constants.js';

// https://jestjs.io/docs/en/expect

/**
 * Current tests:
 * - Valid ints to algebraic conversions
 * - Valid algebraic to ints conversions
 * - Code handles invalid ints to algebraic conversions
 * - Code handles invalid algebraic to ints conversions
 * - Initial positions
 * - (TODO) Place pieces
 * - (TODO) Get pieces
 * - (TODO movement tests
 */

test('Valid ints to algebraic conversions', () => {
    const board = new Board();
    const valuesForColumns = {
        a: 0, b: 1, c: 2,
        d: 3, e: 4, f: 5,
        g: 6, h: 7
    }
    let positions = []
    Object.keys(valuesForColumns).forEach(value => {
        for (let i = 8; i > 0; --i) {
            positions.push([`${value}${i}`, 8 - i, valuesForColumns[value]]);
        }
    });

    positions.forEach(([algebraicPosition, row, column]) => {
        expect(board._intsToAlgebraic(row, column)).toBe(algebraicPosition);
    });
});

test('Valid algebraic to ints conversions', () => {
    const board = new Board();
    const valuesForColumns = {
        a: 0, b: 1, c: 2,
        d: 3, e: 4, f: 5,
        g: 6, h: 7
    }
    let positions = []
    Object.keys(valuesForColumns).forEach(value => {
        for (let i = 8; i > 0; --i) {
            positions.push([`${value}${i}`, 8 - i, valuesForColumns[value]]);
        }
    });

    positions.forEach(([algebraicPosition, row, column]) => {
        expect(board._algebraicToInts(algebraicPosition)[0]).toBe(row);
        expect(board._algebraicToInts(algebraicPosition)[1]).toBe(column);
    });
});

test('Code handles invalid ints to algebraic conversions', () => {
    const board = new Board();
    let positions = [
        [8, 8], [-1, 0], [3, 12],
        [null, null], [undefined, undefined],
        ['_', '+'], ['a', 15], [15, 'b'],
        ['hey', 7], [2, 'hey'], [-15, -15]
    ];

    positions.forEach(([row, column]) => {
        expect(() => {
            board._intsToAlgebraic(row, column);
        }).toThrow();
    });
});

test('Code handles invalid algebraic to ints conversions', () => {
    const board = new Board();
    let positions = [
        'a0', 'a9', 'b-1',
        'j3', 'j0', 'm5',
        '_', '+', '-',
        15, 67, -1, undefined,
        null
    ];

    positions.forEach(position => {
        expect(() => {
            board._algebraicToInts(position);
        }).toThrow();
    });
});

test('Initial positions', () => {
    const board = new Board();
    const coordsPositionsWhitePieces = [
        // White pieces
        ['a1', 'R'], ['b1', 'N'], ['c1', 'B'], ['d1', 'Q'],
        ['e1', 'K'], ['f1', 'B'], ['g1', 'N'], ['h1', 'R'],
        ['a2', 'P'], ['b2', 'P'], ['c2', 'P'], ['d2', 'P'],
        ['e2', 'P'], ['f2', 'P'], ['g2', 'P'], ['h2', 'P']
    ]

    const coordsPositionsBlackPieces = [
        // Black pieces
        ['a8', 'r'], ['b8', 'n'], ['c8', 'b'], ['d8', 'q'],
        ['e8', 'k'], ['f8', 'b'], ['g8', 'n'], ['h8', 'r'],
        ['a7', 'p'], ['b7', 'p'], ['c7', 'p'], ['d7', 'p'],
        ['e7', 'p'], ['f7', 'p'], ['g7', 'p'], ['h7', 'p']
    ]

    const coordsPositionsNullPieces = [
        // Null pieces
        ['a3', '.'], ['b3', '.'], ['c3', '.'], ['d3', '.'],
        ['e3', '.'], ['f3', '.'], ['g3', '.'], ['h3', '.'],
        ['a4', '.'], ['b4', '.'], ['c4', '.'], ['d4', '.'],
        ['e4', '.'], ['f4', '.'], ['g4', '.'], ['h4', '.'],
        ['a5', '.'], ['b5', '.'], ['c5', '.'], ['d5', '.'],
        ['e5', '.'], ['f5', '.'], ['g5', '.'], ['h5', '.'],
        ['a6', '.'], ['b6', '.'], ['c6', '.'], ['d6', '.'],
        ['e6', '.'], ['f6', '.'], ['g6', '.'], ['h6', '.']
    ]

    coordsPositionsWhitePieces.forEach(([coord, name]) => {
        expect(board._getPiece(coord).name).toBe(name);
        expect(board._getPiece(coord).color).toBe(WHITE_PIECE_COLOR);
    });

    coordsPositionsBlackPieces.forEach(([coord, name]) => {
        expect(board._getPiece(coord).name).toBe(name);
        expect(board._getPiece(coord).color).toBe(BLACK_PIECE_COLOR);
    });

    coordsPositionsNullPieces.forEach(([coord, name]) => {
        expect(board._getPiece(coord).name).toBe(name);
        expect(board._getPiece(coord).color).toBe(null);
    });
});
