import React from "react";
import clsx from "clsx";

import { DEFAULT_LABEL } from "../../constant";

const CardLabelGroup = ({
  labelGroup,
  activeLabelGroups,
  setActiveLabelGroups,
}) => {
  const activeClassDiv =
    activeLabelGroups === true
      ? "text-white rounded-md text-xs text-center text-ellipsis max-w-12 min-w-8 px-2 h-5 transition-all"
      : "rounded-lg h-3 py-1 px-2 text-xs min-w-[40px] max-w-[40px] transition-all inline-block ";

  console.log(labelGroup);

  return (
    <div className="flex gap-1 flex-1 flex-wrap">
      {labelGroup?.length > 0 ? (
        labelGroup.map((item) => (
          <div
            key={item.label}
            className={clsx(item.color, activeClassDiv)}
            onClick={() => setActiveLabelGroups((prev) => !prev)}
          >
            <span className="font-bold">
              {activeLabelGroups ? item.label : ""}
            </span>
          </div>
        ))
      ) : (
        <div
          className={clsx(DEFAULT_LABEL.color, activeClassDiv)}
          onClick={() => setActiveLabelGroups((prev) => !prev)}
        >
          <span className="font-bold">
            {activeLabelGroups ? DEFAULT_LABEL.label : ""}
          </span>
        </div>
      )}
    </div>
  );
};
export default CardLabelGroup;
