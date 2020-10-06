import Board from '../../src/board.js';

/*
FENs are not fully implemented yet. This is a TDD file and some
tests will fail until FENs' full implementation.
*/

// test('Assert initial position\'s FEN', () => {
//     const board = new Board();
//     expect(board.getCurrentFEN()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
// });

// test('Assert FEN after 1. d4', () => {
//     const board = new Board();
//     board.move('d2', 'd4');
//     expect(board.getCurrentFEN()).toBe('rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1');
// });

// test('Assert FEN after 1. e4 Nc6', () => {
//     const board = new Board();
//     board.move('e2', 'e4');
//     board.move('b8', 'c6');
//     expect(board.getCurrentFEN()).toBe('r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2');
// });

test('Assert setFENPosition correctly throws when FEN contains invalid color', () => {
    expect(() => {
        new Board({FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR o KQkq - 0 1'})
    }).toThrow('FEN contains invalid color');
});
