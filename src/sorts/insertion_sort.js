import { sleep } from "../utils.js";

export async function insertionSort(array, renderer, region) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            renderer.renderArray(array, region);
            await sleep(5);
        }
    }
}
