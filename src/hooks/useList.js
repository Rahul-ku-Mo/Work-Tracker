import { useState, useEffect } from "react";
import { db } from "../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const useList = () => {
  const [currentList, setCurrentList] = useState("");

  const [lists, setLists] = useState([]);

  //1.add SwimLanes and tasks to the database
  const addLists = async () => {
    try {
      if (currentList != "") {
        const docRef = await addDoc(collection(db, "Lists"), {
          listName: currentList,
          timeStamp: Timestamp.fromDate(new Date(Date.now())),
        });

        setLists((oldLists) => [
          ...oldLists,
          {
            listName: currentList,
            listId: docRef.id,
            timeStamp: Timestamp.fromDate(new Date(Date.now())),
          },
        ]);

        setCurrentList("");
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  const getLists = async () => {
    const querySnapshot = await getDocs(collection(db, "Lists"));
    const listArray = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      listArray.push({ ...doc.data(), listId: doc.id });
    });

    setLists(listArray);
  };

  const deleteList = async (listId) => {
    try {
      await deleteDoc(doc(db, "Lists", listId));

      getLists();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return {
    lists,
    setLists,
    currentList,
    setCurrentList,
    addLists,
    getLists,
    deleteList,
  };
};

export default useList;
