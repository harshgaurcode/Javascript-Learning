// JavaScript promises are a powerful way to handle asynchronous operations,
// allowing you to structure code so that it can perform background tasks without blocking the main thread.

// A promise is an object representing the eventual completion (or failure) of an asynchronous operation. It has three states:

// Pending: The operation hasn't completed yet.
// Fulfilled: The operation completed successfully.
// Rejected: The operation failed.

// To handle multiple promises, you can use:

// Promise.all(): Waits for all promises to resolve or any to reject.
// Promise.race(): Resolves or rejects as soon as any promise does.

// Async functions return promises by default.
// await works only inside async functions.
// To handle errors, use try...catch with async functions or .catch() with promises.
// Avoid assigning async values to variables outside their promise context without using await or .then()—otherwise, you’ll get undefined due to timing.

//
// Example
//

// Simulating an asynchronous API call with random delays and possible errors
function fetchData(apiName, delay = 1000, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(`Error fetching data from ${apiName}`);
      } else {
        resolve(`${apiName} data`);
      }
    }, delay);
  });
}

// 1. Basic Promise Usage with .then() and .catch()
fetchData("API 1", 500)
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("Failed to fetch data:", error);
  });

// 2. Using async/await with error handling
async function getData() {
  try {
    const data = await fetchData("API 2", 1000);
    console.log("Async/Await data:", data);
  } catch (error) {
    console.error("Async/Await Error:", error);
  }
}

getData();

// 3. Using Promise.all to handle multiple promises concurrently
async function getAllData() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fetchData("API 3", 1000),
      fetchData("API 4", 1500),
      fetchData("API 5", 2000),
    ]);
    console.log("All data fetched:", data1, data2, data3);
  } catch (error) {
    console.error("Error in Promise.all:", error);
  }
}

getAllData();

// 4. Using Promise.race to get the first resolved/rejected promise
async function getFastestData() {
  try {
    const fastestData = await Promise.race([
      fetchData("Fast API", 500),
      fetchData("Slower API", 1000),
      fetchData("Slowest API", 1500),
    ]);
    console.log("Fastest data received:", fastestData);
  } catch (error) {
    console.error("Error in Promise.race:", error);
  }
}

getFastestData();

// 5. Using Promise.resolve() and Promise.reject()
function alwaysResolve() {
  return Promise.resolve("This is resolved data");
}

function alwaysReject() {
  return Promise.reject("This promise is always rejected");
}

alwaysResolve().then((data) => console.log("Resolved:", data));
alwaysReject().catch((error) => console.error("Rejected:", error));

// 6. Combining async/await with Promise.all and handling mixed results
async function fetchAllWithErrors() {
  const promises = [
    fetchData("API 6", 800),
    fetchData("API 7", 1200, true), // This one will fail
    fetchData("API 8", 1000),
  ];

  try {
    const results = await Promise.all(promises);
    console.log("Fetched all successfully:", results);
  } catch (error) {
    console.error("Error in one of the APIs:", error);
  }
}

fetchAllWithErrors();

// 7. Custom handling for multiple results with Promise.allSettled()
async function fetchWithAllSettled() {
  const promises = [
    fetchData("API 9", 1000),
    fetchData("API 10", 500, true), // This one will fail
    fetchData("API 11", 1500),
  ];

  const results = await Promise.allSettled(promises);
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`API ${index + 9} succeeded with data:`, result.value);
    } else {
      console.warn(`API ${index + 9} failed with reason:`, result.reason);
    }
  });
}

fetchWithAllSettled();
