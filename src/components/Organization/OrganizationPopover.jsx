import { Popover } from "@headlessui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrganizationForm from "./OrganizationForm";
import { Tooltip } from "react-tooltip";

const OrganizationPopover = ({ teamLeader, paidUser }) => {
  return (
    <Popover className="relative w-full">
      <Popover.Button
        disabled={!paidUser}
        data-tooltip-id="information-tooltip"
        data-tooltip-content="Create a new organization"
        className="cursor-pointer p-2 w-full flex items-center hover:opacity-90 justify-center  rounded-md bg-emerald-800 text-white  transition-all ease-linear"
      >
        <FontAwesomeIcon icon={faPlus} className="h-4 w-4 " />
      </Popover.Button>
      <Tooltip
        place="top-start"
        id="information-tooltip"
        className="!bg-white-700 !text-zinc-200 !px-2 !py-1 !rounded-md"
      />
      <Popover.Panel className="absolute top-0 left-20 z-10 w-[20rem] p-2 bg-white rounded-md shadow-lg">
        <OrganizationForm teamLeader={teamLeader} />
      </Popover.Panel>
    </Popover>
  );
};

export default OrganizationPopover;
