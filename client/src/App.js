import React from "react";
import { Book } from "./Components/Book"
import { AddBook } from "./Components/AddBook"

function App() {
  return (
    <div className="App" id="main">
      <h1>Front end</h1>
      <Book />
      <AddBook />
    </div>
  );
}

export default App
