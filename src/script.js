import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";
import { sleep } from "./utils.js";

const array = new Array(100);

for (let i = 0; i < array.length; i++) {
    array[i] = i;
}

shuffle(array);
const array2 = array.slice();
const array3 = array.slice();
const array4 = array.slice();
const array5 = array.slice();
async function init() {
    renderer.setSize(300, 500, 3, 1);
    renderer.renderArray(array, 0);
    renderer.renderArray(array2, 1);
    renderer.renderArray(array3, 2);
    renderer.renderArray(array4, 3);
    renderer.renderArray(array5, 4);
    
    await sleep(1000);

    sorts.quickSort(array, renderer, 0);
    sorts.insertionSort(array2, renderer, 1);
    sorts.bubbleSort(array3, renderer, 2);
    sorts.heapSort(array4, renderer, 3);
    sorts.selectionSort(array5, renderer, 4);
}

init();
