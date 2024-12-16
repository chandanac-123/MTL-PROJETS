const Input = ({ name, placeholder, className, type, label, icons, touched, errors, value, handleChange }) => {
  return (
    <div className="w-full mb-4 relative">
      <label className="text-text_black font-bold text-sm font-inter mb-0">{label}</label>
      {icons && (
        <div className="w-10 absolute top-0.5 right-0 h-9 flex justify-center items-center pointer-events-none bg-bg_white outline outline-1 rounded-r-lg outline-outline_grey ">
          <img loading="lazy" src={icons} alt="" className="absolute " />
        </div>
      )}
      <input placeholder={placeholder} className={`rounded-lg p-2 w-full border border-color-gray focus:outline-none h-10 ${className}`} type={type} name={name} value={value} onChange={handleChange} autoComplete="off"></input>
      {touched && errors && (
        <div className="text-badge-red text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
