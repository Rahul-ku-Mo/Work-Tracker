import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const DeleteDialog = ({ closeModal, isOpen, deleteItem, title , id }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Delete <span className="capitalize">{title}</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-800">
                      Are you sure you want to delete this {title} ?
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex transition-all justify-center rounded-md border border-transparent bg-red-100 px-6 py-2 text-sm  font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => deleteItem.mutate(id)}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex transition-all justify-center rounded-md border border-transparent bg-slate-100 px-6 py-2 text-sm  font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteDialog;
