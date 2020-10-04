import { Rook } from '../../src/pieces.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME } from '../../src/constants.js';

test('Piece instantiation correctly throws exception when invalid color is passed', () => {
    expect(() => {
        new Rook('orange');
    }).toThrow('A chess piece must be either');
});

test('White rook is correctly instantiated when correct color is passed', () => {
    const piece = new Rook(WHITE_PIECE_COLOR);
    expect(piece.name).toBe(WHITE_ROOK_NAME);
    expect(piece.color).toBe(WHITE_PIECE_COLOR);
});

test('Black rook is correctly instantiated when correct color is passed', () => {
    const piece = new Rook(BLACK_PIECE_COLOR);
    expect(piece.name).toBe(BLACK_ROOK_NAME);
    expect(piece.color).toBe(BLACK_PIECE_COLOR);
});
