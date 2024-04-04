export function getLargestLesserValue(elems: number[], target: number) {
    let max = -Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
        if (elems[i] < target && elems[i] > max) {
            max = elems[i];
        }
    }

    return max;
  }

export function getSmallestLargerValue(elems: number[], target: number) {
    let min = Infinity;
    elems = elems.sort((a,b) => a - b);

    for (let i = 0; i < elems.length; i++) {
        if (elems[i] > target && elems[i] < min) {
            min = elems[i];
        }
    }

    return min;
}