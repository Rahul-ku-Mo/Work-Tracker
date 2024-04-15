import CardInput from "../shared/CardInput";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Check, Loader2 } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import useBoardForm from "../../hooks/useBoardForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrganizations } from "../../hooks/useQueries";
import Cookies from "js-cookie";
const BoardForm = ({ count }) => {
  const {
    isLoading,
    isPending,
    images,
    selectedImageId,
    setCurrentBoardInput,
    currentBoardInput,
    setSelectedImageId,
    handleSubmit,
    selectedOrganizationId,
    setSelectedOrganizationId,
  } = useBoardForm(count);

  const accessToken = Cookies.get("accessToken");

  const { user } = useContext(UserContext);

  const { data: organizations, isPending: isOrganizationsPending } =
    useOrganizations(accessToken, user?.id);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-emerald-700 animate-spin" />
      </div>
    );
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col ">
        <span className="text-xs font-bold text-center pb-2">
          Choose Background
        </span>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {images.map((image) => (
            <div
              key={image.id}
              className={clsx(
                "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                isPending && "opacity-50 hover:opacity-50 cursor-auto"
              )}
              onClick={() => {
                if (isPending) return;
                setSelectedImageId(image.id);
              }}
            >
              <input
                type="radio"
                id="image"
                name="image"
                onChange={() => setSelectedImageId(image.id)}
                className="hidden"
                checked={selectedImageId === image.id}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <img
                src={image.urls.thumb}
                alt="Unsplash image"
                className="object-cover h-16 w-full rounded-sm"
              />
              {selectedImageId === image.id && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <Link
                to={image.links.html}
                target="_blank"
                className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              >
                {image.user.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs pt-2 font-bold" htmlFor="board-title">
          Board title
        </label>
        <CardInput
          setValue={setCurrentBoardInput}
          value={currentBoardInput}
          id="board-title"
          name="title"
        />
        <label className="text-xs pt-2 font-bold" htmlFor="board-title">
          Organization{" "}
          <span className="text-red-600">
            (if no organization, leave empty)
          </span>
        </label>
        <ul className="text-xs flex flex-wrap h-14 p-1 gap-2">
          <li
            onClick={() => {
              setSelectedOrganizationId("");
            }}
            className="text-lg w-12 h-12 inline-flex items-center justify-center rounded-md bg-emerald-500 opacity-40 transition-all hover:bg-emerald-700 cursor-pointer hover:text-white ease-in-out duration-300 font-bold tracking-tight uppercase"
          >
            <FontAwesomeIcon icon={faBan} />
          </li>
          {organizations?.map((org) => (
            <li
              onClick={() => setSelectedOrganizationId(org.id)}
              className="text-lg relative w-12 h-12 inline-flex items-center justify-center rounded-md bg-emerald-500 transition-all hover:bg-emerald-700 cursor-pointer hover:text-white ease-in-out duration-300 font-bold tracking-tight uppercase"
            >
              {org.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
              {selectedOrganizationId === org.id && (
                <div className="absolute inset-0 flex items-end justify-start border-2 opacity-70 bg-black/50 border-black rounded-md" />
              )}
            </li>
          ))}
        </ul>
        <button
          disabled={isPending}
          className="bg-black text-white font-bold text-sm w-full text-center py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
