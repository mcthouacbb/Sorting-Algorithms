import { sleep } from "../utils.js";

export async function heapSort(array, renderer, region) {
    async function heapify(len, node) {
        let largest = node;
        let left = 2 * node + 1;
        let right = 2 * node + 2;
        if (left < len && array[left] > array[largest])
            largest = left;
        if (right < len && array[right] > array[largest])
            largest = right;

        if (largest != node) {
            [array[largest], array[node]] = [array[node], array[largest]];
            renderer.renderArray(array, region);
            await sleep(20);
            await heapify(len, largest);
        }
    }
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        await heapify(array.length, i);
    }

    for (let i = array.length - 1; i >= 0; i--) {
        [array[i], array[0]] = [array[0], array[i]]
        await heapify(i, 0);
        renderer.renderArray(array, region);
        await sleep(20);
    }
}
