import { mapInit } from "../utils.js";

function merge(contextSrc, contextDst, begin, begin2, end) {
    const srcArray = contextSrc.array;
    const dstArray = contextDst.array;
    let srcL = begin;
    let srcR = begin2;
    for (let curr = begin; curr < end; curr++) {
        if (srcL < begin2 && (srcR >= end || srcArray[srcL] <= srcArray[srcR]))
            dstArray[curr] = srcArray[srcL++];
        else
            dstArray[curr] = srcArray[srcR++];
        contextSrc.render(mapInit([srcL, srcR, end], ["rgb(0, 255, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
        contextDst.render(mapInit([curr, end], ["rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
        contextSrc.timer.wait(8);
        contextDst.timer.wait(8);
    }
}

export function mergeSort(context1, context2) {
    mergeSortImpl(context1, context2, 0, context1.array.length);
}

export function mergeSortImpl(contextSrc, contextDst, begin, end) {
    if (end - begin <= 1)
        return;
    let middle = Math.floor((begin + end) / 2);
    mergeSortImpl(contextDst, contextSrc, begin, middle);
    mergeSortImpl(contextDst, contextSrc, middle, end);
    merge(contextSrc, contextDst, begin, middle, end);
}
