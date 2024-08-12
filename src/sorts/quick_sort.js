import { mapInit } from "../utils.js";

function partition(context, begin, end, pivot) {
    const array = context.array;
    let oldBegin = begin;
    let oldEnd = end - 1;
    begin--;
    for (;;) {
        do {
            begin++;
            context.render(mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            context.timer.wait(2);
        } while (array[begin] < pivot);

        do {
            end--;
            context.render(mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            context.timer.wait(2);
        } while (array[end] > pivot);

        if (begin >= end)
            return end;

        [array[begin], array[end]] = [array[end], array[begin]];
        context.render(mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
        context.timer.wait(5);
    }
}

export function quickSort(context) {
    quickSortImpl(context, 0, context.array.length);
}

export function quickSortImpl(context, begin, end) {
    if (end - begin < 2)
        return;
    let pivotIdx = Math.floor((begin + end) / 2);
    if (pivotIdx == end - 1)
        pivotIdx--;
    let pivot = context.array[pivotIdx];
    pivotIdx = partition(context, begin, end, pivot);
    context.render(mapInit([begin, end - 1], ["rgb(242, 143, 44)", "rgb(242, 143, 44)"]));
    context.timer.wait(5);
    quickSortImpl(context, begin, pivotIdx + 1);
    quickSortImpl(context, pivotIdx + 1, end);
}
