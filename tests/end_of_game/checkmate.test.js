import Board from '../../src/board.js';

/*
Checkmates are not fully implemented yet. This is a TDD file and some
tests will fail until checkmate's full implementation.
*/

test('Assert that initial position is not checkmate', () => {
    const board = new Board();
    expect(board.isCheckmate()).toBe(false);
});

test('Assert that queen + king endgame in a non-check position is not checkmate', () => {
    const board = new Board({FEN: '5k2/6q1/8/8/2K5/8/8/8 w - - 0 1'});
    expect(board.isCheckmate()).toBe(false);
    board.move('c4', 'b4');
    expect(board.isCheckmate()).toBe(false);
});

// test('Assert that white is in check by black\'s rook but it is not checkmate', () => {
//     const board = new Board({FEN: '8/6r1/6K1/2k5/8/8/8/8 w - - 0 1'});
//     expect(board.isCheckmate()).toBe(false);
// });

// test('Assert that black is in check by white\'s queen but it is not checkmate', () => {
//     const board = new Board({FEN: '8/8/6K1/2k5/2Q5/8/8/8 b - - 0 1'});
//     expect(board.isCheckmate()).toBe(false);
// });

test('Assert that white is checkmated in a queen + king endgame', () => {
    const board = new Board({FEN: '6K1/6q1/5k2/8/8/8/8/8 w - - 0 1'});
    expect(board.isCheckmate()).toBe(true);
    expect(() => {
        board.move('g8', 'h8');
    }).toThrow('Consider calling Board.isCheckmate()');
});

test('Assert that white is checkmated in a 2 bishops + king endgame', () => {
    const board = new Board({FEN: '7K/8/7k/8/8/8/b7/b7 w - - 0 1'});
    expect(board.isCheckmate()).toBe(true);
    expect(() => {
        board.move('h8', 'g8');
    }).toThrow('Consider calling Board.isCheckmate()');
});

test('Assert that black is checkmated in a 2 rooks + king endgame', () => {
    const board = new Board({FEN: '1R5k/R7/8/8/8/8/8/2K5 b - - 0 1'});
    expect(board.isCheckmate()).toBe(true);
    expect(() => {
        board.move('h8', 'h7');
    }).toThrow('Consider calling Board.isCheckmate()');
});

test('Assert that black is checkmated in a bishop + knight + king endgame', () => {
    const board = new Board({FEN: '7k/8/5BKN/8/8/8/8/8 b - - 0 1'});
    expect(board.isCheckmate()).toBe(true);
    expect(() => {
        board.move('h8', 'g8');
    }).toThrow('Consider calling Board.isCheckmate()');
});
