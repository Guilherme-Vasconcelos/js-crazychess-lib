import Board from '../../src/board.js';

test('Move squares that are empty in initial position', () => {
    const board = new Board();
    const moves = [
        ['a3', 'a4'], ['h6', 'h5'], ['b3', 'b3'],
        ['c5', 'c4'], ['d3', 'd6'], ['f3', 'f5']
    ];

    moves.forEach(([initialSquare, targetSquare]) => {
        expect(() => {
            board.move(initialSquare, targetSquare);
        }).toThrow(`does not contain a piece`);
    });
});

test('Move a black piece when expected to move a white piece', () => {
    const board = new Board();
    expect(() => {
        board.move('h7', 'h6');
    }).toThrow(`Expecting move from white pieces, but`);
});

test('Move white king into a check position', () => {
    const board = new Board({FEN: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3'});
    expect(() => {
        board.move('e1', 'f2');
    }).toThrow(`white's king is or would be in check`);
});

test('Verifying if an empty position\'s piece is under attack', () => {
    const board = new Board();
    const positions = [
        'a3', 'b4', 'c5', 'd6', 'h5'
    ];

    positions.forEach((position) => {
        expect(() => {
            board.isPieceUnderAttack(position);
        }).toThrow(`does not work for empty positions. You entered '${position}'`);
    });
});

test('Asking if a checkless game contains a check position', () => {
    const board = new Board({checkless: true});
    expect(() => {
        board.isCheck();
    }).toThrow(`It does not make sense to verify for checks`);
});
