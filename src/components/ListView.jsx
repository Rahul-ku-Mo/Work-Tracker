import Card from "./Card/Card";
import AddCard from "./CardActions/AddCard";
import { useState } from "react";
import useTask from "../hooks/useTask";
import DeleteDialog from "./Dialog/DeleteDialog";

import styles from "./Board.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ListView = ({ listId, listName, deleteList, setActive, active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    taskList,
    currentTask,
    setCurrentTask,
    getTask,
    addTask,
 
  } = useTask(listId);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteCurrentList = () => {
    deleteList(listId);
  };

  return (
    <>
      <DeleteDialog
        closeModal={closeModal}
        isOpen={isOpen}
        title="list"
        deleteItem={deleteCurrentList}
      />
      <div
        className={`flex justify-between items-center font-bold ${styles.p} text-sm pt-3 pr-3 pl-4`}
      >
        {listName}
        <FontAwesomeIcon
          className="cursor-pointer rounded-full hover:bg-slate-300 h-4 w-4 p-1"
          icon={faXmark}
          onClick={() => {
            openModal();
          }}
        />
      </div>
      <div className="">
        {taskList
          ?.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds)
          .map((card) => {
            return (
              <Card
                listId={listId}
                listName={listName}
                key={card.taskId}
                taskId={card.taskId}
                title={card.taskName}
                description={card.taskDescription}
                status_color={card.taskBg}
                status={card.status}
                fetchTask={getTask}
                comments={card?.taskComments}
                active={active}
                setActive={setActive}
                currentLabelGroup={card.taskLabel}
              />
            );
          })}
      </div>
      <AddCard
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        listId={listId}
        addTask={addTask}
      />
    </>
  );
};

export default ListView;
