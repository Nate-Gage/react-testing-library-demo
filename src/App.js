import React, { useState } from "react";
import "./App.css";
import Item from "./Item";
import Form from "./Form";

function App() {
  const [error, setError] = useState(false);

  const items = [
    {
      id: 1,
      utensil: "Spoon",
    },
    {
      id: 2,
      utensil: "Knife",
    },
    {
      id: 3,
      utensil: "Plate",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1 data-testid="header">Items</h1>
        {items.map((item) => {
          return <Item key={item.id} utensil={item.utensil} />;
        })}
        <Form />
        <h2
          data-testid="errorMsg"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          A hidden error message!
        </h2>
      </header>
    </div>
  );
}

export default App;
