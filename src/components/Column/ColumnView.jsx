import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Cookies from "js-cookie";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

import { updateColumn, deleteColumn } from "../../apis/ColumnApis";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Draggable, Droppable } from "@hello-pangea/dnd";

import CardInput from "../shared/CardInput";
import DeleteDialog from "../Dialog/DeleteDialog";
import ColumnCards from "../Card/ColumnCards.jsx";

const ColumnView = ({ columnId, title, cards, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { id: boardId } = useParams();

  const inputRef = useRef();

  const queryClient = useQueryClient();

  const accessToken = Cookies.get("accessToken");

  const [columnName, setColumnName] = useState(title);

  const [showEditColumnInput, setShowEditColumnInput] = useState(false);

  const updateColumnMutation = useMutation({
    mutationFn: async (data) => {
      const { title, columnId } = data;

      return await updateColumn(accessToken, title, columnId);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["columns", columnId],
      });
    },

    onError: () => {
      toast.error("Something wrong happened 🔥");
    },
  });

  const deleteColumnMutation = useMutation({
    mutationFn: async (columnId) => await deleteColumn(accessToken, columnId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["columns", "boards", boardId],
      });
    },
    onError: () => {
      toast.error("Something wrong happened 🔥");
    },
  });

  const handleEditColumn = () => {
    updateColumnMutation.mutate({ title: columnName, columnId });
    setShowEditColumnInput(false);
  };

  const handleCancelEditColumn = () => {
    setShowEditColumnInput(false);
  };

  const handleshowEditColumn = () => {
    setShowEditColumnInput(true);
  };

  useEffect(() => {
    if (showEditColumnInput) {
      inputRef.current.focus();
    }
  }, [showEditColumnInput]);

  return (
    <>
      <Draggable draggableId={columnId} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="list-none self-start shrink-0 block h-full whitespace-nowrap "
          >
            <div
              {...provided.dragHandleProps}
              className="bg-zinc-200 flex justify-between max-h-full flex-col relative whitespace-normal scroll-m-1 w-64 rounded-md"
            >
              {showEditColumnInput ? (
                <EditColumnForm
                  prevColumnName={title}
                  columnName={columnName}
                  setColumnName={setColumnName}
                  onEditColumn={handleEditColumn}
                  onCancel={handleCancelEditColumn}
                  inputRef={inputRef}
                />
              ) : (
                <div className="flex py-3 pb-1 px-2 grow-0 gap-y-0 relative justify-between items-center wrap text-sm font-bold">
                  <span className="w-full" onClick={handleshowEditColumn}>
                    {columnName}
                  </span>
                  <FontAwesomeIcon
                    className="cursor-pointer rounded-full hover:rotate-90 transition-all ease-linear h-4 w-4 p-1"
                    icon={faXmark}
                    onClick={() => {
                      openModal();
                    }}
                  />
                </div>
              )}
              <ColumnCards
                columnId={columnId}
                columnName={columnName}
                cards={cards}
              />
            </div>
          </li>
        )}
      </Draggable>

      <DeleteDialog
        closeModal={closeModal}
        isOpen={isOpen}
        title="column"
        id={columnId}
        deleteItem={deleteColumnMutation}
      />
    </>
  );
};

const EditColumnForm = ({
  prevColumnName,
  columnName,
  setColumnName,
  onEditColumn,
  onCancel,
  inputRef,
}) => (
  <form
    className="p-1 pr-2 flex gap-4 w-full shadow-md hover:shadow-slate-700/50 rounded-md"
    onSubmit={(e) => {
      e.preventDefault();

      onEditColumn();
    }}
    onBlur={() => {
      if (prevColumnName !== columnName) {
        onEditColumn();
      }
      onCancel();
    }}
  >
    <CardInput
      setValue={setColumnName}
      value={columnName}
      id="column-input"
      name="column"
      inputRef={inputRef}
    />
  </form>
);
export default ColumnView;
