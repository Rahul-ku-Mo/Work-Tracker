import React from "react";
import Board from "../components/Board";
import Navbar from "../components/Navbar";

import bannerImage from "../assets/bg-board.jpg";

const Dashboard = () => {
  return (
    <>
      <div className="background">
        <img
          className="absolute top-0 right-0 bottom-0 left-0 object-cover h-full w-full bg-gradient-to-t from-black to-transparent z-[-1]"
          src={bannerImage}
          alt="Dashboard"
        />
      </div>
      <Navbar />
      <Board />
    </>
  );
};

export default Dashboard;
