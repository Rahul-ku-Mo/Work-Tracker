import { Check, Loader2 } from "lucide-react";
import clsx from "clsx";

import LabelInput from "../shared/CardInput";
import { DEFAULT_COLORS } from "../../constant";
import useLabelForm from "../../hooks/useLabelForm";

const LabelForm = ({ cardId }) => {
  //   const {
  //     isLoading,
  //     isPending,
  //     images,
  //     selectedImageId,
  //     setCurrentBoardInput,
  //     currentBoardInput,
  //     setSelectedImageId,
  //     handleSubmit,
  //   } = useLabelForm(count);

  const {
    setCurrentLabelInput,
    currentLabelInput,
    selectedColorId,
    setSelectedColorId,
    handleSubmit,
  } = useLabelForm(cardId);

  //   if (isLoading) {
  //     return (
  //       <div className="p-6 flex items-center justify-center">
  //         <Loader2 className="h-6 w-6 text-emerald-700 animate-spin" />
  //       </div>
  //     );
  //   }

  return (
    <form
      className="flex flex-col bg-zinc-200 p-2 rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col ">
        <span className="text-xs font-bold text-center pb-2 text-black">
          Create Labels
        </span>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {DEFAULT_COLORS.map((colorItem) => (
            <div
              key={colorItem.value}
              className={clsx(
                "cursor-pointer relative aspect-video group hover:opacity-75 transition",
                colorItem.color
              )}
              onClick={() => {
                setSelectedColorId(colorItem.color);
              }}
            >
              <input
                type="radio"
                id="color"
                name="color"
                onChange={() => setSelectedColorId(colorItem.color)}
                className="hidden"
                checked={selectedColorId === colorItem.color}
                value={colorItem.color}
              />
              {selectedColorId === colorItem.color && (
                <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50">
                {colorItem.value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-black">
        <label
          className="text-xs pt-2 font-bold text-black"
          htmlFor="label-title"
        >
          Custom Label
        </label>
        <LabelInput
          setValue={setCurrentLabelInput}
          value={currentLabelInput}
          id="label-title"
          name="label"
        />

        <button
          type="submit"
          className="bg-black
          hover:bg-black/80  transition-all ease-in-out
          text-white font-bold text-sm w-full text-center py-2 rounded-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default LabelForm;
