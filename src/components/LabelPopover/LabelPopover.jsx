import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";
import LabelForm from "./LabelForm";

const LabelPopover = ({ cardId }) => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="w-full">
            <Button btnInput={"Label"} icon={faTag} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 -translate-x-1/2 z-10 mt-3 w-screen max-w-xs transform px-4 ">
              <LabelForm cardId={cardId} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LabelPopover;
