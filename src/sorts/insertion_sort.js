import { mapInit } from "../utils.js";
import { Timer } from "../timer.js";

export function* insertionSort(context) {
    const array = context.array;
    const timer = new Timer();
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0 && array[j] < array[j - 1]; j--) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            yield context.render(timer, mapInit([i, j - 1], ["rgb(147, 98, 252)", "rgb(242, 143, 44)"]));
            timer.wait(5);
        }
    }
}
