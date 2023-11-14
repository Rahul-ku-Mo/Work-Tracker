import { useRef, useState, useEffect } from "react";
import { db } from "../Firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const useCard = (listId, taskId, status_color, description, fetchTask) => {
  const [show, setShow] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const [color, setColor] = useState(status_color);

  const cardRef = useRef();

  const updateTaskDes = async () => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    await updateDoc(docRef, {
      taskDescription: taskDescription,
    });

    fetchTask(listId);
  };

  const updateTaskColors = async (color, listId, taskId) => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    await updateDoc(docRef, {
      taskBg: color,
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Apply the fade-in animation with a random duration between 0.5s and 2s
          const animationDuration = Math.random() * 1.5 + 0.5;
          entry.target.style.animation = `${animationDuration}s fadeIn`;
        }
      });
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return {
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
  };
};

export default useCard;
