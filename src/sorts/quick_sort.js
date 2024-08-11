import { sleep } from "../utils.js";

async function partition(renderer, region, array, begin, end, pivot) {
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
        renderer.renderArray(array, region);
        await sleep(20);
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
    renderer.renderArray(array, region);
    await sleep(20);
    await quickSortImpl(renderer, region, array, begin, pivotIdx + 1);
    await quickSortImpl(renderer, region, array, pivotIdx + 1, end);
}
