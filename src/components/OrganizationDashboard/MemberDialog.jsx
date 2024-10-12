import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUsers } from "../../hooks/useQueries";
import placeholder from "../../assets/placeholder.png";
import clsx from "clsx";
import { createInviteNotification } from "../../apis/NotificationApis";

export const MemberDialog = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const [selectedUser, setSelectedUser] = useState("");

  const accessToken = Cookies.get("accessToken");

  const { data: users } = useUsers(accessToken);

  const assignMember = async () => {
    await createInviteNotification(accessToken, "JOIN", selectedUser?.id);

    toast.success("Invitation sent successfully");

    setSelectedUser("");

    setEmail("");

    closeModal();
  };

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
                    className="text-lg font-medium leading-6 text-zinc-900"
                  >
                    Assign members to your organization
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="flex flex-col relative grow">
                        <input
                          type="email"
                          id="email"
                          value={email || ""}
                          placeholder={
                            selectedUser === "" ? "Enter email address" : ""
                          }
                          onChange={handleChange}
                          className={clsx(
                            "peer px-3 py-2 mt-2 rounded-md w-full border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:placeholder-zinc-400 placeholder-transparent",
                            selectedUser !== "" ? "pl-[6.2rem]" : "pl-3"
                          )}
                        />
                        <div className="absolute top-4 left-2 w-[90px] text-sm font-bold bg-emerald-500 rounded-full px-1 z-30 block truncate">
                          {selectedUser?.name}
                        </div>
                        <label
                          className={`peer-focus:text-xs text-sm peer-focus:top-0 transition-all ease-linear tracking-tight peer-focus:text-emerald-500 text-zinc-600  font-bold peer-focus:bg-white absolute z-20 left-2 ${
                            email || selectedUser !== ""
                              ? "top-0 text-xs bg-white placeholder:text-transparent"
                              : "top-4 "
                          }`}
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm py-2">Or choose from these users</p>
                    {
                      <ul className="list-none flex flex-col gap-2 cursor-pointer">
                        {users?.map((user) => (
                          <li
                            className="p-2 rounded-md flex group items-center transition-all ease-in-out duration-500 gap-2 text-sm hover:bg-emerald-600"
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                          >
                            <img
                              src={user?.image || placeholder}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="px-2 font-medium group-hover:text-white flex flex-col">
                              <span className="text-sm">{user?.name}</span>
                              <span className="text-xs opacity-70">
                                {user?.email}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    }
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      disabled={
                        email !== "" || selectedUser !== "" ? false : true
                      }
                      className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex justify-center rounded-md border border-transparent bg-emerald-900 px-4 py-2 text-sm font-medium text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={assignMember}
                    >
                      Assign
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

export default MemberDialog;
