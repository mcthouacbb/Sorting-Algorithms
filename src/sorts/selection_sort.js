import { mapInit } from "../utils.js";
import { Timer } from "../timer.js";

export function* selectionSort(context) {
    const array = context.array;
    const timer = new Timer();
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx])
                minIdx = j;
            yield context.render(timer, mapInit([i, j, minIdx], ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
            timer.wait(5);
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        yield context.render(timer, mapInit([i], ["rgb(255, 0, 0)"]));
        timer.wait(5);
    }
}
