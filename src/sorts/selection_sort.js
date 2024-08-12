import { sleep, mapInit } from "../utils.js";

export async function selectionSort(context) {
    const array = context.array;
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx])
                minIdx = j;
            context.render(mapInit([i, j, minIdx], ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
            context.timer.wait(5);
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        context.render(mapInit([i], ["rgb(255, 0, 0)"]));
        context.timer.wait(5);
    }
}
