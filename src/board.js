import { Rook, Bishop, Knight, King, Queen, Pawn, NullPiece } from './pieces.js';

class Board {
    constructor(initialPositionFEN) {
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

    showBoard() {
        let output = ''
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                output += this._piecesBoard[i][j].name;
            }
            output += '\n';
        }
        console.log(output);
    }
}

export default Board;
