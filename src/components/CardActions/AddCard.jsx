import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const AddCard = ({ setCurrentTask, addTask, listId, currentTask }) => {
  const [showCardInput, setShowCardInput] = useState(false);

  return (
    <>
      {showCardInput && (
        <form
          className="p-2 flex flex-col gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            placeholder="Enter a title for this card..."
            className="flex w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
            focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            value={currentTask}
            type="text"
            onChange={(e) => setCurrentTask(e.target.value)}
          />
          <div className="flex items-center gap-x-4">
            <div
              onClick={() => {
                addTask(listId);
                setCurrentTask("");
                setShowCardInput(false);
              }}
              className="py-2 px-4 tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md"
            >
              Add card
            </div>
            <FontAwesomeIcon
              className="cursor-pointer h-5"
              onClick={() => {
                setShowCardInput(false);
              }}
              icon={faXmark}
            />
          </div>
        </form>
      )}
      {!showCardInput && (
        <div
          className="px-4 my-2 py-2 rounded-md  w-full text-zinc-600 font-semibold bg-zinc-00 transition-all 250ms ease-in-out cursor-pointer"
          onClick={() => {
            setShowCardInput(true);
          }}
        >
          <FontAwesomeIcon className="pr-1 cursor-pointer " icon={faPlus} />
          Add a card
        </div>
      )}
    </>
  );
};

export default AddCard;
