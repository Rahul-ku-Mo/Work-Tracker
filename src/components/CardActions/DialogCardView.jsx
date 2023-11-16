import React, { useState } from "react";
import CardDialog from "../Dialog/CardDialog";
import User from "../shared/User";
import Button from "../shared/Button/Button";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { formatDate } from "../../constant";
import useCardView from "../../hooks/useCardView";

import {
  faBars,
  faBookBookmark,
  faPaperclip,
  faLaptopCode,
  faUser,
  faTag,
  faCheckToSlot,
  faClock,
  faPlus,
  faShare,
  faCopy,
  faMobile,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const DialogCardView = ({
  setDes,
  fetchTask,
  taskName,
  color,
  listId,
  taskId,
  updateTaskDes,
  comments,
  taskDescription,
  listName,
  isOpen,
  closeModal,
}) => {
  const { handleSubmit, comment, setComment } = useCardView(
    listId,
    taskId,
    fetchTask
  );

  const [showTextArea, setShowTextArea] = useState(false);

  return (
    <CardDialog closeModal={closeModal} isOpen={isOpen}>
      <div className="text-base mb-10 flex justify-between">
        <div>
          <FontAwesomeIcon className="px-2 " icon={faBookBookmark} />{" "}
          <span className="text-lg font-semibold">{taskName}</span>
          <div className="text-sm leading-3 text-slate-600 pl-9">
            in the list{" "}
            <span className="underline hover:text-slate-300">{listName}</span>{" "}
          </div>
          <div className="flex flex-col">
            <div className="ml-9 mt-4 text-xs font-bold tracking-wide">
              Labels
            </div>
            <div className="flex gap-1 ml-9 w-full font-semibold text-sm leading-8">
              <div className="text-center h-8 min-w-12 rounded-md px-3  bg-blue-800 flex-1 text-white">
                IT
              </div>
              <div className="text-center h-8 min-w-12 rounded-md px-3  bg-emerald-500 flex-1 text-white">
                Product
              </div>
              <div className="text-center h-8 min-w-12 rounded-md px-3  bg-orange-600 flex-1 text-white">
                Marketing
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-pointer" onClick={closeModal}>
          <FontAwesomeIcon
            icon={faPlus}
            className="rotate-45 hover:bg-slate-200 p-2 rounded-full "
          />
        </div>
      </div>

      <div className="float-left m-0 relative w-[447px]">
        <div className="text-base mb-10">
          <FontAwesomeIcon className="px-2 text-sm" icon={faBars} />{" "}
          <span className="font-semibold">Description</span>
          {showTextArea ? (
            <>
              <textarea
                className="ml-8 my-2 px-3 py-2 font-semibold  bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
                focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                value={taskDescription}
                placeholder="Add a more detailed desciption..."
                onChange={(e) => setDes(e.target.value)}
              />
              <button
                className={`bg-emerald-500 hover:bg-emerald-700 px-4 py-2 rounded-md text-white text-sm font-semibold ml-8 w-fit`}
                onClick={() => {
                  updateTaskDes(listId, taskId);
                  // update(!stateUpdate);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <div
              className="ml-8 text-sm mt-2"
              onClick={() => {
                setShowTextArea(true);
              }}
            >
              {taskDescription ||
                `Our brand & product have evolved over the past two years, and our website should be updated to reflect this. The new site will be mobile-first, responsive and lightweight.`}
            </div>
          )}
        </div>
        <div className="text-base mb-10 flex flex-col">
          <div>
            {" "}
            <FontAwesomeIcon className="px-2" icon={faPaperclip} /> Attachments
          </div>
          <div className="ml-[2.1rem] w-fit text-white hover:text-black">
            <Button btnInput={"Add an attachment"} />
          </div>
        </div>

        <div className="flex flex-col mb-10 gap-2">
          <div className="flex items-center justify-between pb-2">
            {" "}
            <div>
              <FontAwesomeIcon className="px-2" icon={faLaptopCode} />
              Activity
            </div>
            <div className=" text-white hover:text-black">
              {" "}
              <Button btnInput={"Show Details"} />
            </div>
          </div>
          <form className="flex items-center" onSubmit={handleSubmit}>
            <div className="ml-1">
              {" "}
              <User />
            </div>
            <input
              className="ml-2 flex-1 pl-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
              focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              type="text"
              value={comment}
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-4 text-sm font-semibold bg-emerald-500  rounded-md text-white  hover:bg-emerald-700  mx-2"
            >
              Add
            </button>
          </form>
          {/****add time stamp and array of strings */}
          <div className="h-[60vh] overflow-auto flex flex-col gap-2">
            {comments
              ?.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds)
              .map((c, i) => {
                return (
                  <div
                    className="ml-10 p-2 bg-zinc-200 text-sm leading-5 rounded-md"
                    key={`c.timeStamp${i}`}
                  >
                    <div className="text-xs font-black flex justify-between">
                      Rahul KM <span>{formatDate(c.timeStamp)}</span>
                    </div>
                    <p>{c.comment}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="modal-sidebar text-white md:block hidden">
        <div className="text-xs !text-slate-400 font-semibold">Add to card</div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Members"} icon={faUser} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Label"} icon={faTag} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"CheckList"} icon={faCheckToSlot} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Dates"} icon={faClock} />
        </div>

        <div className="my-2 hover:text-black cursor-not-allowed">
          <Button btnInput={"Attachments"} icon={faPaperclip} />
        </div>

        <div className="text-slate-400 text-xs">
          Add dropdowns, text fields, dates, and more to your cards.
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">
          Power-Ups
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Dates"} icon={faPlus} />
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">
          Automations
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Add Buttons"} icon={faPlus} />
        </div>
        <div className="text-xs text-slate-400 font-semibold mt-8">Actions</div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Move"} icon={faMobile} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Copy"} icon={faCopy} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Share"} icon={faShare} />
        </div>
        <div className="my-2 hover:text-black">
          <Button btnInput={"Watch"} icon={faEye} />
        </div>
      </div>
    </CardDialog>
  );
};

export default DialogCardView;