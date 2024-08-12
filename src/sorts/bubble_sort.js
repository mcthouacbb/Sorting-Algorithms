export async function bubbleSort(context) {
    const array = context.array;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1])
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            context.render();
            context.timer.wait(8);
        }
    }
}
