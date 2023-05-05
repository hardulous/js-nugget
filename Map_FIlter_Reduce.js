// 1. Map , Filter And Reduce

// (A) .map() => It is used to iterate over an array and apply a callback function to each element of the array, creating a new array with the results. The map() function takes a callback function as an argument, which is executed for each element of the array.

/*

The callbackFunction (item,index,arr) takes three arguments:

1. (item) The current element being processed
2. (index) The index of the current element being processed
3. (arr) The array that map() was called upon

*/

const numbers1 = [1, 2, 3, 4, 5];
const multipliedNumbers = numbers1.map((number) => number * 2);
// console.log(multipliedNumbers);

// (B). filter() => It is used to iterate over an array and filter out elements that do not meet a certain condition, creating a new array with the filtered elements. The filter() function takes a callback function as an argument, which is executed for each element of the array.

/*

The callbackFunction (item,index,arr) takes three arguments:

1. (item) The current element being processed
2. (index) The index of the current element being processed
3. (arr) The array that map() was called upon

*/

const numbers2 = [1, 2, 3, 4, 5];
const evenNumbers = numbers2.filter((number) => number % 2 === 0);
// console.log(evenNumbers);

// (C). reduce() => It is used to reduce down the array of values down to only one values by executing a callback function for every element in an array. reduce(callBack,initialVal) , where callBack is function to be execute for every element in array and initialVal is starting val of accumulator and if there is no initialVal then reduce method use 1st element of array as initialVal and iteration start from 2nd element of array

/*

The callbackFunction (acc,curr,index,arr) takes upto 4 arguments:

1. The accumulator (acc), which is the value that is accumulated or return during the iteration
2. (crr) The current element being processed
3. (index) is index of current element being processed
4. (arr) The array that reduce() was called upon

*/

const numbers3 = [1, 2, 3, 4, 5];
const finalVal = numbers3.reduce((acc, curr, index, arr) => {
  return acc + curr;
}, 0);
// console.log(finalVal);

// 2. Polyfills =>  A polyfill is a piece of code that provides the functionality of a modern JavaScript feature to an older browser that does not support it. Polyfills typically check if the feature is supported in the current browser and, if not, they provide the necessary code to emulate the missing functionality. This can include adding new methods to existing objects or creating new objects entirely.

// (A) Polyfills for .map() ::

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    // here above this will refer to the array which is calling this .myMap() method
    temp.push(cb(this[i], i, this));
  }
  return temp;
};

const no1 = [1, 2, 3, 4, 5];
const mulNo = no1.myMap((number) => number * 2);
// console.log(mulNo);

// (B) Polyfills for .filter() ::

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    // here above this will refer to the array which is calling this .myFilter() method
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const no2 = [1, 2, 3, 4, 5];
const evenNo = no2.filter((number) => number % 2 === 0);
// console.log(evenNo);

// (C) Polyfills for .reduce() ""

Array.prototype.myReduce = function (cb, val) {
  let acc;
  for (let i = 0; i < this.length; i++) {
    // here above this will refer to the array which is calling this .myReduce() method
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};

const no3 = [1, 2, 3, 4, 5];
const finVal = no3.myReduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);
// console.log(finVal);

