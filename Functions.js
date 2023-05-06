// Functions In Js

// 1. What is function declaration/defination/statement => It is just declaring a function with function keyword preceded by name of function and paranthesis and then body of function inside function scope {}

function square(num) {
  return num * num;
}

// 2. What is function expression => When we store a function inside a variable it is known as function expression and that function which is getting stored is known as anonymous function ( Function with no name ) and now the variable can be call as a normal function

const squareNo = function (num) {
  return num * num;
};

// 3. What are first class function => When function is treated as a variable is called first class function , By this a function can be passed as a argument to other function can be called in that function and can be returned from that function , So everything a variable can do a function can also do , Ex ::

function displaySquare(fn) {
  console.log("First Class Function " + fn(5));
}
displaySquare(squareNo); // passing function as a arguement like variable

// 4. What is IIFE => IIFE stands for Immediately Invoked Function Expression. It is a design pattern used in JavaScript where a function is defined and immediately executed or invoked. The function is wrapped inside a set of parentheses, which causes it to be evaluated as an expression rather than a declaration. This means that the function is created and executed immediately without being assigned to a variable or named. One of the main benefits of using an IIFE is that it creates a new scope for the function, which can help prevent naming conflicts with other scripts or with global scope. Ex,

(function (num) {
  console.log(num * num);
})(5);

// O/P question on IIFE

(function (x) {
  return (function (y) {
    console.log(x);
  })(10);
})(20);

// 5. Function scope - O/P based question

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    // console.log(i);
  }, i * 1000);
}

// The result of above is 0,1,2,3,4 . This is because of let variable as everytime the for loop run it will create a new block scope for the inside function and as let has block scope so for every scope different value of let i will be used

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    //   console.log(i);
  }, i * 1000);
}

// The result of above is 5,5,5,5 . This is because of var variable as everytime the for loop run it will create a new block scope for the inside function but since var has global scope so final updated value of var will be used in function

// 6. Function Hoisting => In variable only declaration are hoisted but in case of function the whole function body is hoisted rather than undefined , so we can call function before declaring them and it will not return undefined , Ex ::

functionName();

function functionName() {
  console.log(x);
  var x = 100;
  console.log("Function is hoisted");
}

// Here inside the function we have function scope and hoisting also work in function scope but in this case instead of storing variable in global or window object it will store it in local object

// O/P based question

var name = "aman";

var fun = function () {
  console.log(name);
  var name = "bisht";
};

fun();

// The above console will show undefined this is because when we reach this console.log the name variable of global scope is already present but in the function scope the name variable is hoisted with undefined value and now accessing the variable in any scope first look for that variable in its own scope then go for outer scope because every function have reference to its outer function and so .... , which is in this case name variable is already present in fun function

// 7. Sprea Vs Rest Operator (...) => The spread operator is used to expand an iterable (e.g., an array or object) into multiple elements. It can be used to copy an array or object into a new array or object , On the other hand The rest operator is used to represent an indefinite number of arguments as an array. It can be used to collect arguments into an array , EX::

function spreadAndRest(...args) {
  console.log(args[0] * args[1]);
}

var arr = [5, 6];
spreadAndRest(...arr);

// but in a function rest operator must be the last parameter, EX::

/*

   function hello(a, ...args, b,c){
      ...body
   }

   hello(1,2,3,4,5)

   // above will throw error so correct is ::

   function hello(a,b,c, ...args){
      ...body
   }

*/

// 7. Regular Function vs Arrow Function

// (A). arguments => It is an array-like object that contains all the arguments passed to a function. It is automatically available inside every function except the arrow function and can be used to access the arguments that were passed to the function , Ex::

function simpleFun() {
  console.log(arguments);
}

const simpleFunArrow = () => {
  // console.log(arguments)  show error as argument object is not available in arrow function
};

simpleFun();
simpleFunArrow();

// (B). This keyowrd => this keyword refers to the object that the function or method is a property of, or the object that is currently executing the function or method. In regular function this will refer to object calling the function but in case of arrow function this will always refer to global object i.e window object , EX::

let User = {
  username: "Aman Bisht",
  rc1: () => {
    console.log("This is ", this.username);
  },
  rc2: function () {
    console.log("This is ", this.username);
  },
};

User.rc1();
User.rc2();
