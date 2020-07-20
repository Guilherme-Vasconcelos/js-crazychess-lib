class Piece {
    constructor() {
        this.legalSquares = [];
        this.name;
        this.isNullPiece;
        this.color;
    }
}

class Rook extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a rook');
    }
}

class Bishop extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a bishop');
    }
}

class Knight extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a knight');
    }
}

class King extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a king');
    }
}

class Queen extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a queen');
    }
}

class Pawn extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a pawn');
    }
}

class NullPiece extends Piece {
    constructor() {
        super();
        console.log('Hey, I am a nullpiece');
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
