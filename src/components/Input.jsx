const Input = ({
  type = "text",
  value,
  placeholder = "",
  icon: Icon,
  inputClassName = "",
  containerClassName = "",
}) => {
  return (
    <div
      className={`relative w-full group border-2 overflow-hidden ${containerClassName} `}
    >
      <input
        type={type}
        value={value}
        className={`pl-12 pr-4 py-2 outline-none w-full focus:outline-none  ${inputClassName}`}
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
        {Icon && <Icon className="h-5 w-5 text-primary" />}{" "}
        {/* Icon bileşenini kullanıyoruz */}
      </div>
    </div>
  );
};

export default Input;
