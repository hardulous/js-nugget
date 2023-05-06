// Closures in js

// 1. Lexical Scopping => In js we have 3 types of scope global scope , local scope and block scope , But we also have lexical scope which means that availability of a variable within a nested block or function is determined by its location , A variable declared outside a function can be accesed inside that function and its inner functions as well but the oppsite is not true i.e variable declared inside a function is not accessible outside that function

// In other words, when a variable is accessed inside a function, JavaScript first looks for that variable within the function's local scope. If it's not found there, it then looks for the variable in the next outer scope, and so on, until it either finds the variable or reaches the global scope.

// EX ::

var name1 = "Aman Bisht"; // in global scope

function hi() {
  var name2 = "Super Man";
  console.log(name1); // can access variable of outer scope
}

// console.log(name2); // can't access inside scope variable in outer scope
hi();

// 2. Closure => closures are functions that have access to the variables and parameters of their outer function, even after that outer function has returned or no longer exist. This is because the inner function "closes over" the outer function's variables, forming a closure , In js closures are created every time a function is created . EX::

let globalName = ", Aman";
function outerFunction() {
  var outerVariable = "Hello, ";

  function innerFunction(name) {
    // this function is a closure
    console.log(outerVariable + name + globalName);
  }

  return innerFunction;
}

var greet = outerFunction();
greet("John"); // outputs "Hello, John"

// Advantage of closures is that closures make it possible for a function to have private variables , closures are used to control what is and isn't in the scope of particular function

// Every closure has 3 scope , A local scope which is in above case is scope of innerFunction(name) , A outer scope which is scope of outerFunction() and a global scope which is scope of window object and a closure can access varriable of all 3 scope

// Closure Scope Chain => It is not always necessary that a closure have only 3 scope but can have infinte no of scope in a case if outer function is itself a nested function then in this case closure have scope of outer's parent function and so on .... until it reach the global scope , Ex ::

var s1 = 10;
// global scope
function sum(a) {
  // outer's grandfather scope
  return function (b) {
    // outer's parent scope
    return function (c) {
      // outer scope
      return function (d) {
        // local scope have access to all above scope until reach the global scope
        return a + b + c + d + s1;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4));

// 3. Closure Questions

// (A). O/P of below

let count = 0;
(function printCount() {
  if (count === 0) {
    let count = 1;
    console.log(count);
  }
  console.log(count);
})();

// (B). Write a function that allow you to do this ::
/*

  var addSix = createBase(6);
  addSix(10)  return 16
  addSix(21) return 27

*/

function createBase(num1) {
  return function (num2) {
    // return a closure
    return num1 + num2;
  };
}

var addSix = createBase(6);
console.log(addSix(10));
console.log(addSix(21));

// (C). Time Optimization

function find(index) {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  console.log(a[index]);
}

console.time("start");
find(20);
console.timeEnd("start");

// In order to optimize using closure first we need to look at the functionality which is common for every function call which is in this case is for loop iterating 1 million time so we can extract it out and make it availabe to the closure function so ::

function findClosure() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }
  // below closure already have the above work done
  return function (index) {
    console.log(a[index]);
  };
}

const closureFind = findClosure();
console.time("start");
closureFind(20);
console.timeEnd("start");

// (D). Use var keyword to print 0,1,2 without use of let

for (var i = 0; i < 3; i++) {
  function print(num) {
    setTimeout(function log() {
      // here now this num is not var but a local variable
      console.log(num);
    }, 1000);
  }
  print(i);
}

// (E). Use closure to create a private counter

function counter() {
  var _counter = 0; // a private counter which is not accessible outside this function

  function add(increment) {
    _counter += increment;
  }
  function retrive() {
    return _counter;
  }
  return {
    add,
    retrive,
  };
}

const c = counter();
console.log(c.retrive());
c.add(10);
c.add(15);
console.log(c.retrive());

// (F). Make below function run only once i.e when function will console.log() only once and if next time executed it will not

let view;
function likeTheView() {
  view = "Aman Bisht";
  console.log("Hello ", view);
}

// Closure solution
function runOnlyOnce() {
  let callOnce = false;
  view = "Aman Bisht";
  return function () {
    if (!callOnce) {
      console.log("Hello", view);
      callOnce = true;
    }
  };
}

let callOnceFun = runOnlyOnce();
// calling multiple time but only 1 console will be shown
callOnceFun();
callOnceFun();
callOnceFun();
callOnceFun();
callOnceFun();
callOnceFun();

// (G). Closure vs Scope => Scope refers the region in your code from which a particular variable can be accessed and beyond the scope it can't be accesex . Every time you define a variable or a function in JavaScript, it is added to a particular scope. There are three main types of scopes in JavaScript: global scope, function scope, and block scope (introduced in ES6). Variables that are declared outside of any functions have global scope and can be accessed from anywhere in your code. Variables that are declared inside a function have function scope and can only be accessed within that function and any nested functions. Variables that are declared inside a block (i.e., a pair of curly braces) have block scope and can only be accessed within that block and any nested blocks. A closure, on the other hand, is a function that retains access to variables in its parent scope, even after the parent function has completed execution. When you create a closure, you essentially create a function that "remembers" the values of any variables that were in its outer scope.
