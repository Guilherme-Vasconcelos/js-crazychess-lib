/**
 * Base class for Piece classes. Should not be used directly by the user.
 */
class Piece {
    /**
     * Creates a chess piece with available legal squares to move, name, etc
     */
    constructor() {
        this.legalSquares = [];
        this.name;
        this.color;
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
        super();
        switch (color) {
            case 'white':
                this.name = 'R';
                break;
            case 'black':
                this.name = 'r';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        switch (color) {
            case 'white':
                this.name = 'B';
                break;
            case 'black':
                this.name = 'b';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        switch (color) {
            case 'white':
                this.name = 'N';
                break;
            case 'black':
                this.name = 'n';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        switch (color) {
            case 'white':
                this.name = 'K';
                break;
            case 'black':
                this.name = 'k';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        switch (color) {
            case 'white':
                this.name = 'Q';
                break;
            case 'black':
                this.name = 'q';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        switch (color) {
            case 'white':
                this.name = 'P';
                break;
            case 'black':
                this.name = 'p';
                break;
            default:
                throw new Error('Invalid color ' + color + '. A chess piece' +
                    'must either be \'white\' or \'black\'.');  
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
        super();
        this.name = '.';
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
