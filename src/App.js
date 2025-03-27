import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, { text: inputValue, status: "Yet to Start" }]);
      setInputValue("");
    }
  };

  const handleStatusChange = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              status:
                item.status === "Yet to Start"
                  ? "Work in Progress"
                  : "Done",
            }
          : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <div className="cover-page">
        <h1>Task Manager</h1>
        <p>Track your progress</p>
      </div>
      <div className="content">
        <h2>Manage Your Tasks</h2>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a task"
          />
          <button onClick={handleAddItem}>Add</button>
        </div>
        <div className="task-grid">
          {items.map((item, index) => (
            <div key={index} className={`task-tile ${item.status.replace(/\s+/g, "-")}`}>
              <button className="remove-btn" onClick={() => handleRemoveItem(index)}>×</button>
              <p>{item.text}</p>
              <button onClick={() => handleStatusChange(index)}>{item.status}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
