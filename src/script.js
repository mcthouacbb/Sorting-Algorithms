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

renderer.setSize(300, 300, 3, 1);
renderer.renderArray(array, 0);
renderer.renderArray(array2, 1);
renderer.renderArray(array3, 2);
sorts.quickSort(array, renderer, 0);
sorts.insertionSort(array2, renderer, 1);
sorts.bubbleSort(array3, renderer, 2);
