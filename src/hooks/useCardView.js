import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const useCardView = (listId, taskId, fetchTask) => {
  const [comment, setComment] = useState("");

  const addComments = async (comment) => {
    const docRef = doc(db, "Lists", listId, "Tasks", taskId);

    try {
      // Update Firestore document
      await updateDoc(docRef, {
        taskComments: arrayUnion({
          comment: comment,
          timeStamp: Timestamp.fromDate(new Date(Date.now())),
        }),
      });

      setComment("");

      fetchTask(listId);
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComments(comment);
  };

  return { handleSubmit, addComments, comment, setComment };
};

export default useCardView;
