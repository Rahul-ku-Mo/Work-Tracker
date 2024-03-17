import CardInput from "../shared/CardInput";

import { Check, Loader2 } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import useBoardForm from "../../hooks/useBoardForm";

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
  } = useBoardForm(count);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
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
