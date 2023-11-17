import React, { useState, useRef, useEffect } from "react";

import "./card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import useCard from "../../hooks/useCard";

import DialogCardView from "../CardActions/DialogCardView";
import CardDropMenu from "../Menu";
import CardLabelGroup from "../Label/CardLabelGroup";

const Card = ({
  title,
  description,
  taskId,
  listId,
  comments,
  addTask,
  fetchTask,
  listName,
  active,
  setActive,
  currentLabelGroup,
}) => {
  const {
    cardRef,
    updateTaskDes,
    taskDescription,
    setTaskDescription,
    deleteTask,

    updateTaskName,
    taskName,
    setTaskName,

    setTaskLabel,
    updateTaskLabel,
  } = useCard(listId, taskId, description, fetchTask, title);

  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const deleteCard = () => {
    deleteTask(listId, taskId);
  };

  useEffect(() => {
    if (showInput) {
      focusInput();
    }
  }, [showInput]);

  return (
    <>
      <div
        className="bg-white transition m-2 rounded-md p-2 flex flex-col gap-1 card"
        ref={cardRef}
      >
        <div className="flex justify-between items-center relative">
          <CardLabelGroup
            labelGroup={currentLabelGroup}
            activeLabelGroups={active}
            setActiveLabelGroups={setActive}
          />

          <CardDropMenu openCard={openModal} deleteCard={deleteCard} />
        </div>
        {!showInput && (
          <div
            className=" font-semibold text-base tracking-tight cursor-pointer"
            onClick={() => {
              setShowInput(true);
            }}
          >
            {taskName}
          </div>
        )}
        {showInput && (
          <form
            className="p-1 flex gap-2 flex-col w-full"
            onSubmit={(e) => {
              e.preventDefault();
              updateTaskName();
              setShowInput(false);
            }}
          >
            <input
              ref={inputRef}
              onBlur={() => {
                setShowInput(false);
              }}
              value={taskName}
              className="flex w-full !h-8 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </form>
        )}

        <FontAwesomeIcon
          className="cursor-pointer w-3"
          onClick={openModal}
          icon={faBars}
        />
      </div>

      <DialogCardView
        addTask={addTask}
        closeModal={closeModal}
        isOpen={isOpen}
        taskDescription={taskDescription}
        setDes={setTaskDescription}
        taskName={title}
        updateTaskDes={updateTaskDes}
        listId={listId}
        taskId={taskId}
        comments={comments}
        fetchTask={fetchTask}
        listName={listName}
        setTaskLabel={setTaskLabel}
        taskLabel={currentLabelGroup}
        updateTaskLabel={updateTaskLabel}
      />
    </>
  );
};

export default Card;
