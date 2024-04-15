import { faBuildingCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../utils";
import clsx from "clsx";

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
      <div className="relative bg-white flex flex-col overflow-y-auto gap-8 p-7 max-h-[23.5rem]">
        {notifications?.length === 0 && (
          <div className="relative text-black text-sm">
            No notifications yet.
          </div>
        )}
        {notifications?.map((item, idx) => (
          <div
            key={"notifcation" + "-" + idx}
            className="-m-3 relative flex gap-3 items-start bg-white rounded-lg p-2 group transition duration-300 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black bg-gray-500/20 transition-all ease-linear duration-500 group-hover:bg-gray-500/50 rounded-md sm:h-12 sm:w-12">
              <FontAwesomeIcon icon={faBuildingCircleCheck} />
            </div>
            <p className="text-sm text-gray-500">
              {item.message === "JOIN"
                ? "You have been invited to"
                : "You have been"}
              <span
                className={clsx(
                  item.message === "JOIN"
                    ? "text-emerald-600 font-bold"
                    : "text-red-500 font-bold",
                  "uppercase"
                )}
              >
                {item.message === "JOIN" ? " join " : " removed from "}
              </span>
              the organization.
            </p>
            <div className="absolute bottom-0 right-0 text-black/50 text-xs p-2">
              {formatDate(item.createdAt)}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="bg-gray-50 p-4">
        <a
          href="##"
          className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
        >
          <span className="flex items-center">
            <span className="text-sm font-medium text-gray-900">
              Documentation
            </span>
          </span>
          <span className="block text-sm text-gray-500">
            Start integrating products and tools
          </span>
        </a>
      </div> */}
    </div>
  );
};

export default NotificationPanel;
