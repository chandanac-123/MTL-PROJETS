import React from 'react';

const ColorOutlineCard = ({ className, image, label }) => {
  return (
    <div className={`outline-dotted outline-1 outline-outline_grey w-auto rounded-lg h-10 p-2 ${className}`}>
      <div className="flex gap-2 justify-center items-center">
        <img loading="lazy" src={image} alt="" />
        <p className="font-semibold font-inter text-xs text-text_grey">{label}</p>
      </div>
    </div>
  );
};

export default ColorOutlineCard;
