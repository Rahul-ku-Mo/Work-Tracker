import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CardDropMenu from "../Menu";
import CardView from "./CardView";
import CardInputForm from "../shared/CardInputForm";
import { toast } from "sonner";
import { deleteCard, updateCard } from "../../apis/CardApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Card = ({ columnName, columnId, title, id, description }) => {
  const [editCardName, setEditCardName] = useState(title);

  const { id: boardId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const accessToken = Cookies.get("accessToken");
  const queryClient = useQueryClient();

  const updateCardMutation = useMutation({
    mutationFn: async (data) => {
      const { title, cardDescription, attachments, dueDate, comments, cardId } =
        data;

      const updatedData = {};

      if (title !== undefined) updatedData.title = title;
      if (description !== undefined) updatedData.description = cardDescription;
      if (attachments !== undefined) updatedData.attachments = attachments;
      if (dueDate !== undefined) updatedData.dueDate = dueDate;
      if (comments !== undefined) updatedData.comments = comments;

      return await updateCard(accessToken, updatedData, cardId);
    },

    onSuccess: () => {
      toast.success("Card updated !! 🎉");
    },
    onError: () => {
      toast.error("Something wrong happened 🔥");
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", "columns", variables.columnId],
      });

      if (variables.cardDescription === undefined) {
        await queryClient.invalidateQueries({
          queryKey: ["columns", "boards", boardId],
        });
      }
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId) => {
      return await deleteCard(accessToken, cardId);
    },
    onSuccess: () => {
      toast.success("Card Deleted !! 🎉");
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["columns", "boards", boardId],
      });
    },
  });

  const inputRef = useRef(null);

  const cardViewProps = {
    columnName: columnName,
    columnId: columnId,
    title: title,
    cardId: id,
    description: description,
    updateCardMutation: updateCardMutation,
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  const handleShowInput = () => setShowInput(true);
  const handleHideInput = () => setShowInput(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const handleInputChange = (e) => setEditCardName(e.target.value);

  const handleUpdate = () =>
    updateCardMutation.mutate({
      title: editCardName,
      cardId: id,
      columnId: columnId,
    });

  return (
    <>
      <li className="bg-white transition m-1 rounded-md p-2 flex flex-col gap-1 card list-none">
        <CardHeader
          onOpenModal={handleOpenModal}
          id={id}
          deleteCardMutation={deleteCardMutation}
        />
        {showInput ? (
          <CardInputForm
            input={editCardName}
            onInputChange={handleInputChange}
            onHideInput={handleHideInput}
            inputRef={inputRef}
            handleUpdate={handleUpdate}
            prevInput={title}
          />
        ) : (
          <CardTitle title={title} onShowInput={handleShowInput} />
        )}
        <FontAwesomeIcon
          className="cursor-pointer w-3"
          onClick={handleOpenModal}
          icon={faBars}
        />
      </li>

      <CardView
        closeModal={handleCloseModal}
        isOpen={isOpen}
        {...cardViewProps}
        // taskName={title}
        // updateTaskDes={updateTaskDes}
        // listId={listId}
        // taskId={taskId}
        // comments={comments}
        // fetchTask={fetchTask}
        // listName={listName}
        // setTaskLabel={setTaskLabel}
        // taskLabel={currentLabelGroup}
        // updateTaskLabel={updateTaskLabel}
      />
    </>
  );
};

const CardHeader = ({ onOpenModal, id, deleteCardMutation }) => (
  <div className="flex justify-between items-center relative">
    <CardDropMenu
      openCard={onOpenModal}
      cardId={id}
      deleteCard={deleteCardMutation}
    />
  </div>
);

const CardTitle = ({ title, onShowInput }) => (
  <div
    className="font-semibold text-base tracking-tight cursor-pointer"
    onClick={onShowInput}
  >
    {title}
  </div>
);

export default Card;
