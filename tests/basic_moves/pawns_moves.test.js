import Board from '../../src/board.js';

test('Valid pawns moves at initial position', () => {
    const board = new Board();
    const moves = [
        ['a2', 'a4'], ['h7', 'h6'], ['b2', 'b3'],
        ['h6', 'h5'], ['c2', 'c4'], ['d7', 'd6']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(board.hasPawnAt(initialSquare)).toBe(true);
        expect(board.hasPawnAt(targetSquare)).toBe(false);
        board.move(initialSquare, targetSquare);
        expect(board.hasPawnAt(initialSquare)).toBe(false);
        expect(board.hasPawnAt(targetSquare)).toBe(true);
    });
});
