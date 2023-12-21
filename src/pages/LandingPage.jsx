import React from "react";
import { Link } from "react-router-dom";

import github from "../assets/github.svg";
import Cookies from "js-cookie";

const LandingPage = () => {
  const token = Cookies.get("accessToken");

  return (
    <div className="bg-slate-100 h-screen transition-all">
      <header>
        <nav className="bg-transparent py-3 px-4 flex justify-between items-center bg-zinc-100 shadow-lg fixed top-0 w-full">
          <h1 className="font-bold text-xl relative text-slate-800 tracking-tighter">
            Work<span className="text-emerald-500">Tracker</span>
          </h1>
          <Link
            to={token === undefined ? "/auth" : "/dashboard"}
            className="px-4 py-2 hover:bg-emerald-600 bg-emerald-700 rounded-md text-sm font-semibold text-white"
          >
            {token === undefined ? "Try for free" : "Continue"}
          </Link>
        </nav>
      </header>
      <main className="flex flex-col pt-60 pb-20 items-center justify-center bg-slate-100">
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 font-bold tracking-tighter">
          Track your work seamlessly
        </h1>
        <div className="text-3xl md:text-5xl bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 p-2 rounded-md pb-4 w-fit font-semibold">
          work forward.
        </div>
        <div className="text-sm md:text-xl text-neutral-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto __className_6d1a03">
          Priortize your time. Collaborate and Manage seamlessly, reaching new
          heights of productivity. Save your work with WorkTracker.
        </div>
        <Link
          to={token === undefined ? "/auth" : "/dashboard"}
          className="px-12 py-2 hover:bg-emerald-600 bg-emerald-700 rounded-md text-sm font-semibold text-white mt-4 transition-all"
        >
          {token === undefined
            ? "Try WorkTracker for free"
            : "Continue with WorkTracker"}
        </Link>
      </main>
      <footer className="bg-slate-100 shadow-lg py-3 px-4 flex justify-between items-center fixed bottom-0 w-full border-t-slate-200 border-t-2">
        <h1 className="font-bold text-xl relative text-slate-800 tracking-tighter">
          Work<span className="text-emerald-500">Tracker</span>
        </h1>

        <Link
          to="https://github.com/Rahul-ku-Mo/Work-Tracker"
          className="text-sm text-gray-600 hover:text-gray-400 font-bold flex gap-2 items-center "
          target="_blank"
        >
          <img src={github} className="w-4 h-4" />
          Check out this page
        </Link>
      </footer>
    </div>
  );
};

export default LandingPage;
