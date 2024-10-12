import { Tooltip } from "react-tooltip";
import { useContext } from "react";

import Placeholder from "../../assets/placeholder.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Container from "../../layouts/Container";
import Form from "./Form";
import { UserContext } from "../../Context/UserContext";

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <Container fwdClassName="dark:bg-zinc-800 bg-white pl-2 pb-2 pr-2 flex flex-col">
      <h1 className="text-2xl font-bold text-black dark:text-white capitalize tracking-tight my-4 border-l-4 h-6 inline-flex items-center pl-2 dark:border-white border-zinc-800 ">
        Account
      </h1>
      <div className="flex gap-2 lg:flex-nowrap flex-wrap overflow-auto">
        <div className="flex flex-col bg-white dark:bg-zinc-900 dark:text-white text-black rounded-md items-center max-w-full w-full p-8 lg:max-w-sm">
          <div className="relative border-2 rounded-full p-2 border-dashed">
            <img
              src={user?.imageUrl || Placeholder}
              alt="profile"
              className="w-28 h-28 rounded-full border-2 object-contain border-emerald-500 transition-all ease-linear"
            />

            <div className="absolute inset-0 m-2 flex flex-col gap-2 items-center justify-center text-white text-xs font-medium w-28 cursor-pointer h-28 bg-black/80 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
              Update Photo
            </div>
            <FontAwesomeIcon
              icon={faCamera}
              className="text-white bg-emerald-500 rounded-full p-2 absolute bottom-0 right-4 hover:scale-95 transition-all ease-linear cursor-pointer"
            />
          </div>
          <span className="text-xs text-center py-6">
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
          </span>
          <div className="flex flex-col pb-10">
            <h2 className="font-bold text-3xl text-center tracking-tight">
              {user?.name}
            </h2>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <h2 className="font-semibold bg-emerald-800 text-xs w-fit px-2 flex items-center justify-center text-white rounded-lg">
              Free
            </h2>
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="w-3 h-3 cursor-pointer"
              data-tooltip-id="pricing-tooltip"
              data-tooltip-content="You are a free user"
            />
            <Tooltip
              place="right"
              id="pricing-tooltip"
              className="!bg-white-700 !text-zinc-200 !px-2 !py-1 !rounded-md"
            />
          </div>

          <button className="bg-emerald-900 text-white hover:bg-emerald-700 px-4 w-fit py-2 rounded-lg text-sm font-semibold my-2 transition-all ease-linear">
            Deactivate account
          </button>
        </div>
        <Form user={user} />
      </div>
    </Container>
  );
};

export default Account;
