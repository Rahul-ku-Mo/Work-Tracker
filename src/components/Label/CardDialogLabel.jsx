import { useState } from "react";

import { DEFAULT_LABEL } from "../../constant";

const CardDialogLabel = ({ labelGroup }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="flex gap-1 w-full font-semibold text-sm leading-8 flex-wrap">
      {(labelGroup?.length > 0 ? labelGroup : [DEFAULT_LABEL]).map(
        (item, index) => {
          return (
            <div
              key={item.label}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`text-center h-8 min-w-12 rounded-md px-3 ${
                item.color
              } ${
                hoveredItem === index ? item.hoverColor : item.color
              }flex-1 text-white`}
            >
              {item.label}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CardDialogLabel;
