import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div className="container">
      <h1>Counter App</h1>

      {/* Display value */}
      <h2>{count}</h2>

      {/* Buttons */}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;