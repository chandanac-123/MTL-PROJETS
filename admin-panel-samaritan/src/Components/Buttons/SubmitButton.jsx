const SubmitButton = ({ label, onClick, icon, className, type, loading }) => {
  return (
    <button disabled={loading} className={`w-full mb-8 h-10 justify-center bg-green text-white px-6 py-2 font-semibold rounded-lg flex items-center gap-2 ${className}`} type={type} onClick={onClick}>
      <p className="whitespace-nowrap font-semibold text-sm font-inter">{label}</p>
      <img loading="lazy" src={icon} alt="" />
    </button>
  );
};

export default SubmitButton;
