import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from './constants.js';
import { _oppositeColor, _algebraicToInts, _intsToAlgebraic } from './helpers.js';

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
     * Places a piece at a given position
     * @param piece Piece to be placed. This must belong to a valid Piece class
     * such as Rook, Bishop, etc. 
     * @param {string} position Position to be placed (in algebraic notation),
     * e.g.: 'e4', 'a1', etc.
     */
    _placePiece(piece, position) {
        let [ row, column ] = _algebraicToInts(position);
        this._piecesBoard[row][column] = piece;
    }

    /**
     * Returns a piece from a given position
     * @param {string} position Position to be searched (in algebraic notation)
     * e.g.: 'e4', 'a1', etc.
     * @returns piece at given position (in algebraic notation)
     */
    _getPiece(position) {
        let [ row, column ] = _algebraicToInts(position);
        return (
            this._piecesBoard[row][column]
        );
    }

    /**
     * Goes up the board from a given position, checking for positions
     * that are available for a given piece. When it is said that the
     * function goes up the board, it means it increases the row counter
     * from 0 to 7. By white's perspective, that would actually mean
     * going down the board.
     * @param {string} initialPosition position where to begin going up
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoUp(initialPosition) {
        const [ row, column ] = _algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let rowUp = row + 1; rowUp < 8; ++rowUp) {
            if (rowUp > 7) break;
            if (this._piecesBoard[rowUp][column].name === '.') {
                legalSquaresFound.add(_intsToAlgebraic(rowUp, column));
            } else if (this._piecesBoard[rowUp][column].color === _oppositeColor(pieceColor)) {
                legalSquaresFound.add(_intsToAlgebraic(rowUp, column));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
    }

    /**
     * Goes down the board from a given position, checking for positions
     * that are available for a given piece. When it is said that the
     * function goes down the board, it means it decreases the row counter
     * from 7 to 0. By white's perspective, that would actually mean
     * going up the board.
     * @param {string} initialPosition position where to begin going down
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoDown(initialPosition) {
        const [ row, column ] = _algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let rowDown = row - 1; rowDown > -1; --rowDown) {
            if (rowDown < 0) break;
            if (this._piecesBoard[rowDown][column].name === '.') {
                legalSquaresFound.add(_intsToAlgebraic(rowDown, column));
            } else if (this._piecesBoard[rowDown][column].color === _oppositeColor(pieceColor)) {
                legalSquaresFound.add(_intsToAlgebraic(rowDown, column));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
    }

    /**
     * Goes to the left at the board from a given position, checking for
     * positions that are available for a given piece. When it is said that
     * the function goes to the left, it means it decreases the column counter
     * from 7 to 0. By white's perspective, that means going to the left.
     * @param {string} initialPosition position where to begin going left
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoLeft(initialPosition) {
        const [ row, column ] = _algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let colLeft = column - 1; colLeft > -1; --colLeft) {
            if (colLeft < 0) break;
            if (this._piecesBoard[row][colLeft].name === '.') {
                legalSquaresFound.add(_intsToAlgebraic(row, colLeft));
            } else if (this._piecesBoard[row][colLeft].color === _oppositeColor(pieceColor)) {
                legalSquaresFound.add(_intsToAlgebraic(row, colLeft));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
    }

    /**
     * Goes to the right at the board from a given position, checking for
     * positions that are available for a given piece. When it is said that
     * the function goes to the right, it means it increases the column counter
     * from 0 to 7. By white's perspective, that means going to the right.
     * @param {string} initialPosition position where to begin going right
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoRight(initialPosition) {
        const [ row, column ] = _algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let colRight = column + 1; colRight < 8; ++colRight) {
            if (colRight > 7) break;
            if (this._piecesBoard[row][colRight].name === '.') {
                legalSquaresFound.add(_intsToAlgebraic(row, colRight));
            } else if (this._piecesBoard[row][colRight].color === _oppositeColor(pieceColor)) {
                legalSquaresFound.add(_intsToAlgebraic(row, colRight));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
    }

    /**
     * Goes to the upper-left corner at the board from a given position,
     * checking for positions that are available for a given piece. When
     * it is said that the function goes to up and left, it means it
     * increases the row counter, but decreases the column counter. By white's
     * perspective, that would actually mean going to the bottom-left corner
     * of the board.
     * @param {string} initialPosition position where to begin going up-left
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoUpLeft(initialPosition) {

    }

    /**
     * Goes to the upper-right corner at the board from a given position,
     * checking for positions that are available for a given piece. When
     * it is said that the function goes to up and right, it means it
     * increases both the row counter and the column counter. By white's
     * perspective, that would actually mean going to the bottom-right corner
     * of the board.
     * @param {string} initialPosition position where to begin going up-right
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoUpRight(initialPosition) {
        
    }

    /**
     * Goes to the bottom-left corner at the board from a given position,
     * checking for positions that are available for a given piece. When
     * it is said that the function goes down and left, it means it
     * decreases both the row counter and the column counter. By white's
     * perspective, that would actually mean going to the top-left corner
     * of the board.
     * @param {string} initialPosition position where to begin going down-left
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoDownLeft(initialPosition) {
        
    }

    /**
     * Goes to the bottom-right corner at the board from a given position,
     * checking for positions that are available for a given piece. When
     * it is said that the function goes down and right, it means it
     * decreases the row counter, but increases the column counter. By white's
     * perspective, that would actually mean going to the top-right corner
     * of the board.
     * @param {string} initialPosition position where to begin going down-right
     * @returns Set of strings (algebraic positions found)
     */
    _updateLegalSquaresGoDownRight(initialPosition) {
        
    }

    /**
     * Updates the legal squares for whatever piece is in the given position
     * @param {string} position position in algebraic notation
     */
    _updateLegalSquares(position) {
        const pieceToUpdate = this._getPiece(position);
        if (pieceToUpdate.name === '.') {
            throw new Error('Given position does not contain a piece.');
        }

        switch (pieceToUpdate.name) {
            case 'R':
            case 'r':
                pieceToUpdate.legalSquares = new Set([
                    ...this._updateLegalSquaresGoUp(position),
                    ...this._updateLegalSquaresGoDown(position),
                    ...this._updateLegalSquaresGoLeft(position),
                    ...this._updateLegalSquaresGoRight(position),
                ]);
                break;
            case 'B':
            case 'b':
                // TODO: move everything to _updateLegalSquaresGoUpLeft,
                // _updateLegalSquaresGoUpRight, etc. just like the rook code
                // above.
                /*for (
                    let rowUp = row + 1, colRight = column + 1; 
                    rowUp < 8 && colRight < 8;
                    ++rowUp, ++colRight
                ) {
                    if (rowUp > 7 || colRight > 7) break;
                    if (this._piecesBoard[rowUp][colRight].name === '.') {
                        pieceToUpdate.legalSquares.add(
                            _intsToAlgebraic(rowUp, colRight)
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
                            _intsToAlgebraic(rowUp, colLeft)
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
                            _intsToAlgebraic(rowDown, colRight)
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
                            _intsToAlgebraic(rowDown, colLeft)
                        );
                    } else {
                        break;
                    }
                }

                console.log(pieceToUpdate.legalSquares);*/
                break;

            case 'N':
            case 'n':

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
