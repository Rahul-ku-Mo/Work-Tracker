import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import {
  BookOpen,
  Paperclip,
  MessageSquare,
  Bot,
  X,
  Plus,
  User,
  Tag,
  CheckSquare,
  Clock,
  Share2,
  Copy,
  Eye,
} from "lucide-react";

const CardView = ({
  cardId,
  columnId,
  columnName,
  title,
  description,
  isOpen,
  closeModal,
  updateCardMutation,
}) => {
  const [cardDescription, setCardDescription] = useState(description);

  const handleDescriptionUpdate = () => {
    if (!cardDescription) return;
    updateCardMutation.mutate({
      cardDescription,
      cardId,
      columnId,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden min-h-[70vh]">
          <div className="flex  items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 dark:text-zinc-100 flex items-center gap-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>{title}</span>
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                  in list <span className="underline">{columnName}</span>
                </p>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="mt-6">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-md bg-zinc-100 dark:bg-zinc-800 p-1">
                      {["Details", "Activity", "AI Summary"].map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            `w-full rounded-md py-2.5 text-sm font-medium leading-5 text-zinc-700 dark:text-zinc-300
                             focus:outline-none
                            transition-all ${
                              selected
                                ? "bg-white dark:bg-emerald-700 shadow"
                                : "hover:bg-emerald/[0.12] hover:text-zinc-900 dark:hover:text-zinc-100"
                            }`
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="mt-4">
                      <Tab.Panel className="rounded-md bg-white dark:bg-zinc-800 p-4 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 dark:text-zinc-100">
                            Description
                          </h3>
                          <textarea
                            value={cardDescription}
                            onChange={(e) => setCardDescription(e.target.value)}
                            placeholder="Add a more detailed description..."
                            className="w-full min-h-[100px] p-3 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:text-zinc-100 transition-all"
                          />
                          <button
                            onClick={handleDescriptionUpdate}
                            className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all"
                          >
                            Save
                          </button>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 dark:text-zinc-100">
                            Attachments
                          </h3>
                          <button className="flex items-center px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-zinc-100 transition-all">
                            <Paperclip className="mr-2 h-4 w-4" /> Add
                            attachment
                          </button>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 dark:text-zinc-100">
                            Labels
                          </h3>
                          <div className="flex gap-2 font-medium">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs dark:bg-emerald-900 dark:text-emerald-100">
                              Important
                            </span>
                            <span className="px-3 py-1 border border-zinc-300 dark:border-zinc-700 rounded-full text-xs dark:text-zinc-100">
                              Feature
                            </span>
                            <button className="p-1 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all">
                              <Plus className="h-4 w-4 dark:text-zinc-100" />
                            </button>
                          </div>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel className="rounded-md bg-white dark:bg-zinc-800 p-4">
                        <div className="space-y-4 overflow-y-auto h-40">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-start space-x-4">
                              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                                U{i}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium dark:text-zinc-100">
                                  User {i}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                  Added a comment: "This is a placeholder
                                  comment."
                                </p>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                  2 hours ago
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel className="rounded-md bg-white dark:bg-zinc-800 p-4">
                        <div className="rounded-md border border-zinc-200 dark:border-zinc-700 p-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <Bot className="h-5 w-5 text-emerald-500" />
                            <h3 className="text-lg font-semibold dark:text-zinc-100">
                              AI Summary
                            </h3>
                          </div>
                          <p className="text-sm text-zinc-600 dark:text-zinc-300">
                            This task involves implementing a new feature for
                            the user dashboard. Key points: - Requires backend
                            API changes - Frontend updates needed in React
                            components - Estimated completion time: 3-5 days -
                            High priority due to client request
                          </p>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>

                <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                  <h3 className="font-semibold text-sm mb-3 dark:text-zinc-100">
                    Add to card
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: User, label: "Members" },
                      { icon: Tag, label: "Labels" },
                      { icon: CheckSquare, label: "Checklist" },
                      { icon: Clock, label: "Dates" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex items-center text-sm justify-start px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-100 transition-all"
                      >
                        <Icon className="mr-2 h-4 w-4" /> {label}
                      </button>
                    ))}
                  </div>
                  <h3 className="font-semibold text-sm mt-4 mb-3 dark:text-zinc-100">
                    Actions
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: Share2, label: "Share" },
                      { icon: Copy, label: "Copy" },
                      { icon: Eye, label: "Watch" },
                    ].map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        className="flex text-sm items-center justify-start px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-100 transition-all"
                      >
                        <Icon className="mr-2 h-4 w-4" /> {label}
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CardView;
