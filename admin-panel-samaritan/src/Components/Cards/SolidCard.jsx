import { indianNumFormat } from "../../Utiles/Helper";

const SolidCard = ({ text, count, colors }) => {
  return (
    <div className="flex flex-col w-full h-28 rounded-xl" style={{ background: colors }}>
      <div className="p-4 ml-4 mt-4 justify-center flex flex-col">
        <div className="font-semibold font-inter text-3xl text-cream">{text == 'Donation made' ? ` ₹ ${indianNumFormat(count)}` : indianNumFormat(count)}</div>
        <p className="font-semibold text-sm font-inter text-cream">{text}</p>
      </div>
    </div>
  );
};

export default SolidCard;
