import React from "react";
import Board from "./components/Board";
import Navbar from "./components/Navbar/Navbar.jsx"

const App = () => {
  return (
    <div>
      <div className="background"></div>
      <Navbar/>
      <Board />
    </div>
  );
};

export default App;
