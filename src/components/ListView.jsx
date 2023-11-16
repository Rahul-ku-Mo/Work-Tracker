import Card from "./Card/Card";
import AddCard from "./CardActions/AddCard";

import useTask from "../hooks/useTask";

const ListView = ({ listId, listName }) => {
  const { taskList, currentTask, setCurrentTask, getTask, addTask } =
    useTask(listId);

  return (
    <>
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
