/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";

import useList from "../hooks/useList";
import styles from "./ToDoBoard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlus,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import ListView from "./ListView";

const ToDoBoard = () => {
  const [showListInput, setShowListInput] = useState("none");
  const [hideListInput, setHideListInput] = useState("inline-block");

  const { lists, setCurrentList, addLists, deleteList } = useList();
  
  return (
    <div className={styles.board + ` no-scrollbar`}>
      {lists.map((eachList, i) => {
        return (
          <div className={styles.boardGap + ` no-scrollbar`} key={i}>
            <div className={`${styles.board_sec} ${styles.p}`}>
              {eachList.listName}
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faXmarkCircle}
                onClick={() => {
                  deleteList(eachList.listId);
                }}
              />
            </div>
            <ListView listId={eachList.listId} />
          </div>
        );
      })}

      <div
        onClick={() => {
          setShowListInput("inline");
          setHideListInput("none");
        }}
        style={{ display: `${hideListInput}` }}
        className="ml-4 text-sm rounded-sm min-w-[272px] leading-8 px-3 bg-transparent custom-shadow text-white h-fit cursor-pointer hover:bg-zinc-300 hover:text-black transition all 250ms ease-in-out"
      >
        <FontAwesomeIcon icon={faPlus} className="pr-2" />
        Add List
      </div>
      <div
        className="ml-4 text-sm rounded-sm bg-slate-100 px-1 pt-1"
        style={{ display: `${showListInput}` }}
      >
        <input
          className={styles.listInput}
          type="text"
          onChange={(e) => setCurrentList(e.target.value)}
        />
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => {
              addLists();
              setHideListInput("inline-block");
              setShowListInput("none");
            }}
            className={styles.actionBtn}
          >
            Add List
          </button>
          <FontAwesomeIcon
            className="cursor-pointer h-5"
            onClick={() => {
              setHideListInput("inline-block");
              setShowListInput("none");
            }}
            icon={faXmark}
          />
        </div>
      </div>
    </div>
  );
};

export default ToDoBoard;
