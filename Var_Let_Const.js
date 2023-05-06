// 1. var vs let vs const

// (A). SCOPE => Scope is a certain region of a program where a defined variable exists and can be recongnized and beyond that it can not be recognized , That region is everything in between the closed curly braces {} , Ex of scope are Global Scope , Block Scope , Functional Scope ...

// Var has global scope means once defined it can be used anywhere in the program , But let and const has block scope means it can be used only in the region where they are defined that is in nearest {} only
{
  var a = 10;
}
// console.log(a)

{
  let b = 15;
  const c = 20;
}
// console.log(b,c)

// (B). Variable Shadowing => variable shadowing occurs when a variable declared within a function or scope has the same name as a variable declared in a higher scope, such as a global or outer function scope. When this happens, the inner variable "shadows" the outer variable, meaning that references to the variable within the function will refer to the inner variable instead of the outer one. EX,

function test1() {
  var a = "Hello";
  if (true) {
    let a = "hi";
    console.log(a); // this a shadowed the outer scope a
  }
  console.log(a);
}

// test1()

// But note while shadowing the variable it should not cross the boundary of a scope it means we can shadow var by let but can not shadow let by var because var have global scope Ex,

function test2() {
  let a = "Hello";
  if (true) {
    // var a = "hi" // it will show error a is already defined
    console.log(a); // this a shadowed the outer scope a
  }
  console.log(a);
}

// test2()

// (C). Declaration => Var variable can be declared in a scope with same name as many time we want but with let and const it will show error

var a = "aman";
var a = "bisht";
// console.log(a)  no error

let b = "aman";
// let b = "bisht"
// console.log(b)  re declaration error

// (D). Declaration And Intilization => All Variable Except const can be declared without intilization e but with const when declaring we need to initlize it some value Ex,
{
  var a;
  let b;
  // const c  show error need to initlize it as well
}

// Also all variable except const can be redeclared ex,,
{
  var a = 10;
  a = 14;
  let b = 10;
  b = 15;
  const c = 22;
  // c=32   show error , asignment to constant variable.
}

// (E). Hoisting => , hoisting is a behavior where variable and function declarations are moved to the top of their respective scopes, before the code is actually executed. This means that you can use a variable or function before it is declared, without encountering an error. However, it's important to note that only the declarations are hoisted, not the actual assignment

/*

Here when js code is executed 2 phase happen 1st is creation phase and 2nd is execution phase.

In creation phase 3 things happend 1st it create a global or window object , 2nd it create a heap memory to store all variable and function references in window object and 3rd it intilize all variables and function reference with undefined and hoisting take place in creation phase, Also first hoisting will initlize the global scope then it will initlize the local scope means hoisting take place first in global then in local or function scope

In execution phase the js engine execute the code line by line , initlizing all the varible with value and calling the function EX,
*/

{
  // console.log(count)
  var count = 1;
}

// But this hoisting behaviour is different for let and const Ex,
{
  // console.log(x,y) show error access before initialization
  let x;
  const y = 10;
}

// Here as accessing let or const by hoisting showing error it does not means they are not hoisted they do hoisted but in TEMPORAL DEAD ZONE. The TDZ is the time between the start of the current scope of variable and the point at which the variable is declared. During the TDZ, any attempt to access the variable will result in a ReferenceError. , EX::

function test3() {
  // console.log(p);
//   console.log(q);   show error
//   console.log(r);

  var p = 10;
  let q = 20;
  const r = 30;
}

test3();

// In summary, let and const variable are also hoisted, but they are not initialized to undefined like var. Instead, they are put into a TDZ until they are explicitly declared in the code.

// The TDZ is an important feature of let and const declarations because it helps to prevent bugs caused by accessing variables before they are initialized. It also encourages better coding practices by forcing developers to declare their variables before using them.

