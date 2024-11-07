// A closure in JavaScript is a function that retains access to its lexical scope, even when the function is
// executed outside of its original scope. In simpler terms, a closure allows a function to "remember" the variables and
// functions declared in its surrounding scope, even after that scope has finished executing.

// Closures capture their lexical environment, retaining access to variables even after the outer function completes.
// Closures provide encapsulation and private state in JavaScript, useful for creating private variables and functions.
// Memory Management: Although closures allow for encapsulation, they can lead to increased memory usage if not managed well, as the variables inside the closure are retained.
// Use Cases: Commonly used in callbacks, event listeners, factory functions, the module pattern, and memoization.

function createCounter() {
  let count = 0; // This variable is private to the closure

  return {
    increment() {
      count += 1;
      console.log("Current count:", count);
    },
    decrement() {
      count -= 1;
      console.log("Current count:", count);
    },
    reset() {
      count = 0;
      console.log("Counter reset.");
    },
  };
}

const counter = createCounter();
counter.increment(); // Logs "Current count: 1"
counter.increment(); // Logs "Current count: 2"
counter.decrement(); // Logs "Current count: 1"
counter.reset(); // Logs "Counter reset."

function setupButton(buttonId) {
  let clickCount = 0;

  const button = document.getElementById(buttonId);
  button.addEventListener("click", function () {
    clickCount++;
    console.log(`Button ${buttonId} clicked ${clickCount} times.`);
  });
}

setupButton("myButton");
