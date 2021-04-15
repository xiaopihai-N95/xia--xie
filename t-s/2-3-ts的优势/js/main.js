"use strict";
/* type Point = {
  x: number,
  y: number
} */
const demo = function (data) {
    return Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2));
};
const result = demo({ x: 3, y: 4 });
console.log(result);
