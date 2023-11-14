import React from "react";
import ToDoBoard from "./components/ToDoBoard";
import Navbar from "./components/Navbar/navbar"

const App = () => {
  return (
    <div>
      <div className="background"></div>
      <Navbar/>
      <ToDoBoard />
    </div>
  );
};

export default App;
