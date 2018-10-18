var quickSort = require('./MultiQuickSort')

var a1 = []
var a2 = []
var a3 = []
var a4 = []
var a5 = []
var a6 = []
var a7 = []
var a8 = []

var l = 100000
// 可以修改b值而改变取值范围
var b = l
for (var i = 0; i < l; i++) 
{
	var one = Math.ceil(Math.random() * b)

	a1.push({power:one})
	a2.push(one)
	a3.push({power:one})
	a4.push({power:one})
	a5.push({power:one})
	a6.push({power:one})
	a7.push({power:one})
	a8.push({power:one})
}

console.time("quick3wayInsertSortByBentleyMcIlroy")
quickSort.QuickSort(a1,"quick3wayInsertSortByBentleyMcIlroy",1,"power")
console.timeEnd("quick3wayInsertSortByBentleyMcIlroy")

console.time("insertionSort")
quickSort.QuickSort(a2,"insertionSort")
console.timeEnd("insertionSort")

console.time("quick3wayInsertSortWithMedian")
quickSort.QuickSort(a3,"quick3wayInsertSortWithMedian",1,"power")
console.timeEnd("quick3wayInsertSortWithMedian")

console.time("defaultSort")
quickSort.QuickSort(a4,"defaultSort",1,"power")
console.timeEnd("defaultSort")

console.time("quick3wayByDijkstra")
quickSort.QuickSort(a5,"quick3wayByDijkstra",1,"power")
console.timeEnd("quick3wayByDijkstra")

console.time("quick3wayInsertSortByDijkstra")
quickSort.QuickSort(a6,"quick3wayInsertSortByDijkstra",1,"power")
console.timeEnd("quick3wayInsertSortByDijkstra")

console.time("quick2wayByHoare")
quickSort.QuickSort(a7,"quick2wayByHoare",1,"power")
console.timeEnd("quick2wayByHoare")

console.time("quick3wayByBentleyMcIlroy")
quickSort.QuickSort(a8,"quick3wayByBentleyMcIlroy",1,"power")
console.timeEnd("quick3wayByBentleyMcIlroy")

// console.log("result1",a1)


