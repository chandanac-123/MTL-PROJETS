import add_icon from '../../assets/add.svg';

const AddButton = ({ onClick, label }) => {
  return (
    <div className="flex gap-4 items-center justify-end w-full">
      <button className="bg-green text-white px-6 py-2.5 w-full rounded-lg flex items-center text-center justify-center gap-2" onClick={onClick}>
        <img loading="lazy" src={add_icon} alt="" />
        <p className="whitespace-nowrap text-sm font-inter font-semibold">{label}</p>
      </button>
    </div>
  );
};

export default AddButton;
