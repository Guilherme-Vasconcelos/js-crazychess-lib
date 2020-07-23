import Board from '../src/board.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from '../src/constants.js';

// https://jestjs.io/docs/en/expect

/**
 * Tests in this file:
 * - Initial positions are set correctly
 */

test('Initial positions are set correctly', () => {
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
