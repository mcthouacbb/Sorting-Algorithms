import { sleep } from "../utils.js";

export async function selectionSort(array, renderer, region) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx])
                minIdx = j;
            renderer.renderArray(array, region);
            await sleep(5);
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        renderer.renderArray(array, region);
        await sleep(5);
    }
}
