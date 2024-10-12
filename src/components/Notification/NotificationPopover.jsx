import { Popover, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import NotificationPanel from "./NotificationPanel";

import { NotificationContext } from "../../Context/NotificationContext";

const NotificationPopover = () => {
  const { notifications, isPending, isNewNotification } =
    useContext(NotificationContext);

  if (isPending) {
    return (
      <FontAwesomeIcon
        icon={faBell}
        className="h-4 w-4 bg-slate-600/20 cursor-pointer p-2 rounded-full border hover:border-dashed hover:border-black/30 border-black/30 transition-all text-black"
      />
    );
  }

  return (
    <Popover className="relative w-fit">
      <Popover.Button className="flex items-center flex-col relative">
        <FontAwesomeIcon
          icon={faBell}
          className="h-4 w-4 dark:bg-white bg-slate-600/20 cursor-pointer p-2 rounded-full border hover:border-dashed hover:border-black/30 border-black/30 transition-all text-black"
        />
        {isNewNotification && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse "></span>
        )}
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
        <Popover.Panel className="absolute left-4 z-20 mt-3 top-8 mr-32 w-screen max-w-sm -translate-x-full transform px-4 sm:px-0">
          <NotificationPanel notifications={notifications} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPopover;
