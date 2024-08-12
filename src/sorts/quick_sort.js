import { sleep, mapInit } from "../utils.js";

async function partition(renderer, region, array, begin, end, pivot) {
    let oldBegin = begin;
    let oldEnd = end - 1;
    begin--;
    for (;;) {
        do {
            begin++;
            renderer.renderArray(array, region, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            await sleep(5);
        } while (array[begin] < pivot);

        do {
            end--;
            renderer.renderArray(array, region, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
            await sleep(5);
        } while (array[end] > pivot);

        if (begin >= end)
            return end;

        [array[begin], array[end]] = [array[end], array[begin]];
        renderer.renderArray(array, region, mapInit([oldBegin, oldEnd, begin, end], ["rgb(242, 143, 44)", "rgb(242, 143, 44)", "rgb(147, 98, 252)", "rgb(147, 98, 252)"]));
        await sleep(5);
    }
}

export async function quickSort(array, renderer, region) {
    await quickSortImpl(renderer, region, array, 0, array.length);
}

export async function quickSortImpl(renderer, region, array, begin, end) {
    if (end - begin < 2)
        return;
    let pivotIdx = Math.floor((begin + end) / 2);
    if (pivotIdx == end - 1)
        pivotIdx--;
    let pivot = array[pivotIdx];
    pivotIdx = await partition(renderer, region, array, begin, end, pivot);
    renderer.renderArray(array, region, mapInit([begin, end - 1], ["rgb(242, 143, 44)", "rgb(242, 143, 44)"]));
    await sleep(5);
    await quickSortImpl(renderer, region, array, begin, pivotIdx + 1);
    await quickSortImpl(renderer, region, array, pivotIdx + 1, end);
}
