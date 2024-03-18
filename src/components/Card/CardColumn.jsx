import { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "sonner";

import Cookies from "js-cookie";
import { Droppable } from "@hello-pangea/dnd";

import { createCard } from "../../apis/CardApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "./Card";
import AddCardForm from "./AddCardForm";

const CardColumns = ({ columnId, columnName, cards }) => {
  const { id: boardId } = useParams();
  const queryClient = useQueryClient();

  const accessToken = Cookies.get("accessToken");

  const [cardName, setCardName] = useState("");

  const createCardMutation = useMutation({
    mutationFn: async (data) => {
      const { title, columnId } = data;
      return await createCard(accessToken, title, columnId);
    },
    onSuccess: () => {
      toast.success("Card created successfully 🎉");
    },
    onError: (error) => {
      toast.error("Error creating card 😞", error);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cards", "columns", columnId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["columns", "boards", boardId],
      });
    },
  });

  return (
    <>
      <Droppable droppableId={columnId.toString()} type="card">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="px-1 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto list-none"
          >
            {cards
              ?.sort(
                (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
              )
              .map((card, index) => {
                return (
                  <Card
                    key={card.id}
                    {...card}
                    index={index}
                    columnName={columnName}
                    labelGroup={card?.labels}
                  />
                );
              })}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
      <AddCardForm
        columnId={columnId}
        createCardMutation={createCardMutation}
        cardName={cardName}
        setCardName={setCardName}
      />
    </>
  );
};

export default CardColumns;
