const FormInput = ({
  formStateValue,
  handleChange,
  type,
  id,
  htmlFor,
  value,
  readOnly,
  placeholder,
  description,
}) => {
  return (
    <div className="flex flex-col relative grow">
      <input
        readOnly={readOnly}
        type={type}
        id={id}
        value={formStateValue || ""}
        placeholder={placeholder}
        onChange={handleChange(id)}
        className="peer px-3 py-2 mt-2 rounded-md peer w-full border text-sm dark:border-zinc-200 border-zinc-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:placeholder-zinc-400 placeholder-transparent"
      />
      <label
        className={`peer-focus:text-xs text-sm peer-focus:top-0 transition-all ease-linear px-0.5 peer-focus:text-emerald-500 dark:text-zinc-200 text-zinc-600  font-bold dark:peer-focus:bg-zinc-900 peer-focus:bg-zinc-200 absolute z-10 left-2 ${
          formStateValue
            ? "top-0 text-xs dark:bg-zinc-900 bg-zinc-200 dark:text-zinc-200 placeholder:text-transparent"
            : "top-4 "
        }`}
        htmlFor={htmlFor}
      >
        {value}
      </label>
      {description !== "" && (
        <span className="text-[0.8rem] dark:text-zinc-100 text-zinc-800 font-regular opacity-80 pt-1">
          {description}
        </span>
      )}
    </div>
  );
};

export default FormInput;
