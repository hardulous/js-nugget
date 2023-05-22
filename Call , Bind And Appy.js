// call , bind and apply in js

// 1. Binding in js => binding refers to the process of associating a function with a specific context or object. It determines how this keyword is resolved within the function's execution. There are 2 type of binding implicit and explicit binding

// (A). Implicit binding => Implicit binding occurs when a function is invoked with a context object i.e by . (dot) operator , and this keyword is automatically set to that object. EX :

const person = {
  name: "John",
  sayHello: function () {
    console.log(`Hello, ${this.name}!`);
  },
};

person.sayHello();
// here sayHello() is called by person obj so this inside function is implicitly binded to persob obj

// (B). Explicit binding allows you to set this keyword independent of how the function is called , It can be used to tie a function to an object and call that function as it belongs to that object so this keyword will now explicitly refer to that object .

// EX , call() , apply() and bind()  , Every function in js can use these methods

// call() => The call() method is a function method that allows you to invoke a function with a specified this value and some arguments. It accepts an object as its first parameter, which sets the this value within the function and any no of argument , EX:

let obj = {
  name: "Aman Bisht",
};

function greet(age) {
  return "Hello " + this.name + " Is " + age;
}

console.log(greet.call(obj, 22));
// here calling greet() with this value as obj and argument 22 as age

// apply() => The apply() method is similar to call() which is also used to set this value for a function explicitly, but instead of passing argument seprately it accepts an array as the second argument, which contains the function arguments. EX:

let obj2 = {
  name: "Rahul Bihari",
};

function hello(age, profession) {
  return (
    "Hello " + this.name + " Is " + age + " And Profession Is " + profession
  );
}

console.log(hello.apply(obj2, [22, "Software Engineer"]));
// Here calling hello() with this value as obj2 and passong age and profession as argument

// bind() => The bind() method returns a new function with a specified this value and any initial arguments, without invoking it immediately. It allows you to create a reusable function with a predetermined this value that can be invoked later. EX :

let obj3 = {
  name: "Harsh Upadhyay",
};

function hi(age, profession) {
  return (
    "Hello " + this.name + " Is " + age + " And Profession Is " + profession
  );
}

const bindHi = hi.bind(obj3, 23);
// bindHi is a new function with this value set as obj3 and age parameter set as 23

console.log(bindHi);
console.log(bindHi("Developer"));

// 2. O/P question

var status = "Very Happy";

setTimeout(() => {
  let status = "Very Sad";

  let data = {
    status: "Content",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
  // here this === window because setTimeout is executed in global context
}, 0);

// 3. Call printAnimals such that it print all the animals details

const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + " : " + this.name);
  };
  this.print();
}

// So we need to set this value in printAnimals function resolve to object in arrya So ::

animals.forEach((animal, i) => {
  printAnimals.call(animal, i);
});

// 4. Append an array to another array without modifying or creating new array and without for loop

const ele1 = ["a", "b"];
const ele2 = [0, 1, 2];

ele1.push.apply(ele1, ele2);
console.log(ele1);

// Here in above The apply() method is used to invoke the push() method of the ele1 array, and it sets the this value of push() to ele1 and calling push method like this : ele1.push(...ele2) but using the apply() method instead of the spread operator (...) to achieve the same effect.

// 5. Enhance built in max() and min() method of Math object so that they work on array as Math.max([1,2,3]) will return Nan , have to use like this Math.max(1,2,3)

const numbers = [1, 3, 6, 8, 1, 100, 203];

console.log(Math.max.apply(null, numbers));
console.log(Math.min.apply(null, numbers));

// here above calling Math.max and Math.min with context of null object and passing argument numbers array which is similar to this : Math.max(...numbers) and Math.min(...numbers)

// 6. O/P question

function f() {
  console.log(this);
}

let user = {
  g: f.bind(null),
};

user.g();

// Here in above f.bind(null) return a new function with context of null so even calling g() by user obj still this in f() is null but in non-strict-mode instead of null it will point to window object and in strict-mode it will be undefined

function func() {
  console.log(this.name);
}

func = func.bind({ name: "Mayank" }).bind({ name: "Aman" });

func();

// Here in above we are doing bind chaining but one feature of bind() is that once a function context is set by bind() it will always refer to that context or can not be rebound so doing second bind() will not change the previous context do return a new function again

function checkPassword(success, failed) {
  let password = prompt("Password is", 0);
  if (password) success();
  else failed();
}

let user1 = {
  name: "Aman Bisht Hero",

  loginSucess() {
    console.log(`${this.name} Login Success`);
  },

  loginFailed() {
    console.log(`${this.name} Login Failed`);
  },
};

checkPassword(user1.loginSucess, user1.loginFailed);

// Here passing user1 methods as a callback function to checkPassword will make them lose its context because now instead of user1 obj they are executed by checkPasswor func whose context is global scope so this inside both loginSucess() and loginFaild() will be window object

// To Solve This ::

// checkPassword(user1.loginSucess.bind(user1), user1.loginFailed.bind(user1));

// 7. Explicit Binding In Arrow Function => arrow functions have a lexical this binding, which means that the value of this inside an arrow function is determined by its outer / parent function scope. As a result, arrow functions do not have their own this value, and they cannot be explicitly bound or dynamically set using bind(), call(), or apply() like regular functions . EX :

const age = 10;

let person1 = {
  name: "Rahul Vaidya",
  age: 20,
  getAgeArrow: () => console.log(this.age),
  getAge: function () {
    console.log(this.age);
  },
};

let person2 = { age: 22 };

person1.getAge.call(person2);
person1.getAgeArrow.call(person2);
// In case of arrow function call , bind and apply will not work so this inside arrow still resolve to this of parent function or outer scope

// 8. Polyfill for call , apply and bind

let man = {
  name: "Bear Grills",
  color: "white",
  nation: "UK",
};

function getDetails(currency, rank) {
  console.log(
    `Hi my name is ${this.name} and live in ${this.nation} and i am ${this.color}. Here currency is ${currency} and we are #${rank} in the word`
  );
}

// Call
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " It's not callable");
  }

  let newContext = { ...context };
  newContext.fn = this;
  newContext.fn(...args);
};

getDetails.myCall(man, "Pound", 6);

// Here inside myCall polyfill "this" resolve to the function or object which is calling myCall() , it means that in myCall()  this === getDetails  , And we are creating newContext obj by spread of original object so that on adding fn will not modify the original object

// Apply
Function.prototype.myApply = function (context = {}, argsArr = []) {
  if (typeof this !== "function") {
    throw new Error(this + " It's not callable");
  } else if (!Array.isArray(argsArr)) {
    throw new TypeError("Calling apply method with non array like argument");
  }

  let newContext = { ...context };
  newContext.fn = this;
  newContext.fn(...argsArr);
};

getDetails.myApply(man, ["Pound", 6]);

// Everything is same as call polyfill but instead of getting seprate args we will get single argsArr which just need to be spread in fn like this : fn(...argsArr) , But also need to check another edge case which is if we don't pass array as 2nd parameter

// Bind
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " Can not be bound as it is not callable");
  }

  let newContext = { ...context };
  newContext.fn = this;

  return function (...restArgs) {
    return newContext.fn(...args, ...restArgs);
  };
};

const bindFn = getDetails.myBind(man, "pound");

console.log(bindFn)
bindFn(6)


// Here in bind we need to return the new function  which have this context set to it explicitly and that function can accept either all argument or partial argument , So when we call newContext.fn() we need to first pass ...args argument and then ...restArgs argument because bind method also pre-set some argument for function 