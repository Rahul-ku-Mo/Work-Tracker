import React from "react";

const CardInput = ({ setValue, value, id, name, inputRef }) => {
  return (
    <input
      ref={inputRef}
      id={id}
      name={name}
      value={value}
      placeholder="Good to go..."
      className="flex w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 outline-none
          focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          invalid:border-pink-500 invalid:text-pink-600
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      type="text"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CardInput;
