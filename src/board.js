import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from './constants.js';

/**
 * Class used to represent the chess board.
 */
class Board {
    /**
     * Creates a board (8x8 matrix) with the given FEN. If you do not supply
     * an initial FEN, the board will start at the initial position.
     */
    constructor(FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
        this._setFENPosition(FEN);
    }

    /**
     * 
     * @param {string} initialSquare initial square in algebraic notation
     * from which a piece will be moved. The square must have a valid piece.
     * @param {string} targetSquare target to move the piece in algebraic
     * notation.
     * 
     * @TODO this method, in the future, will need to validate if the move
     * is actually legal before moving.
     */
    move(initialSquare, targetSquare) {
        const pieceToMove = this._getPiece(initialSquare);
        if (pieceToMove.name === '.') {
            throw new Error(`Initial square ${initialSquare} does not ` +
                `contain a piece.`);
        }

        /**
         * pseudo-code:
         * pieceToMove._updateLegalMoves()
         * if targetSquare is not in pieceToMove.legalMoves then throw error
         * else (code below):
         */

        this._placePiece(pieceToMove, targetSquare);
        this._placePiece(new NullPiece(), initialSquare);
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
     * @param {string} FEN FEN for the position to be set
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

            // TODO: adapt this in the future when implementing full FEN, as
            // the data after the space is also important to the game (but not
            // important if you just want the position itself).
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
        if (!Number.isInteger(row) || !Number.isInteger(column)) {
            throw new Error(`Rows and columns must be integers. ` +
                `You entered: [${row}, ${column}].`);
        }
        else if (row < 0 || row > 7 || column < 0 || column > 7) {
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

    /**
     * Updates the legal squares for whatever piece is in the given position
     * @param {string} position position in algebraic notation
     */
    _updateLegalSquares(position) {
        const pieceToUpdate = this._getPiece(position);
        const [ row, column ] = this._algebraicToInts(position);
        if (pieceToUpdate.name === '.') {
            throw new Error('Given position does not contain a piece.');
        }

        switch (pieceToUpdate.name) {
            case 'R':
            case 'r':
                // TODO: In the future rook will need to have castling
                // TODO: rook can move to a occupied square as long as
                // it is occupied by a piece of opposite color

                for (let rowUp = row + 1; rowUp < 8; ++rowUp) {
                    if (rowUp > 7) break;
                    if (this._piecesBoard[rowUp][column].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowUp, column)
                        );
                    } else {
                        break;
                    }
                }

                for (let rowDown = row - 1; rowDown > -1; --rowDown) {
                    if (rowDown < 0) break;
                    if (this._piecesBoard[rowDown][column].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowDown, column)
                        );
                    } else {
                        break;
                    }
                }

                for (let colRight = column + 1; colRight < 8; ++colRight) {
                    if (colRight > 7) break;
                    if (this._piecesBoard[row][colRight].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(row, colRight)
                        );
                    } else {
                        break;
                    }
                }

                for (let colLeft = column - 1; colLeft > -1; --colLeft) {
                    if (colLeft < 0) break;
                    if (this._piecesBoard[row][colLeft].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(row, colLeft)
                        );
                    } else {
                        break;
                    }
                }

                console.log(pieceToUpdate.legalSquares);
                break;
            
            case 'B':
            case 'b':
                // TODO: bishop can move to a occupied square as long as
                // it is occupied by a piece of opposite color
                for (
                    let rowUp = row + 1, colRight = column + 1; 
                    rowUp < 8 && colRight < 8;
                    ++rowUp, ++colRight
                ) {
                    if (rowUp > 7 || colRight > 7) break;
                    if (this._piecesBoard[rowUp][colRight].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowUp, colRight)
                        );
                    } else {
                        break;
                    }
                }

                for (
                    let rowUp = row + 1, colLeft = column - 1;
                    rowUp < 8 && colLeft > -1;
                    ++rowUp, --colLeft
                ) {
                    if (rowUp > 7 || colLeft < 0) break;
                    if (this._piecesBoard[rowUp][colLeft].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowUp, colLeft)
                        );
                    } else {
                        break;
                    }
                }

                for (
                    let rowDown = row - 1, colRight = column + 1;
                    rowDown > -1 && colRight < 8;
                    --rowDown, ++colRight
                ) {
                    if (rowDown < 0 || colRight > 7) break;
                    if (this._piecesBoard[rowDown][colRight].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowDown, colRight)
                        );
                    } else {
                        break;
                    }
                }

                for (
                    let rowDown = row - 1, colLeft = column - 1;
                    rowDown > -1 && colLeft > -1;
                    --rowDown, --colLeft
                ) {
                    if (rowDown < 0 || colLeft < 0) break;
                    if (this._piecesBoard[rowDown][colLeft].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            this._intsToAlgebraic(rowDown, colLeft)
                        );
                    } else {
                        break;
                    }
                }

                console.log(pieceToUpdate.legalSquares);
                break;

            case 'N':
            case 'n':
                // TODO: knight can move to a occupied square as long as
                // it is occupied by a piece of opposite color

                let newPositions = [
                    [row + 2, column + 1], [row + 2, column - 1],
                    [row - 2, column + 1], [row - 2, column - 1],
                    [row + 1, column + 2], [row - 1, column + 2],
                    [row + 1, column - 2], [row - 1, column - 2]
                ];

                newPositions = newPositions.filter(([newRow, newColumn]) =>
                    (newRow < 8 && newRow > -1) && (newColumn < 8 && newColumn > -1)
                );
            
                break;
            case 'K':
            case 'k':
                // TODO: In the future king will need to have check/castle
                break;
            case 'Q':
            case 'q':
                break;
            case 'P':
            case 'p':
                // TODO: In the future pawn will need to have en passant
                break;
        }
    }
}

export default Board;
