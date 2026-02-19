import { SortStats } from "../sort_stats.js";

export function* bubbleSort(context) {
    let stats = new SortStats();
    const array = context.array;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            stats.comparisons++;
            if (array[j] > array[j + 1]) {
                stats.swaps++;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            yield context.render(stats);
            stats.wait(8);
        }
    }
}
