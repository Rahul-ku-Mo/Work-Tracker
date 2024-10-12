import { Popover } from "@headlessui/react";
import BoardForm from "./BoardForm";

const BoardPopover = ({ count }) => {
  return (
    <Popover className="relative w-fit">
      <Popover.Button className="w-52 p-2 flex cursor-pointer flex-col items-center justify-center h-36 rounded-md bg-zinc-300">
        <span className="font-bold text-sm">Create New Board</span>
        <span className="font-medium text-xs">{count} Remaining</span>
      </Popover.Button>
      <Popover.Panel className="absolute top-36 left-52 z-10 w-[20rem] p-2 bg-zinc-200 rounded-md shadow-lg">
        <BoardForm count={count} />
      </Popover.Panel>
    </Popover>
  );
};

export default BoardPopover;
