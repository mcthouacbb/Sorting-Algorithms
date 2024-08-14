import { mapInit } from "../utils.js";
import { Timer } from "../timer.js";

function* partition(timer, context, begin, end, pivot) {
    const array = context.array;
    let oldBegin = begin;
    let oldEnd = end - 1;
    begin--;
    for (;;) {
        do {
            begin++;
            yield context.render(timer, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            timer.wait(2);
        } while (array[begin] < pivot);

        do {
            end--;
            yield context.render(timer, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            timer.wait(2);
        } while (array[end] > pivot);

        if (begin >= end)
            return end;

        [array[begin], array[end]] = [array[end], array[begin]];
        yield context.render(timer, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
        timer.wait(5);
    }
}

export function* quickSort(context) {
    yield* quickSortImpl(new Timer(), context, 0, context.array.length);
}

function* quickSortImpl(timer, context, begin, end) {
    if (end - begin < 2)
        return;
    let pivotIdx = Math.floor((begin + end) / 2);
    if (pivotIdx == end - 1)
        pivotIdx--;
    let pivot = context.array[pivotIdx];
    pivotIdx = yield* partition(timer, context, begin, end, pivot);
    yield context.render(timer, mapInit([begin, end - 1], ["rgb(242, 143, 44)", "rgb(242, 143, 44)"]));
    timer.wait(5);
    yield* quickSortImpl(timer, context, begin, pivotIdx + 1);
    yield* quickSortImpl(timer, context, pivotIdx + 1, end);
}
