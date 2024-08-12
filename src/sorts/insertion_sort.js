import { sleep, mapInit } from "../utils.js";

export async function insertionSort(array, renderer, region) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            renderer.renderArray(array, region, mapInit([i, j - 1], ["rgb(147, 98, 252)", "rgb(242, 143, 44)"]));
            await sleep(5);
        }
    }
}
