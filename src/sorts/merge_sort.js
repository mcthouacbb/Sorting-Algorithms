import { mapInit } from "../utils.js";
import { SortStats } from "../sort_stats.js";
import { MultiRender } from "../context.js";

function* merge(stats, contextSrc, contextDst, begin, begin2, end) {
    const srcArray = contextSrc.array;
    const dstArray = contextDst.array;
    let srcL = begin;
    let srcR = begin2;
    for (let curr = begin; curr < end; curr++) {
        stats.swaps++;
        if (srcL < begin2 && srcR < end)
            stats.comparisons++;
        
        if (srcL < begin2 && (srcR >= end || srcArray[srcL] <= srcArray[srcR]))
            dstArray[curr] = srcArray[srcL++];
        else
            dstArray[curr] = srcArray[srcR++];
        yield new MultiRender([
            contextSrc.render(stats, mapInit([srcL, srcR, end], ["rgb(0, 255, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"])),
            contextDst.render(stats, mapInit([curr, end], ["rgb(0, 255, 0)", "rgb(255, 0, 0)"]))
        ]);
        stats.wait(6);
    }
}

export function* mergeSort(context1, context2) {
    yield* mergeSortImpl(new SortStats(), context1, context2, 0, context1.array.length);
}

function* mergeSortImpl(stats, contextSrc, contextDst, begin, end) {
    if (end - begin <= 1)
        return;
    let middle = Math.floor((begin + end) / 2);
    yield* mergeSortImpl(stats, contextDst, contextSrc, begin, middle);
    yield* mergeSortImpl(stats, contextDst, contextSrc, middle, end);
    yield* merge(stats, contextSrc, contextDst, begin, middle, end);
    yield new MultiRender([
        contextSrc.render(stats, mapInit([begin, middle, end], ["rgb(0, 255, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"])),
        contextDst.render(stats, mapInit([end], ["rgb(0, 255, 0)"]))
    ]);
    stats.wait(5);
}
