import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CardDropMenu from "./CardDropMenu";
import CardView from "./CardView";
import CardInputForm from "../shared/CardInputForm";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { toast } from "sonner";
import { deleteCard, updateCard } from "../../apis/CardApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import CardLabelGroup from "../Label/CardLabelGroup";

const Card = ({
  columnName,
  columnId,
  title,
  id,
  description,
  index,
  labelGroup,
}) => {
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
    labelGroup: labelGroup,
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
      <Draggable draggableId={id.toString()} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-white dark:bg-zinc-800 dark:text-zinc-200 text-black dark:border dark:border-zinc-700 hover:shadow-sm transition m-1 rounded-md p-2 flex flex-col gap-1 card list-none"
          >
            <div className="flex justify-between items-start">
              <CardLabelGroup labelGroup={labelGroup} />
            </div>

            <CardTitle title={title} />
            <FontAwesomeIcon
              className="cursor-pointer w-3"
              onClick={handleOpenModal}
              icon={faBars}
            />
          </li>
        )}
      </Draggable>
      <CardView
        closeModal={handleCloseModal}
        isOpen={isOpen}
        {...cardViewProps}
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
