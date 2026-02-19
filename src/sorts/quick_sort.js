import { mapInit } from "../utils.js";
import { SortStats } from "../sort_stats.js";

function* partition(stats, context, begin, end, pivot) {
    const array = context.array;
    let oldBegin = begin;
    let oldEnd = end - 1;
    begin--;
    for (;;) {
        do {
            begin++;
            yield context.render(stats, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            stats.wait(2);
            stats.comparisons++;
        } while (array[begin] < pivot);

        do {
            end--;
            yield context.render(stats, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            stats.wait(2);
            stats.comparisons++;
        } while (array[end] > pivot);

        if (begin >= end)
            return end;

        stats.swaps++;
        [array[begin], array[end]] = [array[end], array[begin]];
        yield context.render(stats, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
        stats.wait(5);
    }
}

export function* quickSort(context) {
    yield* quickSortImpl(new SortStats(), context, 0, context.array.length);
}

function* quickSortImpl(stats, context, begin, end) {
    if (end - begin < 2)
        return;
    let pivotIdx = Math.floor((begin + end) / 2);
    if (pivotIdx == end - 1)
        pivotIdx--;
    let pivot = context.array[pivotIdx];
    pivotIdx = yield* partition(stats, context, begin, end, pivot);
    yield context.render(stats, mapInit([begin, end - 1], ["rgb(242, 143, 44)", "rgb(242, 143, 44)"]));
    stats.wait(5);
    yield* quickSortImpl(stats, context, begin, pivotIdx + 1);
    yield* quickSortImpl(stats, context, pivotIdx + 1, end);
}
