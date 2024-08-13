import { Timer } from "../timer.js";

export function* bubbleSort(context) {
    let timer = new Timer();
    const array = context.array;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1])
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            yield context.render(timer);
            timer.wait(8);
        }
    }
}
