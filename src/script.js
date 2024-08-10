import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";

const array = new Array(50);

for (let i = 0; i < array.length; i++) {
    array[i] = i;
}

shuffle(array);

const array2 = array.slice();

renderer.setSize(300, 300, 3, 1);
renderer.renderArray(array, 0);
renderer.renderArray(array2, 1);
sorts.quickSort(array, renderer, 0);
sorts.insertionSort(array2, renderer, 1);
