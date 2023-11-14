import React, { useState, useRef, useEffect } from "react";

import "./card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";

import CardView from "../CardActions/CardView";
import Select from "../shared/Select/Select";
import useCard from "../../hooks/useCard";

const Card = ({
  title,
  status_color = "brown",
  description,
  taskId,
  listId,
  comments,
  addTask,
  fetchTask,
  listName,
}) => {
  const {
    show,
    setShow,
    color,
    setColor,
    cardRef,
    updateTaskDes,
    taskDescription,
    setTaskDescription,
    deleteTask,
    updateTaskColors,
  } = useCard(listId, taskId, status_color, description, fetchTask);

  return (
    <div
      className="bg-white shadow-lg m-2 rounded-md p-2 flex flex-col gap-2"
      ref={cardRef}
    >
      <CardView
        setShow={setShow}
        addTask={addTask}
        show={show}
        taskDescription={taskDescription}
        setDes={setTaskDescription}
        taskName={title}
        color={status_color}
        updateTaskDes={updateTaskDes}
        listId={listId}
        taskId={taskId}
        comments={comments}
        fetchTask={fetchTask}
        listName={listName}
        // update={update}
        // stateUpdate={stateUpdate}
      />

      <div className="">
        <div
          className={`h-3 w-12 rounded-xl`}
          style={{ backgroundColor: `${color}` }}
        />
      </div>
      <div className=" font-semibold text-base tracking-tight cursor-pointer">
        {title}
      </div>
      <div className="flex items-center justify-between ">
        {/* <div className="custom--padding text-sm">{description}</div> */}
        <FontAwesomeIcon
          className="cursor-pointer w-3"
          onClick={() => setShow(true)}
          icon={faBars}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="m-1 cursor-pointer"
          onClick={() => {
            deleteTask(listId, taskId);
            // setDel(!del);
          }}
        />
      </div>
      {/* <div className="custom--padding flex gap-4 items-center justify-between">
        <div className="flex gap-2"></div>
        <Select
          selectColor={setColor}
          updateTaskColors={updateTaskColors}
          listId={listId}
          taskId={taskId}
          // update={update}
          color={color}
          // stateUpdate={stateUpdate}
        />
      </div>  */}
    </div>
  );
};

export default Card;
