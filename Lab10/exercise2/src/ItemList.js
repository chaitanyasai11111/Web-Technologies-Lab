function ItemList({ items, removeItem }) {
  return (
    <div>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        items.map((item) => (
          <div className="card" key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ItemList;