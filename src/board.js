import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';

/**
 * Class used to represent the chess board.
 */
class Board {
    /**
     * Creates a board (8x8 matrix) and fills all positions with a NullPiece.
     * @TODO the board should take as input the initial position FEN.
     */
    constructor() {
        this._piecesBoard = [];
        for (let i = 0; i < 8; ++i) {
            let currentRow = []
            for (let j = 0; j < 8; ++j) {
                let cPiece = new NullPiece();
                currentRow.push(cPiece);
            }
            this._piecesBoard.push(currentRow);
        }
    }

    /**
     * Shows the current board.
     */
    showBoard() {
        let output = ''
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                output += ' ' + this._piecesBoard[i][j].name + ' ';
            }
            output += '\n';
        }
        console.log(output);
    }

    /**
     * Places a piece at a given position
     * @param piece Piece to be placed. This must belong to a valid Piece class
     * such as Rook, Bishop, etc. 
     * @param {string} position Position to be placed (in algebraic notation),
     * e.g.: 'e4', 'a1', etc.
     */
    placePiece(piece, position) {
        // @TODO: make this work, problem is the - '0' part. Same goes for below.
        this._piecesBoard[8 - (position[1] - '0')][parseInt(position[0], 10) - 97] = piece;
    }

    /**
     * Returns a piece from a given position
     * @param {string} position Position to be searched (in algebraic notation)
     * e.g.: 'e4', 'a1', etc.
     */
    getPiece(position) {
        // @TODO: make this work
        return (
            this._piecesBoard[8 - (position[1] - '0')][parseInt(position[0], 10) - 97]
        );
    }
}

export default Board;
