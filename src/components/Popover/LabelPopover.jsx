import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";

const popoverItems = [
  {
    hoverColor: "bg-emerald-700",
    color: "bg-emerald-600/90",
    label: "IT",
  },
  {
    hoverColor: "bg-pink-700",
    color: "bg-pink-600/90",
    label: "Product",
  },
  {
    hoverColor: "bg-yellow-700",
    color: "bg-yellow-600/90",
    label: "SaaS",
  },
  {
    hoverColor: "bg-red-700",
    color: "bg-red-600/90",
    label: "Marketing",
  },
  {
    hoverColor: "bg-cyan-700",
    color: "bg-cyan-600/90",
    label: "Full-Stack",
  },
];

const LabelPopover = ({ setTaskLabel, updateTaskLabel }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      const itemExists = prevItems.find(
        (prevItem) => prevItem.label === item.label
      );

      if (itemExists) {
        // If the item is already selected, remove it from the array
        return prevItems.filter((prevItem) => prevItem.label !== item.label);
      } else {
        // If the item is not selected, add it to the array
        return [...prevItems, item];
      }
    });

    console.log(item.color, item.label);
  };
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
              <div className="overflow-hidden ring-1 ring-black/5 rounded-t-md">
                <div className="relative grid gap-2 bg-zinc-100 p-2 grid-cols-2 grid-rows-2">
                  {popoverItems.map((item, index) => (
                    <div
                      key={item.label}
                      onClick={() => handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(index)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative flex py-2 px-4 rounded-md shrink-0 items-center font-semibold text-white text-sm justify-center max-w-10 ${
                        hoveredItem === index ? item.hoverColor : item.color
                      } transition-all cursor-pointer `}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {selectedItems.find(
                        (selectedItem) => selectedItem.label === item.label
                      ) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-full bg-black/50 rounded-md" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-100 p-2 shadow-lg rounded-b-md ">
                <button
                  onClick={() => {
                    setTaskLabel(selectedItems);
                    updateTaskLabel(selectedItems);
                    close()
                  }}
                  className="flex items-center bg-emerald-500 hover:bg-emerald-700 w-full justify-center rounded-md py-2"
                >
                  Save
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default LabelPopover;
