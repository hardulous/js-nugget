// Promise in js

// In JavaScript, synchronous and asynchronous are two different approaches for handling code execution and managing tasks

// 1. Synchronous Vs Asynchronous => In synchronous execution, tasks are executed one after another in a blocking manner. When a synchronous task is getting executed, the program waits for it to complete before moving on to the next task. This means that if a task takes a long time to complete, it will block the execution of subsequent tasks, causing the program to appear unresponsive . EX :

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

// 2. Callback => It is a function that is passed as an argument to another function and is invoked or called at a later point in time. The purpose of using callbacks is to specify what should happen after a certain operation or task is completed , Mostly use in asynchronous task . EX :

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

// 3. Promises => A promise is an object that represents the completion or failure of an asynchronous operation and its resulting value. It is commonly used for handling asynchronous operations such as fetching data from a server, making API calls, or executing time-consuming tasks . Promises provide a way to write asynchronous code that is more readable and easier to manage than traditional callback-based approaches. A promise can be in one of three states:

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

// 4. Promise Combinator => These are functions that help us to operate or execute more than one promise at a time and return result of all the promises at once , There are 4 types of promise combinator : Promise.all() , Promise.race() , Promise.allSettled() and  Promise.any()

// A. Promise.all() => it takes an array of promises and returns a new promise. The returned promise fulfills when all the input promises fulfill, and the fulfilled value is an array of the resolved values from the input promises. If any of the input promises reject, the returned promise rejects with the reason of the first rejected promise. EX ::

let all = Promise.all([
  Promise.resolve("All Resolve 1"),
  Promise.resolve("All Resolve 2"),
  Promise.resolve("All Resolve 3"),
]);

console.log(all);
all.then((res) => console.log(res));

all = Promise.all([
  Promise.resolve("All Resolve 1"),
  Promise.resolve("All Reject 2"),
  Promise.reject("All Resolve 3"),
]);

console.log(all)
all.catch((err)=>console.log(err))


// B. Promise.race() => it takes an array of promises and returns a new promise. The returned promise settles (fulfills or rejects) as soon as any of the input promises settles. The settlement value of the returned promise is the same as the settlement value of the first settled promise (either fulfilled or rejected)