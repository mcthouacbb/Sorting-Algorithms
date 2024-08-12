import { sleep } from "../utils.js";

export async function bubbleSort(array, renderer, region) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1])
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            renderer.renderArray(array, region);
            await sleep(8);
        }
    }
}
