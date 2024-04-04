import { getSmallestLargerValue, getLargestLesserValue } from '../src/utils';

describe('getSmallestLesserValue', () => {
    test('testing that smallest larger value is found for number in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 2)).toBe(4);
    });

    test('testing that smallest larger value is found for number not in list', () => {
        expect(getSmallestLargerValue([0,2,90,4,1,12,123], 5)).toBe(12);
    });
});

describe('getLargestLesserValue', () => {
    test('testing that largest smaller value is found for number in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 12)).toBe(4);
    });

    test('testing that largest smaller value is found for number not in list', () => {
        expect(getLargestLesserValue([0,2,90,4,1,12,123], 6)).toBe(4);
    });
});
