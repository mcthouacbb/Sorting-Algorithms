import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";

const array = new Array(100);

for (let i = 0; i < array.length; i++) {
    array[i] = i;
}

shuffle(array);

const array2 = array.slice();
const array3 = array.slice();
const array4 = array.slice();

renderer.setSize(300, 400, 3, 1);
sorts.quickSort(array, renderer, 0);
sorts.insertionSort(array2, renderer, 1);
sorts.bubbleSort(array3, renderer, 2);
sorts.heapSort(array4, renderer, 3);
