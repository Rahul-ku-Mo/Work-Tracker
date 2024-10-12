import Container from "../../layouts/Container";
import BoardPopover from "./BoardPopover";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useBoards } from "../../hooks/useQueries";

import { MAX_BOARDS } from "../../constant";
const BoardSelection = () => {
  const accessToken = Cookies.get("accessToken");

  const { data: boards, isPending } = useBoards(accessToken);

  if (isPending) {
    return (
      <Container fwdClassName="pl-2 bg-white dark:bg-zinc-800">
        <h1 className="text-2xl font-bold text-black dark:text-white capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 border-zinc-800 dark:border-white ">
          Your Boards
        </h1>
        <div className="absolute z-0 inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/50 dark:bg-zinc-800 rounded-md p-4  text-center">
            <h1 className="text-2xl font-bold dark:text-white text-black/50">
              Create your first board
            </h1>
            <p className="text-sm font-medium dark:text-white text-black/40">
              Start by creating a board to organize your tasks
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fwdClassName="pl-2 bg-white dark:bg-zinc-800">
      <h1 className="text-2xl font-bold dark:text-zinc-100 text-black capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 dark:border-white border-zinc-800 ">
        Your Boards
      </h1>

      <div className="flex flex-wrap gap-4">
        {boards?.map((board) => {
          return (
            <Link
              className="relative"
              to={`/kanban/${board?.id}`}
              key={`${board?.id}${board?.imageId}`}
            >
              <img
                src={board?.imageFullUrl}
                alt="Board background"
                className="h-36 w-52 object-cover rounded-md"
              />
              <div className="absolute inset-0 flex justify-between flex-col bg-black/30 rounded-md p-2 hover:bg-black/50 transition-all ease-linear">
                <span className="text-white font-bold text-lg">
                  {board.title}
                </span>
                <span className="text-white/10 dark:text-white/80 font-medium text-xs self-end ">
                  {board.imageUserName}
                </span>
              </div>
            </Link>
          );
        })}
        <BoardPopover count={MAX_BOARDS - boards.length} />
      </div>
    </Container>
  );
};

export default BoardSelection;
