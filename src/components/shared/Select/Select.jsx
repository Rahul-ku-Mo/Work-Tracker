import React from "react";
const Select = ({ listId, taskId, updateTaskColors, color }) => {
  return (
    <select
      className="cursor-pointer"
      onChange={(e) => {
        updateTaskColors(e.target.value, listId, taskId);
      }}
    >
      <option value="none" default>
        {color && `Colors....`}
      </option>
      <option value="#38E54D">Green</option>
      <option value="#2192FF">Blue</option>
      <option value="#FFA1CF">Pink</option>
      <option value="#FFD24C">Yellow</option>
      <option value="#F65A83">Dark Pink</option>
    </select>
  );
};

export default Select;
