import { mapInit } from "../utils.js";
import { Timer } from "../timer.js";

function* merge(timer, contextSrc, contextDst, begin, begin2, end) {
    const srcArray = contextSrc.array;
    const dstArray = contextDst.array;
    let srcL = begin;
    let srcR = begin2;
    for (let curr = begin; curr < end; curr++) {
        if (srcL < begin2 && (srcR >= end || srcArray[srcL] <= srcArray[srcR]))
            dstArray[curr] = srcArray[srcL++];
        else
            dstArray[curr] = srcArray[srcR++];
        yield contextSrc.render(timer, mapInit([srcL, srcR, end], ["rgb(0, 255, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
        yield contextDst.render(timer, mapInit([curr, end], ["rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
        timer.wait(8);
    }
}

export function* mergeSort(context1, context2) {
    yield* mergeSortImpl(new Timer(), context1, context2, 0, context1.array.length);
}

function* mergeSortImpl(timer, contextSrc, contextDst, begin, end) {
    if (end - begin <= 1)
        return;
    let middle = Math.floor((begin + end) / 2);
    yield* mergeSortImpl(timer, contextDst, contextSrc, begin, middle);
    yield* mergeSortImpl(timer, contextDst, contextSrc, middle, end);
    yield* merge(timer, contextSrc, contextDst, begin, middle, end);
}
