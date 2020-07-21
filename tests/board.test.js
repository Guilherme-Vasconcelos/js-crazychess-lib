import Board from '../src/board.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from '../src/constants.js';

// https://jestjs.io/docs/en/expect

/**
 * Current tests:
 * - Valid initial positions
 */

test('Valid initial positions', () => {
    let board = new Board();
    expect(board._getPiece('a1').name).toBe('R');
    expect(board._getPiece('b1').name).toBe('N');
    expect(board._getPiece('c1').name).toBe('B');
    expect(board._getPiece('d1').name).toBe('Q');
    expect(board._getPiece('e1').name).toBe('K');
    expect(board._getPiece('f1').name).toBe('B');
    expect(board._getPiece('g1').name).toBe('N');
    expect(board._getPiece('h1').name).toBe('R');
    expect(board._getPiece('a2').name).toBe('P');
    expect(board._getPiece('b2').name).toBe('P');
    expect(board._getPiece('c2').name).toBe('P');
    expect(board._getPiece('d2').name).toBe('P');
    expect(board._getPiece('e2').name).toBe('P');
    expect(board._getPiece('f2').name).toBe('P');
    expect(board._getPiece('g2').name).toBe('P');
    expect(board._getPiece('h2').name).toBe('P');
    expect(board._getPiece('a8').name).toBe('r');
    expect(board._getPiece('b8').name).toBe('n');
    expect(board._getPiece('c8').name).toBe('b');
    expect(board._getPiece('d8').name).toBe('q');
    expect(board._getPiece('e8').name).toBe('k');
    expect(board._getPiece('f8').name).toBe('b');
    expect(board._getPiece('g8').name).toBe('n');
    expect(board._getPiece('h8').name).toBe('r');
    expect(board._getPiece('a7').name).toBe('p');
    expect(board._getPiece('b7').name).toBe('p');
    expect(board._getPiece('c7').name).toBe('p');
    expect(board._getPiece('d7').name).toBe('p');
    expect(board._getPiece('e7').name).toBe('p');
    expect(board._getPiece('f7').name).toBe('p');
    expect(board._getPiece('g7').name).toBe('p');
    expect(board._getPiece('h7').name).toBe('p');
    expect(board._getPiece('a5').name).toBe('.');
    expect(board._getPiece('b4').name).toBe('.');
    expect(board._getPiece('c3').name).toBe('.');
    expect(board._getPiece('a1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('b1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('c1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('d1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('g1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('h1').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('a2').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('h2').color).toBe(WHITE_PIECE_COLOR);
    expect(board._getPiece('a7').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('e7').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('h7').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('a8').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('b8').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('d8').color).toBe(BLACK_PIECE_COLOR);
    expect(board._getPiece('f8').color).toBe(BLACK_PIECE_COLOR);
});
