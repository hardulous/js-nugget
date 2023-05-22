// this in js

// 1. this => this keyword is a special keyword that refers to the context in which a function is called or an object is accessed. The value of this is determined at runtime and can vary depending on how a function is invoked.

// Scenario that affects the value of this keyword ::

// (A). Global scope => In the global scope (outside of any function), this refers to the global object. In a web browser, the global object is typically the window object. Ex :

this.a = 5; //  this.a  === window.a
console.log(this); // this === window

// (B). Function context => When a function is called without any explicit binding  ( i.e without object . notation ), this typically refers to the global object. However, in strict mode ("use strict"), the value of this is undefined. EX :

function param() {
  console.log(this.a);
  //  as no explicit binding so this.a === window.a , cuz param func is present in global scope
}

param();

// (C). Object method => this keyword behave different for regular and arrow function , In regular func a function is invoked as a method of an object, this refers to the object by which the method was called or to the context on which it is present but in case of arrow function do not have their own this binding. Instead, they inherit the value of this from the surrounding ( lexical or Parent ) function scope in which they are defined.  EX :

const obj = {
  name: "John",
  sayHello: function () {
    console.log(this); //  this === obj
    console.log("Hello, " + this.name); // this.name === obj.name
  },
  childObj: {
    name: "bisht",
    sayHello: function () {
      console.log(this); //  this === obj.childObj
      console.log("Hello, " + this.name); //   this.name === obj.childObj.name
    },
  },
};

obj.sayHello();
obj.childObj.sayHello();

const obj2 = {
  name: "Rakesh",
  sayHello: () => {
    console.log(this); //  this === window
  },
  parentFunc: function () {
    const arwFunc = () => {
      console.log(this); //  this === obj2
      console.log(this.name); //  this.name === obj.name ,  as arrow function inherit this value from its parent function which is parentFunc whose this context is obj2
    };
    arwFunc();
  },
};

obj2.sayHello();
obj2.parentFunc();

function anotherFunction() {
  let boi = {
    name: "Mayank Tanwar",
    age: 23,
    getDetails: () => {
      console.log(this);
      //   here  this === window , cuz this in arrow function will refer to outer function context if present which is anoterFunction() which in turn have context as global because it is executed in global context.
    },
  };

  boi.getDetails();
}

anotherFunction();

// 2. O/P question

function makeUser() {
  return {
    name: "Super Man",
    ref: this,
  };
}

let user1 = makeUser();
console.log(user1.ref);
console.log(user1.ref.name); //  this === window , cuz makeUser() func is called in global scope

// but to make above this === returned objed ::

function makeUser2() {
  return {
    name: "Super Man",
    ref() {
      return this;
    },
  };
}

let user2 = makeUser2();
console.log(user2.ref());
console.log(user2.ref().name); // here now  this === returned object because now ref() is called by object so this inside ref() will refer to object itself

const user3 = {
  name: "Jordan Nike",
  logMessage() {
    console.log(this.name);
  },
};

setTimeout(user3.logMessage, 1000);

// Here in above it print undefined cuz , setTimeout treats the logMessage function as a callback or standalone function call rather than a method call by user3 obj. As a result, the value of this inside logMessage is not bound to user3 obj, leading to unexpected behavior. To solve it ::

setTimeout(() => {
  user3.logMessage(); // now actual method
}, 1000);

// 3. Create a object calculator which contain read() to read 2 value from user , sum() to return sum of those 2 value and mul() to return product of those 2 value

let calculator = {
  read() {
    this.n1 = Number(prompt("Enter First No", 0));
    this.n2 = Number(prompt("Enter Second No", 0));
  },

  sum() {
    return this.n1 + this.n2;
  },

  mul() {
    return this.n1 * this.n2;
  },
};

// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

// 4. O/P question

var length = 4;

function cb() {
  console.log(this);
  console.log(this.length);
}

const obj1 = {
  length: 5,

  method(fn) {
    fn();
  },

  method2() {
    arguments[0]();
  },
};

obj1.method(cb);

// Here in above , cb is passed as callback func to obj1.method() and this cb() will be treated as standalone function so this value in cb() will be global object

obj1.method2(cb, 1, 2, 3, 4, 5, 6);

// Here in above , again cb is passed as callback function to obj1.method2() with some additional argument as well but inside method2() we are executing it with the help of "argument array" which is an array or object itself is like [cb,1,2,3,4,5,6] , And when we call cb() by this array so this inside cb now refer to argument array which contain .length property as no of argument passed to method2()

// 5. Implement Calc which is an object which consist of add() , multiply() , substract() method and total property to get current value and chaning with all method can be done

let calc = {
  total: 0,
  add(no) {
    this.total += no;
    return this;
  },
  substract(no) {
    this.total -= no;
    return this;
  },
  multiply(no) {
    this.total *= no;
    return this;
  },
};

const result = calc.add(10).multiply(5).substract(30).add(10);

console.log(result.total);
