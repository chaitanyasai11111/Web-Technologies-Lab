import { useState } from "react";
import ItemList from "./ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  
  function addItem() {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(), 
      name: input
    };

    setItems([...items, newItem]);
    setInput("");
  }

  
  function removeItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  }

  return (
    <div className="container">
      <h1>Item List</h1>

      
      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      
      <ItemList items={items} removeItem={removeItem} />
    </div>
  );
}

export default App;