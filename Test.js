// 1.

function test2() {
  let a = "Hello";
  if (true) {
    var a = "hi";
    console.log(a);
  }
  console.log(a);
}


// 2. Map polyfills

Array.prototype.myMap = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    // here above this will refer to the array which is calling this .myMap() method
    temp.push(cb(this[i], i, this));
  }
  return temp;
};


// 3. o/p

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    // console.log(i);
  }, i * 1000);
}

for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    //   console.log(i);
  }, i * 1000);
}

function spreadAndRest(...args,name) {
  console.log(args[0] * args[1] + name);
}

spreadAndRest(1,2,3,"aman")


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


const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a);


let boi1 = { name: "aman" };
const member1 = [boi1];
boi1 = null;

console.log(member1);


const obj3 = { num: 10 };

const multiply = (x = { ...obj3 }) => {
  console.log((x.num *= 2));
};

multiply();
multiply();
multiply(obj3);
multiply(obj3);


function name(a,b,c){
  return [1,2,3,5,6]
}

console.log(name.length)


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



let obj = {
  name: "Rahul",
  age: 22,

  getDetails: function () {
    const nestedArrow = () => console.log(this.name);
    nestedArrow();
  },
};

obj.getDetails();



function makeUser() {
  return {
    name: "Super Man",
    ref: this,
  };
}

let user2 = makeUser();
console.log(user2.ref.name);




let user4 = {
  name: "Harsh Upadhyay",
  logMessage() {
    console.log(this.name);
    console.log(this);
  },
};

setTimeout(user4.logMessage, 1000);
