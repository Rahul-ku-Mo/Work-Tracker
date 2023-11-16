import { Menu, Transition } from "@headlessui/react";
import {
  faEllipsis,
  faTrashCan,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import DeleteDialog from "../Dialog/DeleteDialog";

const CardDropMenu = ({ deleteCard, openCard }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <DeleteDialog
        isOpen={isOpen}
        closeModal={closeModal}
        deleteTask={deleteCard}
      />
      <Menu>
        <Menu.Button>
          {" "}
          <FontAwesomeIcon icon={faEllipsis} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex flex-col gap-2 top-8 right-4 bg-zinc-200 font-semibold rounded-md absolute p-2 text-black">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-emerald-500"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 cursor-pointer bg-zinc-100`}
                  onClick={openCard}
                >
                  <FontAwesomeIcon icon={faFolderOpen} bounce />
                  Open this card
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={openModal}
                  className={`${
                    active && "bg-emerald-500"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2 cursor-pointer bg-zinc-100`}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  Delete this card
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default CardDropMenu;
