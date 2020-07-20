class Piece {
    constructor() {
        this.legalSquares = [];
        this.name;
        this.color;
    }
}

class Rook extends Piece {
    constructor() {
        super();
        this.name = 'Rook';
    }
}

class Bishop extends Piece {
    constructor() {
        super();
        this.name = 'Bishop';
    }
}

class Knight extends Piece {
    constructor() {
        super();
        this.name = 'Knight';
    }
}

class King extends Piece {
    constructor() {
        super();
        this.name = 'King';
    }
}

class Queen extends Piece {
    constructor() {
        super();
        this.name = 'Queen';
    }
}

class Pawn extends Piece {
    constructor() {
        super();
        this.name = 'Pawn';
    }
}

class NullPiece extends Piece {
    constructor() {
        super();
        this.name = ' . ';
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
