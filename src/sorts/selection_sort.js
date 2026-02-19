import { mapInit } from "../utils.js";
import { SortStats } from "../sort_stats.js";

export function* selectionSort(context) {
    const array = context.array;
    const stats = new SortStats();
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            stats.comparisons++;
            if (array[j] < array[minIdx])
                minIdx = j;
            yield context.render(stats, mapInit([i, j, minIdx], ["rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 0)"]));
            stats.wait(5);
        }
        stats.swaps++;
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        yield context.render(stats, mapInit([i], ["rgb(255, 0, 0)"]));
        stats.wait(5);
    }
}
