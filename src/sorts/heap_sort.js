let colors = [
    "rgb(147, 98, 252)",
    "rgb(247, 8, 8)",
    "rgb(242, 143, 44)",
    "rgb(225, 242, 70)",
    "rgb(94, 237, 81)",
    "rgb(98, 193, 252)"
];

function heapLevel(nodeIdx) {
    return Math.floor(Math.log2(nodeIdx + 1));
}

export function heapSort(context) {
    const array = context.array;
    let markers = new Map();
    function heapify(len, node) {
        let largest = node;
        let left = 2 * node + 1;
        let right = 2 * node + 2;
        if (left < len && array[left] > array[largest])
            largest = left;
        if (right < len && array[right] > array[largest])
            largest = right;

        if (largest != node) {
            [array[largest], array[node]] = [array[node], array[largest]];
            context.render(markers);
            context.timer.wait(18);
            heapify(len, largest);
        }
        if (left < len)
            markers.set(left, colors[heapLevel(left) % colors.length]);
        if (right < len)
            markers.set(right, colors[heapLevel(right) % colors.length]);
    }
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapify(array.length, i);
        markers.set(i, colors[heapLevel(i) % colors.length]);
    }

    for (let i = array.length - 1; i >= 0; i--) {
        [array[i], array[0]] = [array[0], array[i]];
        markers.delete(i);
        heapify(i, 0);
        context.render(markers);
        context.timer.wait(18);
    }
}
