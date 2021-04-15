/* type Point = {
  x: number,
  y: number
} */

// 也可以这样写
interface Point {
  x: number,
  y: number
}

const demo = function (data: Point) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}

const result = demo({x: 3, y: 4})
console.log(result)
