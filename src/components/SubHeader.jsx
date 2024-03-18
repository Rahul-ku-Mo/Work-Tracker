import React, { useState } from "react";
import {
  faBars,
  faSort,
  faFilter,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import DeleteDialog from "./Dialog/DeleteDialog";
import { deleteBoard } from "../apis/BoardApis";
import { toast } from "sonner";

const SubHeader = ({ title }) => {
  const { id: boardId } = useParams();

  const navigate = useNavigate();

  const accessToken = Cookies.get("accessToken");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const deleteBoardMutation = useMutation({
    mutationFn: async (boardId) => {
      await deleteBoard(accessToken, boardId);
    },
    onSuccess: () => {
      toast.success("Board deleted successfully");
    },
    onError: () => {
      toast.error("Something wrong happened 🔥");
    },
    onSettled: () => {
      navigate(`/boards`, { replace: true });
    },
  });

  return (
    <>
      <nav className="flex w-full top-12 z-20 px-4 bg-black/30 fixed h-fit py-2 justify-between items-center">
        <div className="text-xl tracking-tighter font-black text-white uppercase ">
          {title}
        </div>
        <div
          onClick={openModal}
          className="inline-flex gap-2 cursor-pointer items-center px-4 hover:opacity-90 opacity-100 transition-all ease-linear p-2 rounded-md bg-red-700 text-slate-50"
        >
          <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
          <span className="text-sm font-medium">Trash</span>
        </div>
      </nav>
      <DeleteDialog
        closeModal={closeModal}
        isOpen={isOpen}
        deleteItem={deleteBoardMutation}
        title={title}
        id={boardId}
      />
    </>
  );
};

export default SubHeader;
