const OutlineCard = ({ image, count, label }) => {
  return (
    <div className="outline-dotted outline-2 outline-outline_grey w-28 h-15 p-1">
      <div className="flex gap-2 pl-1">
        <img loading="lazy" src={image} alt="" />
        <p className="text-text_grey font-medium">{count}</p>
      </div>
      <p className="font-semibold text-xs text-text_grey font-inter pl-1">{label}</p>
    </div>
  );
};

export default OutlineCard;
