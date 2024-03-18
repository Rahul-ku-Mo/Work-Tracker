import { useContext } from "react";
import clsx from "clsx";

import { DEFAULT_LABEL } from "../../constant";
import { CardContext } from "../../Context/CardContext";

const CardLabelGroup = ({ labelGroup }) => {
  const { activeLabelGroups, setActiveLabelGroups } = useContext(CardContext);
  const activeClassDiv = clsx(
    activeLabelGroups === true
      ? "text-white rounded-md text-xs text-center text-ellipsis max-w-12 min-w-8 px-2 py-0.5 transition-all ease-in-out"
      : "rounded-lg h-3 py-1 px-2 text-xs min-w-[40px] max-w-[40px] transition-all inline-block transtion-none"
  );

  return (
    <div className="flex gap-1 flex-1 flex-wrap">
      {labelGroup?.length > 0 ? (
        labelGroup.map((item, index) => (
          <div
            key={item.id + "--" + index}
            className={clsx(item.color, activeClassDiv)}
            onClick={() => setActiveLabelGroups((prev) => !prev)}
          >
            <span
              className={clsx(
                "font-bold",
                activeLabelGroups ? "opacity-100" : "opacity-0"
              )}
            >
              {activeLabelGroups ? item.name : ""}
            </span>
          </div>
        ))
      ) : (
        <div
          className={clsx(DEFAULT_LABEL.color, activeClassDiv)}
          onClick={() => setActiveLabelGroups((prev) => !prev)}
        >
          <span
            className={clsx(
              "font-bold",
              activeLabelGroups ? "opacity-100" : "opacity-0"
            )}
          >
            {activeLabelGroups ? DEFAULT_LABEL.name : ""}
          </span>
        </div>
      )}
    </div>
  );
};
export default CardLabelGroup;
