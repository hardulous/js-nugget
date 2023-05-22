// this Keyword

// 1. this => this keyword is a special keyword that refers to the context in which a function is called or an object or function is accessed. It is a reference that refer to an object. The value of this is determined at runtime and can vary depending on how or in which context function is invoked.

// Here are the common scenarios that affect the value of this:

// A. Global scope: In the global scope (outside of any function), this refers to the global object. In a web browser, the global object is typically the window object. Ex

this.a = 5;
console.log(this); // this === window
console.log(this.a); // this.a === window.a
console.log(this.a === window.a);

// B. Function context: When a function is called without any explicit context, this typically refers to the global object. However, in strict mode ("use strict"), the value of this is undefined in such cases , And when called with explicit context then this will refer to its immediate parent context and obj by which the function is called . Ex

this.b = 15;
function getParam() {
  console.log(this.b);
  // this === window , because function is called in global context
}

getParam();

// C. Object method: When a function is invoked as a method of an object, this refers to the object by which the method was called and if nested function then this will refer to immediate parent scope context. It allows the method to access the object's properties and other methods. Ex

const user = {
  name: "Aman Bisht",
  sayHello: function () {
    console.log("Hello, " + this.name);
    // this === user , because the function is called by user object and it is present in user context
  },
};

user.sayHello();

const person = {
  name: "Aman Bisht",
  childObj: {
    newName: "Bisht Aman",

    sayHello: function () {
      console.log(this.newName, " and ", this.name);
      // this === user.childObj , because the function is called by childObj it is present in childObj context
    },
  },
};

person.childObj.sayHello();

// D. In the case of arrow functions (() => {}), the behavior of this is different compared to regular functions. Arrow functions do not have their own this binding. Instead, they inherit the value of this from the surrounding (lexical or parent) or scope of outer function. Ex

let boi = {
  name: "Mayank Tanwar",
  age: 23,

  getDetails: () => {
    console.log(this);
    // this === window , because arrow function get this value from parent scope of context in which boi.getDetails() is called.
  },
};

boi.getDetails();

let obj = {
  name: "Rahul",
  age: 22,

  getDetails: function () {
    const nestedArrow = () => console.log(this.name);
    // this === obj , because this value inside arrow function determined from its parent scope which is getDetails and getDetails get value of this from obj so
    nestedArrow();
  },
};

obj.getDetails();

function func() {
  let boi = {
    name: "Mayank Tanwar",
    age: 23,

    getDetails: () => {
      console.log(this);
      // this === window , because first this inside arrow will get this value from parent scope or in which context boi.getDetails() is called which is in func scope which in turn again look for in which context func() is called which is global context
    },
  };

  boi.getDetails();
}

func();

// 2. O/P question

// A
function makeUser() {
  return {
    name: "Super Man",
    ref: this,
  };
}

let user2 = makeUser();
console.log(user2.ref.name);
console.log(user2);

// Here in above makeUser() is called in the global scope, the value of this inside the function will be the global object. Since the global object does not have a name property, accessing user2.ref.name results in undefined. The ref property will hold a reference to the global object. To fix this and make this refer to obj ::

function makeUser2() {
  return {
    name: "Batman Man",
    ref() {
      return this;
    },
  };
}

let user3 = makeUser2();
console.log(user3.ref().name);

// B

let user4 = {
  name: "Harsh Upadhyay",
  logMessage() {
    console.log(this.name);
    console.log(this);
  },
};

setTimeout(user4.logMessage, 1000);
