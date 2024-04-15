const FormInput = ({
  formStateValue,
  handleChange,
  type,
  id,
  htmlFor,
  value,
  readOnly,
  placeholder,
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
        className="peer px-3 py-2 mt-2 rounded-md peer w-full border text-sm border-slate-300 bg-transparent focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:placeholder-gray-400 placeholder-transparent"
      />
      <label
        className={`peer-focus:text-xs text-sm peer-focus:top-0 transition-all ease-linear tracking-tight peer-focus:text-emerald-500 text-zinc-600  font-bold peer-focus:bg-white absolute z-10 left-2 ${
          formStateValue
            ? "top-0 text-xs bg-white placeholder:text-transparent"
            : "top-4 "
        }`}
        htmlFor={htmlFor}
      >
        {value}
      </label>
    </div>
  );
};

export default FormInput;
