import { renderer } from "./renderer.js";
import { shuffle } from "./utils.js";
import * as sorts from "./sorts/sorts.js";

const array = new Array(100);

for (let i = 0; i < 100; i++) {
    array[i] = i;
}

shuffle(array);

renderer.setSize(300, 100);
renderer.renderArray(array, 3, 1);
sorts.quickSort(array, renderer);
