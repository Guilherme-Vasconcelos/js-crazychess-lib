import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';
import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME,
    WHITE_BISHOP_NAME, BLACK_BISHOP_NAME, WHITE_KNIGHT_NAME, BLACK_KNIGHT_NAME,
    WHITE_QUEEN_NAME, BLACK_QUEEN_NAME, WHITE_KING_NAME, BLACK_KING_NAME,
    WHITE_PAWN_NAME, BLACK_PAWN_NAME
} from './constants.js';
import { oppositeColor, algebraicToInts, intsToAlgebraic } from './helpers.js';

/**
 * Class used to represent the chess board.
 */
class Board {
    /**
     * Creates a board
     * If you wish to start a traditional chess game at the initial position,
     * just instantiate the board with new Board(). Otherwise, if you wish to
     * start with a custom position, supply the FEN argument, e.g.:
     * {FEN: 'myCustomFEN'}. If you wish to ignore checks, set checkless
     * to true, e.g.: {checkless: true}.
     * @param {{FEN: string, checkless: boolean}} Object
     */
    constructor(
        {
            FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            checkless = false
        } = {}
    ) {
        this._setFENPosition(FEN);
        this._updateAllLegalSquares();
        if (!checkless) {
            this._assertKingsExistence();
        }
        this.checkless = checkless;
    }

    /**
     * 
     * @param {string} initialSquare initial square in algebraic notation
     * from which a piece will be moved. The square must have a valid piece.
     * @param {string} targetSquare target to move the piece in algebraic
     * notation.
     */
    move(initialSquare, targetSquare) {
        const pieceToMove = this._getPiece(initialSquare);
        if (pieceToMove.isNullPiece()) {
            throw new Error(`Initial square ${initialSquare} does not ` +
                `contain a piece.`);
        } else if (pieceToMove.color === oppositeColor(this.activeColor)) {
            throw new Error(`Expecting move from ${this.activeColor} pieces, ` +
                `but found move from a ${pieceToMove.color} piece located ` +
                `at '${initialSquare}'.`);
        }

        if (!pieceToMove.legalSquares.has(targetSquare)) {
            throw new Error(`Move ${targetSquare} is not allowed for ` +
                `piece at ${initialSquare}`);
        }

        if (pieceToMove.color === BLACK_PIECE_COLOR) {
            this.fullMoveCount += 1;
        }

        if (
            pieceToMove.name === WHITE_PAWN_NAME ||
            pieceToMove.name === BLACK_PAWN_NAME
        ) {
            pieceToMove.isFirstMove = false;
        }

        this._placePiece(pieceToMove, targetSquare);
        this._placePiece(new NullPiece(), initialSquare);
        // After piece has been moved, update all legal squares.
        this._updateAllLegalSquares();
        if (!this.checkless && this.isCheck()) {
            throw new Error(`Illegal move '${initialSquare}' to ` +
                `'${targetSquare}' because ${this.activeColor}'s king is or ` +
                `would be in check after the move.\nIf you wish to ignore ` +
                `checks, change board's constructor parameter 'checkless' to ` +
                `true.\nConsider calling Board.isCheckmate() to verify if you ` +
                `have a mate position.`);
        }

        this.activeColor = oppositeColor(pieceToMove.color);
    }

    /**
     * Shows the current board.
     */
    /* istanbul ignore next */
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
     * Checks if piece at a given position is under attack.
     * @param {string} piecePosition position in algebraic notation
     * where piece to verify is located (e.g. 'a1', 'b5').
     * @returns boolean true if piece at piecePosition is under attack
     * by some piece, else false.
     */
    isPieceUnderAttack(piecePosition) {
        const pieceToVerify = this._getPiece(piecePosition);
        if (pieceToVerify.isNullPiece()) {
            throw new Error(`Board.isPieceUnderAttack does not work for empty` +
                ` positions. You entered '${piecePosition}'.`);
        }
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                const currentPiece = this._piecesBoard[i][j];
                if (
                    !currentPiece.isNullPiece() &&
                    currentPiece.color === oppositeColor(pieceToVerify.color) &&
                    currentPiece.legalSquares.has(piecePosition)
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Returns the name of whatever piece is in piecePosition
     * (in algebraic notation). Use constants.js.
     * @param {string} piecePosition position in algebraic notation
     * where piece to get name is located
     * @returns the name of the piece (use constants.js)
     */
    getPieceNameAt(piecePosition) {
        const [ row, column ] = algebraicToInts(piecePosition);
        return this._piecesBoard[row][column].name;
    }

    /**
     * Returns the color of whatever piece is in piecePosition
     * (in algebraic notation). Use constants.js.
     * @param {string} piecePosition position in algebraic notation
     * where piece to get color is located
     * @returns the color of the piece (use constants.js)
     */
    getPieceColorAt(piecePosition) {
        const [ row, column ] = algebraicToInts(piecePosition);
        return this._piecesBoard[row][column].color;
    }

    /**
     * Checks if current active color is in check.
     * @returns boolean true if position is check, else false.
     */
    isCheck() {
        if (this.checkless) {
            throw new Error(`It does not make sense to verify for checks or mates ` +
                `in a game of type checkless.\nIf you wish not to ignore checks ` +
                `anymore, change Board's constructor parameter 'checkless' ` +
                `to false.`);
        }

        switch (this.activeColor) {
            case WHITE_PIECE_COLOR:
                return this.isPieceUnderAttack(this.getWhiteKingPosition());
            case BLACK_PIECE_COLOR:
                return this.isPieceUnderAttack(this.getBlackKingPosition());
        }
    }

    /**
     * Checks if current position is checkmate.
     * @returns boolean true if position is checkmate, else false.
     */
    isCheckmate() {
        if (!this.isCheck()) {
            return false;
        }
        // TODO
        return true;
    }

    /**
     * Checks if current position is stalemate.
     * @returns boolean true if position is stalemate, else false.
     */
    isStalemate() {
        // TODO
    }

    /**
     * Gets the current FEN of the game. Always use this function to get
     * the current FEN, since it is also used to update the FEN attribute,
     * which means if you use Board._currentFEN directly you will have an
     * outdated value.
     * @returns a string representing the current FEN.
     */
    getCurrentFEN() {
        this._currentFEN = [];
        let piecesPlacement = '';
        let currentRow = '';
        for (let i = 0; i < 8; ++i) {
            let countNullPiece = 0;
            for (let j = 0; j < 8; ++j) {
                if (this._piecesBoard[i][j].isNullPiece()) {
                    countNullPiece += 1;
                } else {
                    if (countNullPiece !== 0) {
                        currentRow += countNullPiece.toString();
                        countNullPiece = 0;
                    }
                    currentRow += this._piecesBoard[i][j].name;
                }
            }
            if (countNullPiece !== 0) {
                currentRow += countNullPiece.toString();
            }
            if (i !== 7) currentRow += '/';
            piecesPlacement += currentRow;
            currentRow = '';
        }
        piecesPlacement += currentRow;
        this._currentFEN.push(piecesPlacement);

        switch (this.activeColor) {
            case WHITE_PIECE_COLOR:
                this._currentFEN.push('w');
                break;
            case BLACK_PIECE_COLOR:
                this._currentFEN.push('b');
                break;
        }

        // TODO: When we have full FEN support we will need to
        // push to currentFEN the other four attributes correctly too.
        this._currentFEN.push('KQkq');
        this._currentFEN.push('-');
        this._currentFEN.push('-');
        this._currentFEN.push(this.fullMoveCount.toString());  // this is probably correct

        return this._currentFEN.join(' ');
    }

    /**
     * Verifies white king's current location (in algebraic notation)
     * @returns string representing white king's position in algebraic notation.
     * If white king is not found, it returns an empty string instead.
     */
    getWhiteKingPosition() {
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                if (this._piecesBoard[i][j].name === WHITE_KING_NAME) {
                    return intsToAlgebraic(i, j);
                }
            }
        }
        return '';
    }


    /**
     * Verifies black king's current location (in algebraic notation).
     * @returns string representing black king's position in algebraic notation.
     * If black king is not found, it returns an empty string instead.
     */
    getBlackKingPosition() {
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                if (this._piecesBoard[i][j].name === BLACK_KING_NAME) {
                    return intsToAlgebraic(i, j);
                }
            }
        }
        return '';
    }


    /**
     * Checks if given position at board contains a Pawn.
     * @param {string} position position to check in algebraic notation.
     */
    hasPawnAt(position) {
        return this._getPiece(position).isPawn();
    }

    /**
     * Returns the number of pieces that are currently on board.
     * @returns number of pieces currently on board
     */
    getNumberOfPieces() {
        return this._getAllPieces().length;
    }

    /**
     * Gets all white pieces that are currently on board.
     * @returns array of Pieces
     */
    _getAllWhitePieces() {
        const pieces = [];
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                const piece = this._piecesBoard[i][j];
                if (piece.color === WHITE_PIECE_COLOR) {
                    pieces.push(piece);
                }
            }
        }

        return pieces;
    }

    /**
     * Gets all black pieces that are currently on board.
     * @returns array of Pieces
     */
    _getAllBlackPieces() {
        const pieces = [];
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                const piece = this._piecesBoard[i][j];
                if (piece.color === BLACK_PIECE_COLOR) {
                    pieces.push(piece);
                }
            }
        }

        return pieces;
    }

    /**
     * Gets all pieces that are currently on board.
     * @returns array of Pieces
     */
    _getAllPieces() {
        return [...this._getAllBlackPieces(), ...this._getAllWhitePieces()];
    }

    /**
     * Verifies if moving piece from initialPosition to targetPosition will
     * result in a check position.
     * @param {string} initialPosition position where piece is located at
     * @param {string} targetPosition target position for the desired piece
     * @returns true if moving the piece will result in check, else false
     */
    _willBeCheckAfter(initialPosition, targetPosition) {
        // TODO
        return true;
    }

    /**
     * Checks if kings exist in the given game. Kings are allowed not to exist
     * if it is a checkless game. Otherwise, they are mandatory.
     * @returns nothing, but throws error if kings are not found
     */
    _assertKingsExistence() {
        if (
            this.getWhiteKingPosition() === '' ||
            this.getBlackKingPosition() === ''
        ) {
            throw new Error('Kings have not been found in loaded FEN.\nIf you ' +
                'wish to play a checkless game, set the checkless board ' + 
                'constructor parameter to true.');
        }
    }

    /**
     * Sets the board to have the position indicated by FEN
     * @param {string} FEN FEN for the position to be set
     */
    _setFENPosition(FEN) {
        // TODO (still need to add full support to FEN)
        this._piecesBoard = [];
        let row = [];
        FEN = FEN.split(' ');
        // For now only piecesPlacement, activeColor, and fullMove are used,
        // but the others will be used too soon
        const [
            piecesPlacement, activeColor, castling,
            enPassant, halfMove, fullMove
        ] = FEN;
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

        for (let i = 0; i < piecesPlacement.length; ++i) {
            if (piecesPlacement[i] === '/') {
                this._piecesBoard.push(row);
                row = [];
                continue;
            }

            const currentPiece = piecesMap[piecesPlacement[i]];
            if (currentPiece) {
                row.push(new currentPiece.piece(currentPiece.color))
            }

            if (!isNaN(parseInt(piecesPlacement[i], 10))) {
                for (let j = 0; j < parseInt(piecesPlacement[i], 10); ++j) {
                    row.push(new NullPiece());
                }
            }
        }
        this._piecesBoard.push(row);

        switch (activeColor) {
            case 'w':
                this.activeColor = WHITE_PIECE_COLOR;
                break;
            case 'b':
                this.activeColor = BLACK_PIECE_COLOR;
                break;
            default:
                throw new Error(`FEN contains invalid color ${activeColor}.`);
        }

        this.fullMoveCount = parseInt(fullMove, 10);

        this._pawnsActivateDoubleMove();
    }

    /**
     * Places a piece at a given position
     * @param piece Piece to be placed. This must belong to a valid Piece class
     * such as Rook, Bishop, etc. 
     * @param {string} position Position to be placed (in algebraic notation),
     * e.g.: 'e4', 'a1', etc.
     */
    _placePiece(piece, position) {
        let [ row, column ] = algebraicToInts(position);
        this._piecesBoard[row][column] = piece;
    }

    /**
     * Returns a piece from a given position
     * @param {string} position Position to be searched (in algebraic notation)
     * e.g.: 'e4', 'a1', etc.
     * @returns piece at given position (in algebraic notation)
     */
    _getPiece(position) {
        let [ row, column ] = algebraicToInts(position);
        return (
            this._piecesBoard[row][column]
        );
    }

    /**
     * Enables all pawns that are in initial positions to do a double move,
     * as they are disabled by default by _setFENPosition. It is recommended
     * to always call this function in Board constructor after loading the
     * initial FEN.
     */
    _pawnsActivateDoubleMove() {
        const initialPositionsPawns = [
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'
        ]

        initialPositionsPawns.forEach(position => {
            const [ row, column ] = algebraicToInts(position);
            this._piecesBoard[row][column].isFirstMove = true;
        });
    }

    /**
     * Updates legal squares for every single piece at the board.
     */
    _updateAllLegalSquares() {
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                if (!this._piecesBoard[i][j].isNullPiece()) {
                    this._updateLegalSquares(intsToAlgebraic(i, j));
                }
            }
        }
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let rowUp = row + 1; rowUp < 8; ++rowUp) {
            if (rowUp > 7) break;
            if (this._piecesBoard[rowUp][column].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, column));
            } else if (this._piecesBoard[rowUp][column].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, column));
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let rowDown = row - 1; rowDown > -1; --rowDown) {
            if (rowDown < 0) break;
            if (this._piecesBoard[rowDown][column].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, column));
            } else if (this._piecesBoard[rowDown][column].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, column));
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let colLeft = column - 1; colLeft > -1; --colLeft) {
            if (colLeft < 0) break;
            if (this._piecesBoard[row][colLeft].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(row, colLeft));
            } else if (this._piecesBoard[row][colLeft].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(row, colLeft));
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        for (let colRight = column + 1; colRight < 8; ++colRight) {
            if (colRight > 7) break;
            if (this._piecesBoard[row][colRight].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(row, colRight));
            } else if (this._piecesBoard[row][colRight].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(row, colRight));
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        
        for (
            let rowUp = row + 1, colLeft = column - 1; 
            rowUp < 8 && colLeft > -1;
            ++rowUp, --colLeft
        ) {
            if (rowUp > 7 || colLeft < 0) break;
            if (this._piecesBoard[rowUp][colLeft].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, colLeft));
            } else if (this._piecesBoard[rowUp][colLeft].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, colLeft));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        
        for (
            let rowUp = row + 1, colRight = column + 1; 
            rowUp < 8 && colRight < 8;
            ++rowUp, ++colRight
        ) {
            if (rowUp > 7 || colRight > 7) break;
            if (this._piecesBoard[rowUp][colRight].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, colRight));
            } else if (this._piecesBoard[rowUp][colRight].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowUp, colRight));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        
        for (
            let rowDown = row - 1, colLeft = column - 1; 
            rowDown > -1 && colLeft > -1;
            --rowDown, --colLeft
        ) {
            if (rowDown < 0 || colLeft < 0) break;
            if (this._piecesBoard[rowDown][colLeft].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, colLeft));
            } else if (this._piecesBoard[rowDown][colLeft].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, colLeft));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
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
        const [ row, column ] = algebraicToInts(initialPosition);
        const pieceColor = this._piecesBoard[row][column].color;
        const legalSquaresFound = new Set();
        
        for (
            let rowDown = row - 1, colRight = column + 1; 
            rowDown > -1 && colRight < 8;
            --rowDown, ++colRight
        ) {
            if (rowDown < 0 || colRight > 7) break;
            if (this._piecesBoard[rowDown][colRight].isNullPiece()) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, colRight));
            } else if (this._piecesBoard[rowDown][colRight].color === oppositeColor(pieceColor)) {
                legalSquaresFound.add(intsToAlgebraic(rowDown, colRight));
                break;
            } else {
                break;
            }
        }

        return legalSquaresFound;
    }

    /**
     * Updates the legal squares for whatever piece is in the given position
     * @param {string} position position in algebraic notation
     */
    _updateLegalSquares(position) {
        const pieceToUpdate = this._getPiece(position);
        const [ row, column ] = algebraicToInts(position);
        if (pieceToUpdate.isNullPiece()) {
            throw new Error(`Given position ${position} does not contain a piece.`);
        }

        switch (pieceToUpdate.name) {
            case WHITE_ROOK_NAME:
            case BLACK_ROOK_NAME: {
                pieceToUpdate.legalSquares = new Set([
                    ...this._updateLegalSquaresGoUp(position),
                    ...this._updateLegalSquaresGoDown(position),
                    ...this._updateLegalSquaresGoLeft(position),
                    ...this._updateLegalSquaresGoRight(position)
                ]);

                break;
            }
            case WHITE_BISHOP_NAME:
            case BLACK_BISHOP_NAME: {
                pieceToUpdate.legalSquares = new Set([
                    ...this._updateLegalSquaresGoUpLeft(position),
                    ...this._updateLegalSquaresGoUpRight(position),
                    ...this._updateLegalSquaresGoDownLeft(position),
                    ...this._updateLegalSquaresGoDownRight(position)
                ]);

                break;
            }
            case WHITE_KNIGHT_NAME:
            case BLACK_KNIGHT_NAME: {
                let newPositions = [
                    [row + 2, column + 1], [row + 2, column - 1],
                    [row - 2, column + 1], [row - 2, column - 1],
                    [row + 1, column + 2], [row - 1, column + 2],
                    [row + 1, column - 2], [row - 1, column - 2]
                ];

                newPositions = newPositions.filter(([newRow, newColumn]) =>
                    (newRow < 8 && newRow > -1) && (newColumn < 8 && newColumn > -1)
                );
        
                const legalSquaresFound = new Set();
                newPositions.forEach(([newRow, newColumn]) => {
                    const cPiece = this._piecesBoard[newRow][newColumn];
                    if (
                        cPiece.isNullPiece() ||
                        cPiece.color === oppositeColor(pieceToUpdate.color)
                    ) {
                        legalSquaresFound.add(intsToAlgebraic(newRow, newColumn));
                    }
                });

                pieceToUpdate.legalSquares = legalSquaresFound;
                break;
            }
            case WHITE_KING_NAME:
            case BLACK_KING_NAME: {
                // TODO: In the future king will need to have castle
                let newPositions = [
                    [row - 1, column - 1], [row - 1, column], [row - 1, column + 1],
                    [row, column - 1], [row, column + 1],
                    [row + 1, column - 1], [row + 1, column], [row + 1, column + 1]
                ];

                newPositions = newPositions.filter(([newRow, newColumn]) =>
                    (newRow < 8 && newRow > -1) && (newColumn < 8 && newColumn > -1)
                );

                const legalSquaresFound = new Set();
                newPositions.forEach(([newRow, newColumn]) => {
                    const cPiece = this._piecesBoard[newRow][newColumn];
                    if (
                        cPiece.isNullPiece() ||
                        cPiece.color === oppositeColor(pieceToUpdate.color)
                    ) {
                        legalSquaresFound.add(intsToAlgebraic(newRow, newColumn));
                    }
                });

                pieceToUpdate.legalSquares = legalSquaresFound;
                break;
            }
            case WHITE_QUEEN_NAME:
            case BLACK_QUEEN_NAME: {
                pieceToUpdate.legalSquares = new Set([
                    ...this._updateLegalSquaresGoUp(position),
                    ...this._updateLegalSquaresGoDown(position),
                    ...this._updateLegalSquaresGoLeft(position),
                    ...this._updateLegalSquaresGoRight(position),
                    ...this._updateLegalSquaresGoUpLeft(position),
                    ...this._updateLegalSquaresGoUpRight(position),
                    ...this._updateLegalSquaresGoDownLeft(position),
                    ...this._updateLegalSquaresGoDownRight(position)
                ]);

                break;
            }
            case WHITE_PAWN_NAME:
            case BLACK_PAWN_NAME: {
                // TODO: In the future pawn will need to have en passant and promotions

                // If pawn has WHITE_PIECE_COLOR, only allow for it to move by
                // decreasing the row index.
                // Otherwise, if pawn has BLACK_PIECE_COLOR, only allow for it to move by
                // increasing the row index.
                // The lines below are meant to work for both colors of pawns, even
                // though the logic is slightly different (as described above)

                const rowIncrementValues = { [WHITE_PAWN_NAME]: -1, [BLACK_PAWN_NAME]: 1 };
                const pawnMoveValue = rowIncrementValues[pieceToUpdate.name];
                const rowUp = row + pawnMoveValue;
                const twoRowsUp = row + 2 * pawnMoveValue;

                // Moving forward
                const legalSquaresFound = new Set();
                if (this._piecesBoard[rowUp][column].isNullPiece()) {
                    legalSquaresFound.add(intsToAlgebraic(rowUp, column));
                    
                    if (
                        this._piecesBoard[twoRowsUp][column].isNullPiece()
                        && pieceToUpdate.isFirstMove
                    ) {
                        legalSquaresFound.add(
                            intsToAlgebraic(twoRowsUp, column)
                        );
                    }
                }

                // Capturing pieces
                const columns = [];
                if (column + 1 < 7) columns.push(1);
                if (column - 1 > -1) columns.push(-1);

                columns.forEach(col => {
                    if (
                        !this._piecesBoard[rowUp][column + col].isNullPiece() &&
                        this._piecesBoard[rowUp][column + col]
                            .color === oppositeColor(pieceToUpdate.color)
                    ) {
                        legalSquaresFound.add(
                            intsToAlgebraic(rowUp, column + col)
                        );
                    }
                });

                pieceToUpdate.legalSquares = legalSquaresFound;
                break;
            }
        }
    }
}

export default Board;
