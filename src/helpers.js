import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from './constants.js';

/**
 * Function returns the opposite to the given color
 * @param {string} color color to return the opposite (use constants.js)
 */
function _oppositeColor(color) {
    if (color === WHITE_PIECE_COLOR) return BLACK_PIECE_COLOR;
    else return WHITE_PIECE_COLOR;
}

/**
 * Converts a given position in algebraic notation to row/column in matrix.
 * Examples: 'a8' -> 0, 0 / 'b6' -> 2, 1 / etc.
 * @param {string} algebraicPosition position in algebraic notation
 * @returns array of integers [row, column]
 */
function _algebraicToInts(algebraicPosition) {
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
function _intsToAlgebraic(row, column) {
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

export {
    _oppositeColor,
    _algebraicToInts,
    _intsToAlgebraic
}
