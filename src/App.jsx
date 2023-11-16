import React from "react";
import Board from "./components/Board";
import Navbar from "./components/Navbar/Navbar"

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
