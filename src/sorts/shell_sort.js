import { mapInit } from "../utils.js";

// see: https://en.wikipedia.org/wiki/Shellsort#Gap_sequences
export const GapSequence = Object.freeze({
    Ci01: 0,
    Se86: 1,
    Is85: 2,
    Se82: 3,
    Kn73: 4
});

// hardcoded(for now)
const Ci01Gaps = [
    1, 4, 10, 23, 57, 132, 301, 701
].toReversed();

const Se86Gaps = [
    1, 5, 19, 41, 109, 209, 505, 929
].toReversed();

const Is85Gaps = [
    1, 3, 7, 21, 48, 112, 336, 861
].toReversed();

const Se82Gaps = [
    1, 8, 23, 77, 281, 1073
].toReversed();

const Kn73Gaps = [
    1, 4, 13, 40, 121, 364, 1093
].toReversed();

const GAPS = [
    Ci01Gaps,
    Se86Gaps,
    Is85Gaps,
    Se82Gaps,
    Kn73Gaps
];

export function shellSort(context, sequence = GapSequence.Ci01) {
    const array = context.array;
    for (const gap of GAPS[sequence]) {
        for (let i = gap; i < array.length; i++) {
            for (let j = i; j >= gap && array[j] < array[j - gap]; j -= gap) {
                [array[j], array[j - gap]] = [array[j - gap], array[j]];
                context.render(mapInit([i, j - gap], ["rgb(147, 98, 252)", "rgb(242, 143, 44)"]));
                context.timer.wait(13);
            }
        }
    }
}
