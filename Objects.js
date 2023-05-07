// Objects in js

// 1. Objects => An object is a collection of properties, which are key-value pairs, where the key is a string (or a symbol in ES6) and the value can be any JavaScript data type, including other objects. Ex::

let person = {
  name: "John", // key : value
  age: 30,
  email: "john@example.com",
};

console.log(person);

// The properties of an object can be accessed using dot notation or bracket notation :
console.log(person.name);
console.log(person["age"]);

// to delete a property from object we use "delete keyword"

delete person.email;
console.log(person);

// 2. O/P question

const func = (function (a) {
  delete a; // will do nothing as a is a local variable not an object
  return a;
})(5);

console.log(func);

// delete keyword can only be used to delete properties of an object in JavaScript. It cannot be used to delete variables, functions, or any other non-object entity.

// 3. To add or access property with space between them like , "try to get me" property we add by putting it in "" and to access we use bracket notation

const boy = {
  name: "aman bisht",
  age: 23,
  "try to get me": true,
};

console.log(boy);
console.log(boy["try to get me"]);

// 4. To add dynamic property in object we wrap it in square brack like ["property-name"] : value

const firstName = "name of user";
const value = "Aman Bisht";

const dynamicUser = {
  [firstName]: value,
};

console.log(dynamicUser);

// 5. O/P question

const obj = {
  a: "one", // this a will be overriden by below a
  b: "two",
  a: "three",
};

console.log(obj);

// if you try to add a property to an object with a key that already exists, the new value will overwrite the old value associated with that key. This is because object keys must be unique, and any new value assigned to an existing key will replace the old value

// 6. Create a function multiplyByTwo(obj) that multiplies all numeric property values of num by 2

let nums = {
  a: 200,
  b: 300,
  title: "My nums",
};

function multiplyByTwo(obj) {
  for (key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
  return obj;
}

console.log(multiplyByTwo(nums));

// 7. O/P question

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a);

/*

Here in objects the property must be of either string or symbol , But if we try to add property other than type string for in above example we are adding property b of type object which is not string so it will convert this property to [object Object] property i.e::

a = {
  "[object object"]:123
}

now again we are adding another property c of type object which will again be converted to [object object] property but now this will override the previous [object object] property with value 456

*/

// 8. O/P question

console.log([..."Aman"]);

// Here the spread operator "spreads" the characters of the string into individual elements of a new array.

// 9. O/P question

const setting = {
  username: "Aman",
  level: 20,
  health: 90,
};

console.log(JSON.stringify(setting, ["level", "health"]));

// here in 2nd argument , Array contain the property to be stringify and to include in final stringified object i.e only level and health property will be stringify but username property will be ignoreds

// NOTE:: if we perform any arithmetic operation with undefined it will result in Nan

console.log(45 * undefined);

// 10. Destructuring => It is a way to access either element of array and property of object directly by assigning them to variables , EX ::

let user = {
  name: "aman bisht",
  age: 21,
  address: {
    street: "laxmi bai nagar",
    no: 1899,
  },
};

// getting name property directly in variable
const { name } = user;
console.log(name);

// getting name property with renamed
const { name: fullName } = user;
console.log(fullName);

// getting nested object by destructuring and further desctructure that object
const {
  address: { street, no },
} = user;
console.log(street, no);

// 11. O/P question

function getItems(fruitList, favFruit, ...args) {
  return [...fruitList, ...args, favFruit];
}

console.log(getItems(["banana", "apple"], "pear", "orange"));

// 12. O/P question

let obj1 = { greeting: "Hey!" };
let obj2;

obj2 = obj1;
obj1.greeting = "Hello";
console.log(obj2.greeting);

// Here in above code variable obj1 is holding the reference of object and by doing obj2=obj1 now obj2 is also holding the reference of that same object , So changes to that object either by obj1 or obj2 will result in change of original object

// 13. O/P question

console.log({ a: 1 } == { a: 1 });
console.log({ a: 1 } === { a: 1 });

// here the above 2 is false because when comes to comparison of reference value the memory addess will be compared instead of value and as both object occupy different memory so false

console.log(obj1 == obj2);
console.log(obj1 === obj2);

// the above 2 is true because both obj1 and obj2 is refering to same object or memory address

// 14. O/P question

let boi1 = { name: "aman" };
const member1 = [boi1];
boi1 = null;

console.log(member1);

// Here in above code first we create a object and variable boi is holding reference of that object and then in member array we are storing that object reference at 0th index , Then we change variable boi from referencing that object to null , But here that object refernce is still present in member array so doing boi = null will not affect member array

let boi2 = { name: "aman" };
const member2 = [boi2];
boi2.name = "harsh";

console.log(member2);

// Here in above both variable boi2 and memeber2 array 0th index is holdind the same reference so changes to object by boi2 will result in changes to original object

// 15. O/P question

const obj3 = { num: 10 };

const multiply = (x = { ...obj3 }) => {
  console.log((x.num *= 2));
};

multiply();
multiply();
multiply(obj3);
multiply(obj3);

// 16. O/P question

function changeAgeAndReference(person) {
  person.age = 25;

  person = {
    name: "john",
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1);
console.log(personObj2);


// 17. Shallow Copy vs Deep Copy => 