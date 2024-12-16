const CancelButton = ({ onClick, type, label = false }) => {
  return (
    <button type={type} onClick={onClick} className="w-full mb-8 bg-btn_grey font-semibold rounded-md h-10 flex items-center justify-center text-text_grey">
      {label ? label : 'Cancel'}
    </button>
  );
};

export default CancelButton;
