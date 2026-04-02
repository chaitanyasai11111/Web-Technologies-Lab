import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result.slice(0, 5)); 
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <h1>API Data</h1>

     
      <button onClick={fetchData}>Fetch Data</button>

      
      {loading && <p>Loading...</p>}

      
      {error && <p className="error">{error}</p>}

      
      {data.length > 0 && !loading && (
        <div>
          {data.map((item) => (
            <div className="card" key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;