import { Range, mapInit } from "../utils.js";

export async function insertionSort(context) {
    const array = context.array;
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            context.render(mapInit([i, j - 1], ["rgb(147, 98, 252)", "rgb(242, 143, 44)"]));
            context.timer.wait(5);
        }
    }
}
