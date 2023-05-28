// Promise in js

// In JavaScript, synchronous and asynchronous are two different approaches for handling code execution and managing tasks

// ##### 1. Synchronous Vs Asynchronous => In synchronous execution, tasks are executed one after another in a blocking manner. When a synchronous task is getting executed, the program waits for it to complete before moving on to the next task. This means that if a task takes a long time to complete, it will block the execution of subsequent tasks, causing the program to appear unresponsive . EX :

/*

console.log(1)
console.log(2)
console.log(3)


*/

// In asynchronous execution, tasks are initiated and then allowed to run in the background while the program continues its execution. The program doesn't wait for the completion of an asynchronous task before moving on to the next task. Asynchronous tasks typically use callbacks, promises, or async/await . EX :

/*

console.log(4)

setTimeout(() => {
    console.log(5)
}, 1000);

console.log(6)

*/

// ##### 2. Callback => It is a function that is passed as an argument to another function and is invoked or called at a later point in time. The purpose of using callbacks is to specify what should happen after a certain operation or task is completed , Mostly use in asynchronous task . EX :

/*

function fetchData(cb) {
  setTimeout(function () {
    const data = "Some data";
    cb(data); 
  }, 1000);
}

function processData(data) {
  console.log("Processing data:", data);
}

fetchData(processData);

*/

// But at the moment we are executing only one callback processData() when setTimout async task is finished but let say if we have multiple async task to perform where one is dependent on other then doing by callback will lead to "callback hell", also known as the "pyramid of doom," is a situation that arises in JavaScript when multiple nested callbacks are used, leading to code that becomes difficult to read, understand, and maintain. It occurs when asynchronous operations are nested within each other, resulting in deeply nested callbacks. EX :

/*

console.log("Start");

function importantAction(username, cb) {
  setTimeout(() => {
    cb(`Subscribe to ${username}`);
  }, 400);
}

function likeTheVideo(video, cb) {
  setTimeout(() => {
    cb(`Like the ${video} video`);
  }, 400);
}

importantAction("Aman Bisht", function (message) {

  console.log(message);
  
  // nested callback function
  likeTheVideo("Spiderman 3", function (action) {
    console.log(action);
  });

});

console.log("End")


*/

// To solve callback hell problem we use Promises

// ##### 3. Promises => A promise is an object that represents the completion or failure of an asynchronous operation and its resulting value. It is commonly used for handling asynchronous operations such as fetching data from a server, making API calls, or executing time-consuming tasks . Promises provide a way to write asynchronous code that is more readable and easier to manage than traditional callback-based approaches. A promise can be in one of three states:

/*

1. Pending: The initial state when the asynchronous operation is still in progress and the final value is not yet available.

2. Fulfilled: The state when the asynchronous operation has completed successfully, and the promised value is available. Once fulfilled, a promise cannot transition to any other state, and the value it holds is immutable.

3. Rejected: The state when the asynchronous operation has failed or encountered an error. Like the fulfilled state, a rejected promise cannot transition to any other state.

*/

// Promises provide two essential methods for interacting with their final values:

/*

1 .then(): This method is used to handle the fulfilled state of a promise. It takes two optional callbacks as arguments: one for handling the fulfilled value and another for handling any errors that occur during the operation.

2 .catch(): This method is used to handle the rejected state of a promise. It takes a callback function that handles the error occurred during the operation.

 EX ::

*/

/*


console.log("Start")

const sub = new Promise((resolve , reject)=>{
     setTimeout(()=>{
      const result = false;
      if(result) resolve("Task done")
      else reject(new Error("Task is failed"))
     },2000)
})

console.log(sub)   // it will show pending cuz if we try to access promise state before task is completed ( after 2 sec ) so its initial state will be pending but after 2 sec it will be either fulfilled or rejected . In order to get final state we use .then() or .catch()

sub
.then((res)=>console.log(res))   // fulfiled state come in .then()
.catch((err)=>console.log(err))  // rejected state come in .catch()

console.log("End")


*/

// But let say if we want to resolve or reject the promise directly without doing some async task , we use Promise.resolve() or Promise.reject()

//  Promise.resolve('Resolved value') creates and returns a new promise that is immediately resolved with the value 'Resolved value'
//  Promise.reject('Rejected promise') creates and returns a new promise that is immediately rejected with the reason 'Rejected promise'

/*

console.log("Start")

const res = Promise.resolve("Task is done")
const rej = Promise.reject("Task is not done")

console.log(res)
console.log(rej)

res.then((r)=>console.log(r))
res.catch((e)=>console.log(e))

console.log("End")

*/

// Here as you can see even if we are immediately resolving or rejecting the promise still the .then or .catch console.log is comming in end because .resolve() or .reject() is still async task

// Now re-create the above callback scenario with promises ::

// console.log("Start");

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 400);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} video`);
    }, 400);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video} video`);
    }, 400);
  });
}

/*

importantAction("Watch video").then((res) => {
  console.log(res);
  likeTheVideo("I have liked the video").then((res) => {
    console.log(res);
    shareTheVideo("I have shared the video").then((res) => {
      console.log(res);
    });
  });
});

*/

// Here in above it is bit cleaner then passing callback but now we have nested .then() method which again look like pyramid so to solve this and further improve code readability we use promises chanining which is chaining multiple asynchronous operations together where one is dependant on other using the .then()

/* 

importantAction("Watch video")
  .then((res) => {
    console.log(res);
    return likeTheVideo("I have liked the video");
  })
  .then((res) => {
    console.log(res);
    return shareTheVideo("I have shared the video");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

*/

// In promise chaining, each .then() call returns a new promise, which allows you to attach another .then() or .catch() handler to it. This enables you to handle the results or errors of the previous asynchronous operation and perform subsequent operations based on those results.

// But now again there is multiple .then() and let say we have around 10 async operation one after other then adding .then() by chaining will again make code less readable so for this we use " Promise Combinator "

// console.log("End");

// ##### 4. Promise Combinator => These are functions that help us to operate or execute more than one promise at a time and return result of all the promises at once , There are 4 types of promise combinator : Promise.all() , Promise.race() , Promise.allSettled() and  Promise.any()

// A. Promise.all() => it takes an array of promises and returns a new promise. The returned promise fulfills when all the input promises fulfill, and the fulfilled value is an array of the resolved values from the input promises. If any of the input promises reject, the returned promise rejects with the reason of the first rejected promise. EX ::

/*

let all = Promise.all([
  Promise.resolve("All Resolve 1"),
  Promise.resolve("All Resolve 2"),
  Promise.resolve("All Resolve 3"),
]);

all.then((res) => console.log(res));

all = Promise.all([
  Promise.resolve("All Resolve 1"),
  Promise.reject("All Reject 2"),
  Promise.resolve("All Resolve 3"),
]);

all.catch((err) => console.log(err));

*/

// B. Promise.race() => it takes an array of promises and returns a new promise. The returned promise settles (fulfills or rejects) as soon as any of the input promises settles. The settlement value of the returned promise is the same as the settlement value of the first settled promise (either fulfilled or rejected). EX ::

/*

let race = Promise.race([
  Promise.resolve("race Resolve 1"),
  Promise.reject("race Reject 2"),
  Promise.resolve("race Resolve 3"),
]);

race.then((res) => console.log(res));

race = Promise.race([
  Promise.reject("race Reject 1"),
  Promise.resolve("race Resolve 2"),
  Promise.resolve("race Resolve 3"),
]);

race.catch((err) => console.log(err));

*/

// C. Promise.allSettled() => it takes an array of promises and returns a new promise. The returned promise is fulfilled with an array of objects that describe the outcome of each input promise, it always return the fulfilled promise when input promises are mixture of fulfilled or rejected but if all input promises are rejected than Promise.allSettled() return rejected promise with value as the first rejected input promise , unlike Promise.all() which return rejected promise if any of input promises failed. EX ::

/*

let allSettled = Promise.allSettled([
  Promise.resolve("allSettled Resolve 1"),
  Promise.resolve("allSettled Resolve 2"),
  Promise.resolve("allSettled Resolve 3"),
]);

allSettled.then((res) => console.log(res));

allSettled = Promise.allSettled([
  Promise.resolve("allSettled Resolve 1"),
  Promise.reject("allSettled Reject 2"),
  Promise.resolve("allSettled Resolve 3"),
]);

allSettled.then((res) => console.log(res));

allSettled = Promise.race([
  Promise.reject("allSettled Reject 1"),
  Promise.reject("allSettled Reject 2"),
  Promise.reject("allSettled Reject 3"),
]);

allSettled.catch((err) => console.log(err));

*/

// D. Promise.any() => it takes an array of promises and returns a new promise. The returned promise is fulfilled as soon as any of the input promises is fulfilled , and if it encounter any rejected promise then it ignores it untill it find a fulfilled promise but if all input promises are rejected, the returned promise is rejected with an AggregateError that contains an array of rejection reasons. EX ::

/*

let any = Promise.any([
  Promise.reject("any Reject 1"),
  Promise.reject("any Reject 2"),
  Promise.resolve("any Resolve 3"),
]);

any.then((res) => console.log(res));

any = Promise.any([
  Promise.reject("any Reject 1"),
  Promise.reject("any Reject 2"),
  Promise.reject("any Reject 3"),
]);

any.catch((err) => console.log(err));

*/

// ##### 5. async / await => It is a modern approach for handling asynchronous operations when working with promises , allow us to get final settled value without using .then() or .catch() . The async keyword is used to define an asynchronous function. When a function is declared as async, it automatically returns a Promise , and the value returned from this async function will be fulfilled value and error throwed wil be rejected value . Inside an async function, you can use the await keyword to pause the execution of the function until a Promise is resolved or rejected and final value is avaialble. EX ::

const reject = () => {
  return new Promise((_, reject) => reject("Rejected Promise"));
};

const result = async () => {
  try {
    const msg1 = await importantAction("Aman Bisht"); // to get resolved value we use await instead of .then()
    console.log(msg1);

    const msg2 = await likeTheVideo("Spider man");
    console.log(msg2);

    const msg3 = await shareTheVideo("Batman");
    console.log(msg3);

    const msg4 = await reject();
    console.log(msg4);

    return "Fulfilled"; // this will be considered as fulfilled value
  } catch (error) {
    console.log(error); // to get rejected value we use async-await with try catch block and if any promise is rejected then our catch block with rejected reason as error will be executed

    throw "Rejected"; // this will be considered as rejected value
  }
};

/*

const res = result(); // as result() is asyn function so it will return promise
console.log(res);

result()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

*/

// ##### 6. O/P  question

/*

console.log("start");

const promise1 = new Promise((resolve,reject)=>{
    console.log(1);
    resolve(2)
})

promise1.then((res)=>{
    console.log(res)
})

console.log("end");


*/

// Here what will happen above is first "start" will be printed then we are creating a promise and whenever we create a promise its inside callback function will be immediately invoked and will execute sycronous code first before asyncronous as console.log(1) is syncronous so it will print 1 and then resolve promise with value of 2 which we can access with .then() which is a asyncronous code so before executing it "end" will be printed first and then .then() block

/*

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
});

promise1.then((res) => {
  console.log(res);
});

console.log("end");

*/

// Here everything is same as above example except now inside Promise callback function we have 2 syncronous code console.log(1) or console.log(3) which will be executed before resolve(2) because js execute sync code first and then async code

/*

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(3);
});

promise1.then((res) => {
  console.log(res);
});

console.log("end");

*/

// Here in above we are creating a promise without resolving it so the .then() block will not be executed so there is no asyn code and inside promise function everything is syncronous so sycronous execution of code will take place

/*

console.log("start");

const fn = () => {
  return new Promise((res, rej) => {
    console.log(1);
    res("Success");
  });
};

console.log("middle");

fn().then((res) => console.log(res));

console.log("end");

*/

/*

function job() {
  return new Promise((resolve, reject) => reject());
}

let promise = job();

promise
  .then(() => console.log("Success 1"))
  .then(() => console.log("Success 2"))
  .catch(() => console.log("Error 1"))
  .then(() => console.log("Success 4"));

*/

// Here in above as we are rejecting the problem created by job() so first 2 .then() will not be executed and flow come to .catch() block and Note that the catch block acts as an error handler for the rejection, allowing the subsequent then block to execute as if the error was handled. it means after .catch() if there is an .then() block it will be executed as well and it will have some parameter passed to it by its above .catch() block which is by default undefined

/*

function job(state) {
  return new Promise((resolve, reject) => {
    if (state) {
      resolve("success");
    } else {
      reject("Error");
    }
  });
}

let promise = job(true);

promise
  .then((res) => {
    console.log(res);
    return job(true);
  })
  .then((res) => {
    if (res !== "victory") {
      throw "Defeat";
    }
    return job(true);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
    return job(false);
  })
  .then((res) => {
    console.log(res);
    return job(true);
  })
  .catch((err) => {
    console.log(err);
    return "Error Caught";
  })
  .then((res) => {
    console.log(res);
    return new Error("Test");
  })
  .then((res) => {
    console.log("Sucess: ", res.message);
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

*/

// Here in above every time we are returing any value or let say error from either .then() or .catch() block by "return" keyword we are returning a new resolved promise which will again go to next .then() block but if we throws an error by "throw" keyword then we are returning a rejected promise which will go to next .catch() block

// 7.  Create a promise chain in which , first create a first promise which will resolve to text first and then create a second promise which will resolve our first promise

const firstPromise = new Promise((resolve, reject) => {
  resolve("First Promise");
});

const secondPromise = new Promise((resolve, reject) => {
  resolve(firstPromise);
});

// secondPromise.then((res) => res).then((res) => console.log(res));

// 8. Implement a promRecurse function that will take array of promises and re-solve them recursively

function P1(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Resolve Promise 1 ${username}`);
    }, 400);
  });
}

function P2(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Resolve Promise 2 ${video}`);
    }, 400);
  });
}

function P3(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Resolve Promise 3 ${video}`);
    }, 400);
  });
}

function promiseRecurse(funcPromises) {
  if (funcPromises.length === 0) return;

  const currPromise = funcPromises.shift();

  currPromise.then((res) => console.log(res)).catch((err) => console.log(err));

  promiseRecurse(funcPromises);
}

// promiseRecurse([P1("Hello Aman"), P2("Thank you"), P3("Again Thank You")]);

// 9. Promise Polyfill Implementation

// Here the below executor is the callback function we pass in "new Promise( cb )" that have access to resolve and reject cb .

function PromisePolyFill(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false, // isCalled will be used to know whether in promise body it is syncronous or asyncronous
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;

    if (typeof onResolve === "function") {
      // come here means async task
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === "function") {
      // come here means async task
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (cb) {
    onResolve = cb;

    if (isFulfilled && !isCalled) {
      // come here means sync task
      isCalled = true;
      onResolve(value);
    }

    return this;
  };

  this.catch = function (cb) {
    onReject = cb;

    if (isRejected && !isCalled) {
      // come here means sync task
      isCalled = true;
      onReject(value);
    }

    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

/*

const exPromise = new PromisePolyFill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

console.log(exPromise);

exPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

const exPromise2 = new PromisePolyFill((resolve, reject) => {
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += i;
  }
  resolve(sum);
});

exPromise2
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

const exPromise3 = new PromisePolyFill((resolve, reject) => {
  reject("rejected");
});

exPromise3
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

*/

// A. Promise.resolve()

PromisePolyFill.resolve = (val) => {
  return new PromisePolyFill(function (resolve, reject) {
    resolve(val);
  });
};

PromisePolyFill.reject = (val) => {
  return new PromisePolyFill(function (resolve, reject) {
    reject(val);
  });
};

/*

PromisePolyFill.resolve("Direct Resolved").then((res) => {
  console.log(res);
});

PromisePolyFill.reject("Direct Rejected").catch((err) => {
  console.log(err);
});

*/

// B. Promise.All()

Promise.allPolyFill = (promises) => {
  return new Promise((resolve, reject) => {
    let results = [];

    if (!promises.length) {
      resolve(results);
      return;
    }

    let pending = promises.length;

    promises.forEach((promise, i) => {
      Promise.resolve(promise).then((res) => {
        results[i] = res;
        pending--;

        if (pending === 0) {
          resolve(results);
        }
      }, reject);
      // here 2nd argument in .then() is also a callback function which will execute when promise is rejected but instead of this .catch() is preferred 
    });
  });
};

/*

Promise.allPolyFill([
  Promise.resolve("All 1"),
  Promise.resolve("All 2"),
  Promise.resolve("All 3"),
  // Promise.resolve("All 4"),
  Promise.reject("All 4"),
])
.then((res)=>console.log("Success" , res))
.catch((err)=>console.log("Failed" ,err))

*/


// FOR FURTHER LEARN GO TO https://roadsidecoder.hashnode.dev/javascript-interview-questions-promises-and-its-polyfills