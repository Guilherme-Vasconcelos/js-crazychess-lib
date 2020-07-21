import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from './constants.js';

/**
 * Class used to represent the chess board.
 */
class Board {
    /**
     * Creates a board (8x8 matrix) with the given FEN.
     */
    constructor(FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        this._setFENPosition(FEN);
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
     * Sets the board to have the position indicated by FEN
     * @param {string} FEN
     */
    _setFENPosition(FEN) {
        this._piecesBoard = [];
        let row = [];
        const piecesMap = {
            R: {color: WHITE_PIECE_COLOR, piece: Rook},
            r: {color: BLACK_PIECE_COLOR, piece: Rook},
            B: {color: WHITE_PIECE_COLOR, piece: Bishop},
            b: {color: BLACK_PIECE_COLOR, piece: Bishop},
            N: {color: WHITE_PIECE_COLOR, piece: Knight},
            n: {color: BLACK_PIECE_COLOR, piece: Knight},
            K: {color: WHITE_PIECE_COLOR, piece: King},
            k: {color: BLACK_PIECE_COLOR, piece: King},
            Q: {color: WHITE_PIECE_COLOR, piece: Queen},
            q: {color: BLACK_PIECE_COLOR, piece: Queen},
            P: {color: WHITE_PIECE_COLOR, piece: Pawn},
            p: {color: BLACK_PIECE_COLOR, piece: Pawn}
        }

        for (let i = 0; i < FEN.length; ++i) {
            if (FEN[i] === '/') {
                this._piecesBoard.push(row);
                row = [];
                continue;
            }

            // TODO: remove this in the future when implementing full FEN
            if (FEN[i] === ' ') break;

            const currentPiece = piecesMap[FEN[i]];
            if (currentPiece) {
                row.push(new currentPiece.piece(currentPiece.color))
            }

            if (!isNaN(parseInt(FEN[i], 10))) {
                for (let j = 0; j < parseInt(FEN[i], 10); ++j) {
                    row.push(new NullPiece());
                }
            }
        }

        this._piecesBoard.push(row);
    }

    /**
     * Converts a given position in algebraic notation to row/column in matrix.
     * Examples: 'a8' -> 0, 0 / 'b6' -> 2, 1 / etc.
     * @param {string} algebraicPosition position in algebraic notation
     * @returns array of integers [row, column]
     */
    _algebraicToInts(algebraicPosition) {
        if (algebraicPosition[0] < 'a' || algebraicPosition[0] > 'h'
         || algebraicPosition[1] < '1' || algebraicPosition[1] > '8') {
            throw new Error(`Algebraic positions must be between ` +
                `'a1' and 'h8'. You entered ${algebraicPosition}.`);
        }

        let rowColumn = [];
        rowColumn.push(8 - parseInt(algebraicPosition[1], 10));
        rowColumn.push(algebraicPosition[0].charCodeAt(0) - 97);
        return rowColumn;
    }

    /**
     * Converts a given position in row, column to algebraic notation.
     * Examples: 0, 0 -> 'a8' / 2, 1 -> 'b6' / etc.
     * @param {int} row position's row (from 0 to 7)
     * @param {int} column position's column (from 0 to 7)
     * @returns string with the corresponding algebraic notation
     */
    _intsToAlgebraic(row, column) {
        if (row < 0 || row > 7 || column < 0 || column > 7) {
            throw new Error(`Board rows and columns go from 0 to 7 each. ` +
                 `You entered: [${row}, ${column}].`);
        }
        
        let algebraicPosition = '';
        algebraicPosition += String.fromCharCode(column + 97);
        algebraicPosition += (8 - row).toString();
        return algebraicPosition;
    }

    /**
     * Places a piece at a given position
     * @param piece Piece to be placed. This must belong to a valid Piece class
     * such as Rook, Bishop, etc. 
     * @param {string} position Position to be placed (in algebraic notation),
     * e.g.: 'e4', 'a1', etc.
     */
    _placePiece(piece, position) {
        let [ row, column ] = this._algebraicToInts(position);
        this._piecesBoard[row][column] = piece;
    }

    /**
     * Returns a piece from a given position
     * @param {string} position Position to be searched (in algebraic notation)
     * e.g.: 'e4', 'a1', etc.
     * @returns piece at given position (in algebraic notation)
     */
    _getPiece(position) {
        let [ row, column ] = this._algebraicToInts(position);
        return (
            this._piecesBoard[row][column]
        );
    }
}

export default Board;
