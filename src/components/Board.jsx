import React, { useState } from "react";

import useList from "../hooks/useList";
import styles from "./Board.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import ListView from "./ListView";

const Board = () => {
  const [showListInput, setShowListInput] = useState(false);
  const [active, setActive] = useState(false);

  const { lists, setCurrentList, addLists, deleteList } = useList();

  return (
    <>
      <div className={styles.board + ` no-scrollbar`}>
        {lists
          ?.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds)
          .map((eachList, i) => {
            return (
              <div
                className={styles.boardGap + ` no-scrollbar bg-zinc-200`}
                key={eachList.listId + i}
              >
                <ListView
                  listId={eachList.listId}
                  listName={eachList.listName}
                  deleteList={deleteList}
                  active={active}
                  setActive={setActive}
                />
              </div>
            );
          })}

        <div className="bg-slate-200 rounded-md ">
          {showListInput && (
            <form
              className="p-1 flex gap-2 flex-col min-w-[272px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                placeholder="Good to go..."
                className="flex w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                onChange={(e) => setCurrentList(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    addLists();
                    setShowListInput(false);
                  }}
                  className="py-2 px-4 tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md"
                >
                  Add a List
                </button>
                <FontAwesomeIcon
                  className="cursor-pointer h-5"
                  onClick={() => {
                    setShowListInput(false);
                  }}
                  icon={faXmark}
                />
              </div>
            </form>
          )}

          {!showListInput && (
            <div
              onClick={() => {
                setShowListInput(true);
              }}
              className="text-sm rounded-md min-w-[272px] leading-8 p-2 font-bold custom-shadow h-fit cursor-pointer bg-zinc-200 text-black transition all 250ms ease-in-out"
            >
              <FontAwesomeIcon icon={faPlus} className="pr-2" />
              Add a List
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Board;
