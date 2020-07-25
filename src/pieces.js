import {
    WHITE_PIECE_COLOR, BLACK_PIECE_COLOR, WHITE_ROOK_NAME, BLACK_ROOK_NAME,
    WHITE_BISHOP_NAME, BLACK_BISHOP_NAME, WHITE_KNIGHT_NAME, BLACK_KNIGHT_NAME,
    WHITE_QUEEN_NAME, BLACK_QUEEN_NAME, WHITE_KING_NAME, BLACK_KING_NAME,
    WHITE_PAWN_NAME, BLACK_PAWN_NAME, NULL_PIECE_NAME
} from './constants.js';

/**
 * Base class for Piece classes. Should not be used directly by the user.
 */
class Piece {
    /**
     * Creates a chess piece with available legal squares to move, name, etc
     */
    constructor(color) {
        this.legalSquares = new Set();
        this.name = null;
        switch (color) {
            case WHITE_PIECE_COLOR:
                this.color = WHITE_PIECE_COLOR;
                break;
            case BLACK_PIECE_COLOR:
                this.color = BLACK_PIECE_COLOR;
                break;
            default:
                throw new Error(`Invalid color '${color}'. A chess piece ` +
                    `must be either 'white' or 'black'.`);  
        }
    }

    /**
     * Checks if piece is null
     */
    isNullPiece() {
        return this.name === NULL_PIECE_NAME;
    }
}

/**
 * Class used to represent the Rook piece. Inherits from Piece.
 */
class Rook extends Piece {
    /**
     * Creates a rook
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_ROOK_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_ROOK_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the Bishop piece. Inherits from Piece.
 */
class Bishop extends Piece {
    /**
     * Creates a bishop
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_BISHOP_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_BISHOP_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the Knight piece. Inherits from Piece.
 */
class Knight extends Piece {
    /**
     * Creates a knight
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_KNIGHT_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_KNIGHT_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the King piece. Inherits from Piece.
 */
class King extends Piece {
    /**
     * Creates a king
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_KING_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_KING_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the Queen piece. Inherits from Piece.
 */
class Queen extends Piece {
    /**
     * Creates a queen
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_QUEEN_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_QUEEN_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the Pawn piece. Inherits from Piece.
 */
class Pawn extends Piece {
    /**
     * Creates a pawn
     * @param {string} color color of your chess piece.
     * Your chess piece must be either 'white' or 'black'. 
     */
    constructor(color) {
        super(color);
        // Board constructor will change isFirstMove to true. Instantiating
        // the pawn with isFirstMove set to true brings a lot of problems,
        // such as the setFENPosition which could instantiate pawns in the
        // middle of the board with permission to jump two squares.
        this.isFirstMove = false;
        switch (this.color) {
            case WHITE_PIECE_COLOR:
                this.name = WHITE_PAWN_NAME;
                break;
            case BLACK_PIECE_COLOR:
                this.name = BLACK_PAWN_NAME;
                break;
        }
    }
}

/**
 * Class used to represent the NullPiece piece. Inherits from Piece.
 * A NullPiece does nothing. It is just a placeholder for empty positions
 * at the board.
 */
class NullPiece extends Piece {
    constructor() {
        // Parent constructor only accepts chess pieces that are either white
        // or black, so we need to pass one of these arguments even if we
        // will change the color right after.
        super(WHITE_PIECE_COLOR);
        this.name = NULL_PIECE_NAME;
        this.color = null;
        this.legalSquares = null;
    }
}

export {
    Rook,
    Bishop,
    Knight,
    King,
    Queen,
    Pawn,
    NullPiece,
}
