import { useState, useEffect } from "react";

import { db } from "../Firebase";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";

import { randomColorGenerator } from "../constant";

const useTask = (listId) => {
  const [taskList, setTaskList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [currentDescription, _setCurrentDescription] = useState("");
  const [color, setColor] = useState(randomColorGenerator());

  const getTask = async (currentListId) => {
    const querySnapshot = await getDocs(
      collection(db, "Lists", currentListId, "Tasks")
    );
    const taskArray = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      taskArray.push({ ...doc.data(), taskId: doc.id });
    });

    setTaskList(taskArray);
  };

  const addTask = async (currentListId) => {
    try {
      if (currentTask !== "") {
        addDoc(collection(db, "Lists", currentListId, "Tasks"), {
          taskName: currentTask,
          taskDescription: currentDescription,
          taskBg: color,
          taskComments: [],
          timeStamp: Timestamp.fromDate(new Date(Date.now()))
        });

        setCurrentTask(""); //empty the current task field
      }

      getTask(currentListId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTask(listId);
  }, []);

  useEffect(() => {
    setColor(randomColorGenerator());
  }, []);

  return {
    taskList,
    setTaskList,
    currentTask,
    setCurrentTask,
    currentDescription,
    color,
    setColor,
    getTask,
    addTask,
  };
};

export default useTask;
