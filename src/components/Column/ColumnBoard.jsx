import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import Container from "../../layouts/Container";
import CardInput from "../shared/CardInput";
import SubHeader from "../SubHeader";
import ColumnView from "./ColumnView";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumn, updateColumnOrdering } from "../../apis/ColumnApis";

import Cookies from "js-cookie";
import { toast } from "sonner";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import KanbanContext from "../../Context/KanbanContext";

const reOrder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ColumnBoard = ({ title }) => {
  const { id: boardId } = useParams();

  const { columns } = useContext(KanbanContext);

  const inputRef = useRef();

  const queryClient = useQueryClient();

  const accessToken = Cookies.get("accessToken");

  const [columnName, setColumnName] = useState("");

  const [showListInput, setShowListInput] = useState(false);

  const createColumnMutation = useMutation({
    mutationFn: (title) => createColumn(accessToken, title, boardId),
    onSuccess: () =>
      queryClient.invalidateQueries(["columns", "boards", boardId]),
    onError: () =>
      toast.error("Something went wrong while creating the column 🔥"),
  });

  const updateColumnsOrderMutation = useMutation({
    mutationFn: (columns) => updateColumnOrdering(accessToken, columns),
  });

  const sortedColumns = columns?.sort((a, b) => a.order - b.order);

  const handleAddColumn = useCallback(() => {
    if (!columnName.trim()) return;
    createColumnMutation.mutate(columnName);
    setColumnName("");
    setShowListInput(false);
  }, [columnName, createColumnMutation]);

  const handleCancelAddColumn = () => setShowListInput(false);
  const handleShowListInput = () => setShowListInput(true);

  const onDragEnd = useCallback(
    (result) => {
      const { destination, source, type } = result;

      if (
        !destination ||
        (destination.droppableId === source.droppableId &&
          destination.index === source.index)
      ) {
        return;
      }

      if (type === "column") {
        const columnItems = reOrder(
          sortedColumns,
          source.index,
          destination.index
        ).map((item, idx) => ({ ...item, order: idx }));

        queryClient.setQueryData(["columns", "boards", boardId], columnItems);
        updateColumnsOrderMutation.mutate(columnItems);
      }

      if (type === "card") {
        const sourceColumn = columns.find(
          (column) => column.id === parseInt(source.droppableId)
        );
        const destColumn = columns.find(
          (column) => column.id === parseInt(destination.droppableId)
        );

        if (!sourceColumn || !destColumn) return;

        sourceColumn.cards = sourceColumn.cards || [];
        destColumn.cards = destColumn.cards || [];

        let updatedColumns;

        if (source.droppableId === destination.droppableId) {
          const reOrderedCards = reOrder(
            sourceColumn.cards,
            source.index,
            destination.index
          ).map((card, idx) => ({ ...card, order: idx }));

          updatedColumns = columns.map((column) =>
            column.id === sourceColumn.id
              ? { ...column, cards: reOrderedCards }
              : column
          );
        } else {
          const [movedCard] = sourceColumn.cards.splice(source.index, 1);
          movedCard.columnId = parseInt(destination.droppableId);
          destColumn.cards.splice(destination.index, 0, movedCard);

          sourceColumn.cards.forEach((card, idx) => (card.order = idx));
          destColumn.cards.forEach((card, idx) => (card.order = idx));

          updatedColumns = columns.map((column) => {
            if (column.id === sourceColumn.id)
              return { ...column, cards: sourceColumn.cards };
            if (column.id === destColumn.id)
              return { ...column, cards: destColumn.cards };
            return column;
          });
        }

        queryClient.setQueryData(
          ["columns", "boards", boardId],
          updatedColumns
        );
      }
    },
    [columns, sortedColumns, queryClient, boardId, updateColumnsOrderMutation]
  );

  useEffect(() => {
    if (showListInput) {
      inputRef.current?.focus();
    }
  }, [showListInput]);

  return (
    <>
      <SubHeader title={title} />
      <Container background="bg-transparent">
        <div className="h-full w-full relative">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" type="column" direction="horizontal">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex items-start gap-3 overflow-x-auto pb-2.5 pt-[3.5rem] absolute inset-0"
                >
                  {sortedColumns?.map((column, idx) => (
                    <ColumnView
                      columnId={column.id}
                      title={column.title}
                      key={`${column.id}`}
                      cards={column.cards}
                      index={idx}
                    />
                  ))}
                  {provided.placeholder}
                  <div className="bg-slate-200 rounded-md ">
                    {showListInput ? (
                      <AddColumnForm
                        columnName={columnName}
                        setColumnName={setColumnName}
                        onAddColumn={handleAddColumn}
                        onCancel={handleCancelAddColumn}
                        inputRef={inputRef}
                      />
                    ) : (
                      <ExpandAddColumnButton onClick={handleShowListInput} />
                    )}
                  </div>
                </ol>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Container>
    </>
  );
};

const AddColumnForm = React.memo(
  ({ columnName, setColumnName, onAddColumn, onCancel, inputRef }) => (
    <form
      className="p-1 flex gap-2 flex-col min-w-[272px] dark:bg-zinc-800 shadow-md hover:shadow-slate-700/50 rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        onAddColumn();
      }}
    >
      <CardInput
        setValue={setColumnName}
        value={columnName}
        id="column-input"
        name="column"
        ref={inputRef}
      />
      <div className="flex items-center gap-4 justify-between">
        <button
          type="submit"
          className="py-2 px-4 tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md transition-all"
        >
          Create
        </button>
        <FontAwesomeIcon
          className="cursor-pointer rounded-full hover:rotate-90 transition-all ease-linear h-4 w-4 p-1 dark:text-white"
          onClick={onCancel}
          icon={faXmark}
        />
      </div>
    </form>
  )
);

const ExpandAddColumnButton = React.memo(({ onClick }) => (
  <div
    onClick={onClick}
    className="text-sm rounded-md min-w-[272px] leading-8 p-2 font-bold shadow-slate-700/50 h-fit cursor-pointer hover:shadow-md bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white transition-all ease-in-out"
  >
    <FontAwesomeIcon icon={faPlus} className="pr-2 text-sm" />
    New Column
  </div>
));

export default ColumnBoard;
