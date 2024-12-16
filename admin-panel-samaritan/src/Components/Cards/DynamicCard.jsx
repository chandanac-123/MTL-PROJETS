import { indianNumFormat } from '../../Utiles/Helper';

const DynamicCard = ({ icon, count, text, colors, onClick = false }) => {
  return (
    <button onClick={onClick} className={onClick ? `` : `cursor-default`}>
      <div className={`flex w-full h-44 border rounded-xl border-t-red border-l-red border-r-red bg-cream border-b-8`} style={{ borderBottomColor: colors }}>
        <div className="p-4 ml-4 justify-center flex flex-col">
          <img loading="lazy" src={icon} alt="" className="w-10 mb-4" />
          <span className="font-semibold font-inter text-left text-2xl text-card_text whitespace-nowrap ">{text == "Donations Made" ? <p>₹ {indianNumFormat(count)}</p> : indianNumFormat(count)}</span>
          <p className="text-text_grey font-semibold text-sm text-left">{text}</p>
        </div>
      </div>
    </button>
  );
};

export default DynamicCard;
