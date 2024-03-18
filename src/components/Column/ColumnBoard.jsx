import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import Container from "../../layouts/Container";
import CardInput from "../shared/CardInput";
import SubHeader from "../SubHeader";
import ColumnView from "./ColumnView";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createColumn } from "../../apis/ColumnApis";

import Cookies from "js-cookie";
import { toast } from "sonner";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import KanbanContext from "../../Context/KanbanContext";

function reOrder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ColumnBoard = ({ title }) => {
  const { id: boardId } = useParams();

  const { columns } = useContext(KanbanContext);

  const inputRef = useRef();

  const queryClient = useQueryClient();

  const accessToken = Cookies.get("accessToken");

  const [columnName, setColumnName] = useState("");

  const [showListInput, setShowListInput] = useState(false);

  const createColumnMutation = useMutation({
    mutationFn: async (title) => {
      await createColumn(accessToken, title, boardId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["columns", "boards", boardId],
      });
    },
    onError: () => {
      toast.error("Something wrong happened 🔥");
    },
  });

  const sortedColumns = columns?.sort(
    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
  );

  const handleAddColumn = () => {
    createColumnMutation.mutate(columnName);
    setShowListInput(false);
  };

  const handleCancelAddColumn = () => {
    setShowListInput(false);
  };

  const handleShowListInput = () => {
    setShowListInput(true);
  };

  const onDragEnd = (result) => {
    
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const columnItems = reOrder(
        sortedColumns,
        source.index,
        destination.index
      ).map((item, idx) => ({ ...item, order: idx }));
      // Here you should update the state of your columns and make a request to your API to persist the new order
      // setColumns(newColumns);
      // updateColumnOrderInAPI(newColumns);

      queryClient.setQueryData(["columns", "boards", boardId], columnItems);
    }

    if (type === "card") {
      const sourceColumn = columns.find(
        (column) => column.id === source.droppableId
      );
      const destColumn = columns.find(
        (column) => column.id === destination.droppableId
      );
      const [removed] = sourceColumn.cards.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceColumn.cards.splice(destination.index, 0, removed);

        // Here you should update the state of your columns and make a request to your API to persist the new order
        // setColumns(columns);
        // updateCardOrderInAPI(sourceColumn);
      } else {
        removed.columnId = destination.droppableId;
        destColumn.cards.splice(destination.index, 0, removed);

        // Here you should update the state of your columns and make a request to your API to persist the new order
        // setColumns(columns);
        // updateCardOrderInAPI(destColumn);
      }
    }
  };

  useEffect(() => {
    if (showListInput) {
      inputRef.current.focus();
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
                  {sortedColumns
                    ?.sort((a, b) => a.order - b.order)
                    .map((column, idx) => (
                      <ColumnView
                        columnId={column.id}
                        title={column.title}
                        key={`${idx}${column.id}`}
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

const AddColumnForm = ({
  columnName,
  setColumnName,
  onAddColumn,
  onCancel,
  inputRef,
}) => (
  <form
    className="p-1 flex gap-2 flex-col min-w-[272px] shadow-md hover:shadow-slate-700/50 rounded-md"
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
      inputRef={inputRef}
    />
    <div className="flex items-center gap-4">
      <button
        type="submit"
        className="py-2 px-4 tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md transition-all"
      >
        Add Column
      </button>
      <FontAwesomeIcon
        className="cursor-pointer h-5"
        onClick={onCancel}
        icon={faXmark}
      />
    </div>
  </form>
);

const ExpandAddColumnButton = ({ onClick }) => (
  <div
    onClick={onClick}
    className="text-sm rounded-md min-w-[272px] leading-8 p-2 font-bold shadow-slate-700/50 h-fit cursor-pointer hover:shadow-md bg-zinc-200 text-black transition-all ease-in-out"
  >
    <FontAwesomeIcon icon={faPlus} className="pr-2 text-sm" />
    Add Column
  </div>
);

export default ColumnBoard;
