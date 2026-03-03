import { MultiRender } from "../context.js";
import { SortStats } from "../sort_stats.js";
import { mapInit } from "../utils.js";

export function* radixSort(context1, context2) {
    let stats = new SortStats();
    for (let digit = 0; digit < 16; digit++) {
        yield* bucket(stats, context1, context2, digit);
        let done = yield* copyBack(stats, context1, context2);
        if (done) {
            break;
        }
    }
}

// base 4 assumed
export function* bucket(stats, context1, context2, digit) {
    let shift = 2 * digit;
    let lsdCount = [0, 0, 0, 0];
    for (let i = 0; i < context1.array.length; i++) {
        let lsd = (context1.array[i] >> shift) % 4;
        lsdCount[lsd]++;
    }

    let offsets = [0, 0, 0, 0];
    for (let i = 1; i < 4; i++) {
        offsets[i] = offsets[i - 1] + lsdCount[i - 1];
    }

    let lastIter = lsdCount[0] == context1.array.length;

    for (let i = 0; i < context1.array.length; i++) {
        let lsd = (context1.array[i] >> shift) % 4;
        let offset = offsets[lsd]++;
        context2.array[offset] = context1.array[i];
        stats.swaps++;

        yield new MultiRender([
            context1.render(stats, mapInit([i], ["rgb(255, 0, 0)"])),
            context2.render(stats, mapInit([...offsets], new Array(4).fill("rgb(0, 255, 0)")))
        ]);
        stats.wait(4);
    }

    return lastIter;
}

export function* copyBack(stats, context1, context2) {
    let done = true;
    for (let i = 0; i < context1.array.length; i++) {
        context1.array[i] = context2.array[i];
        if (i > 0 && context1.array[i] < context1.array[i - 1]) {
            done = false;
        }
        stats.swaps++;
        yield new MultiRender([
            context1.render(stats, mapInit([i], ["rgb(255, 0, 0)"])),
            context2.render(stats, mapInit([i], ["rgb(0, 255, 0)"]))
        ]);
        stats.wait(2);
    }
    return done;
}
