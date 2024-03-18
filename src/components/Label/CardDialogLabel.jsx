import { useState } from "react";

import { DEFAULT_LABEL } from "../../constant";
import { useLabels } from "../../hooks/useQueries";
import Cookies from "js-cookie";

const CardDialogLabel = ({ cardId }) => {
  const accessToken = Cookies.get("accessToken");
  const [hoveredItem, setHoveredItem] = useState(null);

  const { data: labelGroup } = useLabels(accessToken, cardId);

  return (
    <div className="flex gap-1 w-full font-semibold text-sm leading-8 flex-wrap">
      {(labelGroup?.length > 0 ? labelGroup : [DEFAULT_LABEL]).map(
        (item, index) => {
          return (
            <div
              key={item.id + '-' + index}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`text-center h-8 min-w-12 rounded-md px-3 ${
                item.color
              } ${
                hoveredItem === index ? item.color : item.color
              }flex-1 text-white`}
            >
              {item.name}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CardDialogLabel;
