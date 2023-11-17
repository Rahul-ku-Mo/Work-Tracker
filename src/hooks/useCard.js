import { useRef, useState, useEffect } from "react";
import { db } from "../Firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const useCard = (
  listId,
  taskId,
  description,
  fetchTask,
  title
) => {
  const [taskName, setTaskName] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskLabel, setTaskLabel] = useState([]);

  const cardRef = useRef();

  const updateTaskDes = async () => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    await updateDoc(docRef, {
      taskDescription: taskDescription,
    });

    fetchTask(listId);
  };

  const updateTaskName = async () => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    await updateDoc(docRef, {
      taskName: taskName,
    });

    fetchTask(listId);
  };

  const updateTaskLabel = async (taskLabels) => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    await updateDoc(docRef, {
      taskLabel: taskLabels,
    });

    fetchTask(listId);
  };

  const deleteTask = async (listId, taskId) => {
    try {
      await deleteDoc(doc(db, "Lists", listId, "Tasks", taskId));

      fetchTask(listId);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         // Apply the fade-in animation with a random duration between 0.5s and 2s
  //         const animationDuration = Math.random() * 1.5 + 0.5;
  //         entry.target.style.animation = `${animationDuration}s fadeIn`;
  //       }
  //     });
  //   });

  //   if (cardRef.current) {
  //     observer.observe(cardRef.current);
  //   }

  //   // Clean up the observer when the component unmounts
  //   return () => {
  //     if (cardRef.current) {
  //       observer.unobserve(cardRef.current);
  //     }
  //   };
  // }, []);

  return {
    cardRef,
    updateTaskDes,
    taskDescription,
    setTaskDescription,
    deleteTask,
    updateTaskName,
    taskName,
    setTaskName,
    updateTaskLabel,
    taskLabel,
    setTaskLabel,
  };
};

export default useCard;
