import { useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "sonner";

import Cookies from "js-cookie";

import { createCard } from "../../apis/CardApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Card from "./Card";
import AddCardForm from "./AddCardForm";

const ColumnCards = ({ columnId, columnName, cards }) => {

  const {id: boardId} = useParams()
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
      <ol className="px-1 flex-1 flex flex-col h-full overflow-x-hidden overflow-y-auto list-none">
        {cards
          ?.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
          .map((card) => {
            return (
              <Card
                // listId={listId}
                // listName={listName}
                key={card.id}
                // taskId={card.taskId}
                {...card}
                columnName={columnName}
                // status_color={card.taskBg}
                // status={card.status}
                // fetchTask={getTask}
                // comments={card?.taskComments}
                // active={active}
                // setActive={setActive}
                // currentLabelGroup={card.taskLabel}
              />
            );
          })}
      </ol>
      <AddCardForm
        columnId={columnId}
        createCardMutation={createCardMutation}
        cardName={cardName}
        setCardName={setCardName}
      />
    </>
  );
};

export default ColumnCards;
