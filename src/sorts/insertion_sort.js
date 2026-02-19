import { mapInit } from "../utils.js";
import { SortStats } from "../sort_stats.js";

export function* insertionSort(context) {
    const array = context.array;
    const stats = new SortStats();
    for (let i = 1; i < array.length; i++) {
        let j = i;
        for (; j > 0 && array[j] < array[j - 1]; j--) {
            stats.comparisons++;
            stats.swaps++;
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            yield context.render(stats, mapInit([i, j - 1], ["rgb(147, 98, 252)", "rgb(242, 143, 44)"]));
            stats.wait(5);
        }
        if (j > 0)
            stats.comparisons++;
    }
}
