// Currying In Js

// 1. Currying => Currying is a technique that allows to transform a function that takes multiple arguments into a series of functions that each take a single argument. Here each function accept only one argument at a time and return a new function that expect another argument and this process continue until all arguments are processed and final result is returned. It is a conversion of function from callable as f(a,b) to f(a)(b).

// Currying function are constructed by chaining closures by immeditely returning the inner function. Ex::

function f(a, b) {
  console.log(a, b);
}

// conversion of above function to currying function
function curryingF(a) {
  return function (b) {
    console.log(a, b);
  };
}

curryingF(5)(6);

// 2. Why should we use currying => It makes a function pure which makes it expose to less errors and side effects. As internally it use closures so helps in avoiding the same variable use and process to be done again and again. It is a checking method that checks if you have all the things before you proceed.It divides one function into multiple functions so that each one handles one set of responsibility which makes it reusable.

// 3. Implement sum(n1)(n2)(n3) by currying

function curryingSum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(curryingSum(2)(5)(14));

/*

 3. Create currying method for following::
 evaluate("sum")(4)(2) => 6
 evaluate("multiple")(4)(2) => 8
 evaluate("divide")(4)(2) => 2
 evaluate("substract")(4)(2) => 2

*/

function curryingOperation(type) {
  return function (a) {
    return function (b) {
      if (type === "sum") return a + b;
      else if (type === "multiply") return a * b;
      else if (type === "divide") return a / b;
      else if (type === "substract") return a - b;
      else return "Invalid Operation";
    };
  };
}

console.log(curryingOperation("sum")(4)(6));
console.log(curryingOperation("multiply")(4)(6));
console.log(curryingOperation("divide")(4)(2));
console.log(curryingOperation("substract")(12)(6));
console.log(curryingOperation("bhag")(4)(6));

// 4. Infinte Currying -> sum(1)(2)(3)....(n) , Here when currying method takes infinite or indefinite no of argument and return final value based on those argument then it is called infinite currying

function inifniteSum(a) {
  return function (b) {
    if (b) return inifniteSum(a + b);
    else return a;
  };
}

console.log(inifniteSum(1)(2)(3)(4)(5)());

// 5. Currying vs Partial Application => Currying allows you to transform a function that takes multiple arguments into a series of functions that each take a single argument, Partial application, on the other hand, return a new function by fixing some of the arguments of an existing function. The resulting function takes fewer arguments than the original function and has some of its arguments already set , EX::

// Partial Application for sum method

function partialSum(a){
    // return a new function with different no of parameter
    return function(b,c){
        return a+b+c
    }
}

console.log(partialSum(1)(5,9))


// 6. Use of currying to maninpulate dom (real world use)

function updateText(id){
  return function(content){  
    document.querySelector(`#${id}`).textContent = content
  }
}

// here this function can bse used again and again to update header so dont't need to use queryselector again and again and improve code readibility
const updateH1 = updateText("heading")
updateH1("Hello i am updated to acey charausia")


// 7. Implement currying by making a function that will convert a normal func to curry func

function curry(func){
  return function curriedFunc(...args){
    if(args.length >= func.length){
      return func(...args)
    }
    else{
      return function(...next){
        return curriedFunc(...args,...next)
      }
    }
  }
}

const simpleSum = (a,b,c,d)=>a+b+c+d

const currySum = curry(simpleSum)
console.log(currySum(1)(2)(3)(4))

// NOTE:: .length property of a function returns the number of named parameters that the function expects to receive.