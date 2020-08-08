import { oppositeColor, algebraicToInts, intsToAlgebraic} from '../src/helpers.js';
import { WHITE_PIECE_COLOR, BLACK_PIECE_COLOR } from '../src/constants.js';

test('Valid ints to algebraic conversions', () => {
    const valuesForColumns = {
        a: 0, b: 1, c: 2,
        d: 3, e: 4, f: 5,
        g: 6, h: 7
    }
    let positions = []
    Object.keys(valuesForColumns).forEach(value => {
        for (let i = 8; i > 0; --i) {
            positions.push([`${value}${i}`, 8 - i, valuesForColumns[value]]);
        }
    });

    positions.forEach(([algebraicPosition, row, column]) => {
        expect(intsToAlgebraic(row, column)).toBe(algebraicPosition);
    });
});

test('Valid algebraic to ints conversions', () => {
    const valuesForColumns = {
        a: 0, b: 1, c: 2,
        d: 3, e: 4, f: 5,
        g: 6, h: 7
    }
    let positions = []
    Object.keys(valuesForColumns).forEach(value => {
        for (let i = 8; i > 0; --i) {
            positions.push([`${value}${i}`, 8 - i, valuesForColumns[value]]);
        }
    });

    positions.forEach(([algebraicPosition, row, column]) => {
        expect(algebraicToInts(algebraicPosition)[0]).toBe(row);
        expect(algebraicToInts(algebraicPosition)[1]).toBe(column);
    });
});

test('Valid colors to oppose', () => {
    expect(oppositeColor(WHITE_PIECE_COLOR)).toBe(BLACK_PIECE_COLOR);
    expect(oppositeColor(BLACK_PIECE_COLOR)).toBe(WHITE_PIECE_COLOR);
});

test('Invalid colors to oppose', () => {
    const colors = ['orange', 'asdasd', null, undefined];

    colors.forEach(color => {
        expect(() => {
            oppositeColor(color);
        }).toThrow('Invalid color');
    });
});

test('Helper handles invalid ints to algebraic conversions', () => {
    const positions = [
        [8, 8], [-1, 0], [3, 12],
        [null, null], [undefined, undefined],
        ['_', '+'], ['a', 15], [15, 'b'],
        ['hey', 7], [2, 'hey'], [-15, -15]
    ];

    positions.forEach(([row, column]) => {
        expect(() => {
            intsToAlgebraic(row, column);
        }).toThrow();
    });
});

test('Helper handles invalid algebraic to ints conversions', () => {
    const positions = [
        'a0', 'a9', 'b-1',
        'j3', 'j0', 'm5',
        '_', '+', '-',
        15, 67, -1, undefined,
        null
    ];

    positions.forEach(position => {
        expect(() => {
            algebraicToInts(position);
        }).toThrow();
    });
});
