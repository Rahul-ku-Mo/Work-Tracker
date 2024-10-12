import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../Dialog/DeleteDialog";
import { deleteBoard } from "../../apis/BoardApis";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OrganizationBoard = ({ boards }) => {
  const accessToken = Cookies.get("accessToken");

  const navigate = useNavigate();

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

  if (boards?.length === 0) {
    return (
      <div className="p-2 rounded-md bg-white/90 grow">
        <h3 className="text-lg font-bold border-l-4 px-1 border-black leading-4">
          Boards
        </h3>
        <p className="text-xs pt-5 opacity-60">No Boards yet..</p>
      </div>
    );
  }
  return (
    <>
      <div className="p-2 rounded-md bg-white/90 grow">
        <h3 className="text-lg font-bold border-l-4 px-1 border-black leading-4">
          Boards
        </h3>
        <ul className="flex flex-col gap-4 py-1">
          {boards?.map((board) => {
            return (
              <li
                key={board.id}
                className="flex justify-between gap-2 hover:bg-zinc-200 p-1 rounded-md transition-all ease-in-out duration-300"
              >
                <img
                  src={board.imageThumbUrl}
                  alt={board.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div className="flex flex-col grow items-center justify-center">
                  <Link
                    to={`/kanban/${board.id}`}
                    className="text-base font-bold tracking"
                  >
                    {board.title}{" "}
                  </Link>
                  {/* <p className="text-xs opacity-60">5 Members</p> */}
                </div>
                <div
                  onClick={openModal}
                  className="h-6 w-6 self-center cursor-pointer hover:bg-slate-200/20 hover:text-red-500 transition-all flex items-center justify-center ease-linear duration-300 rounded-full p-0.5"
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="h-4 w-4"
                  />
                </div>
                <DeleteDialog
                  closeModal={closeModal}
                  isOpen={isOpen}
                  deleteItem={deleteBoardMutation}
                  title={board.title}
                  id={board.id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default OrganizationBoard;
