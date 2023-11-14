import React, { useState, useRef, useEffect } from "react";

import "./card.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTrash } from "@fortawesome/free-solid-svg-icons";

import CardView from "../CardActions/CardView";
import Select from "../shared/Select/Select";
import useCard from "../../hooks/useCard";

const Card = ({
  title = "Card 😅",
  status_color = "brown",
  description,
  taskId,
  listId,
  comments,
  addTask,
  fetchTask,
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
    <div className="card">
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
        // update={update}
        // stateUpdate={stateUpdate}
      />

      <div
        ref={cardRef}
        onClick={() => {
          setShow(true);
        }}
        className="card--custom-bg cursor-pointer"
        style={{ backgroundColor: `${status_color}` }}
      ></div>
      <div className="card-name cursor-pointer">{title}</div>
      <div className="flex items-center justify-between">
        <div className="custom--padding text-sm">{description}</div>
        <FontAwesomeIcon
          icon={faTrash}
          className="m-1 cursor-pointer"
          onClick={() => {
            deleteTask(listId, taskId);
            // setDel(!del);
          }}
        />
      </div>
      <div className="custom--padding flex gap-4 items-center justify-between">
        <div className="flex gap-2">
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => setShow(true)}
            icon={faBars}
          />
        </div>
        <Select
          selectColor={setColor}
          updateTaskColors={updateTaskColors}
          listId={listId}
          taskId={taskId}
          // update={update}
          color={color}
          // stateUpdate={stateUpdate}
        />
      </div>
    </div>
  );
};

export default Card;
