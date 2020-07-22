import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from './constants.js';

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
     * Checks if piece is null (i.e. name equals to '.')
     */
    isNullPiece() {
        return this.name === '.';
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
                this.name = 'R';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'r';
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
                this.name = 'B';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'b';
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
                this.name = 'N';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'n';
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
                this.name = 'K';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'k';
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
                this.name = 'Q';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'q';
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
                this.name = 'P';
                break;
            case BLACK_PIECE_COLOR:
                this.name = 'p';
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
        this.name = '.';
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
