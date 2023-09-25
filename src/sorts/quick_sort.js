import { sleep } from "../utils.js";

async function partition(renderer, array, begin, end, pivot) {
    begin--;
    for (;;) {
        do {
            begin++;
        } while (array[begin] < pivot);

        do {
            end--;
        } while (array[end] > pivot);

        if (begin >= end)
            return end;

        [array[begin], array[end]] = [array[end], array[begin]];
        renderer.renderArray(array, 3, 1);
        await sleep(20);
    }
}

export async function quickSort(array, renderer) {
    await quickSortImpl(renderer, array, 0, array.length);
}

export async function quickSortImpl(renderer, array, begin, end) {
    if (end - begin < 2)
        return;
    let pivotIdx = Math.floor((begin + end) / 2);
    if (pivotIdx == end - 1)
        pivotIdx--;
    let pivot = array[pivotIdx];
    pivotIdx = await partition(renderer, array, begin, end, pivot);
    renderer.renderArray(array, 3, 1);
    await sleep(20);
    await quickSortImpl(renderer, array, begin, pivotIdx + 1);
    await quickSortImpl(renderer, array, pivotIdx + 1, end);
}