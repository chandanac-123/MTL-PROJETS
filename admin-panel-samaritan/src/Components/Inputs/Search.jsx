import React from 'react';
import search_icon from '../../assets/search.svg';

const Search = ({ onChange, placeholder }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <img loading="lazy" src={search_icon} />
      </div>
      <input placeholder={placeholder} type="text" onChange={onChange} className="bg-btn_grey font-inter text-sm font-semibold text-text_grey  outline-none border-none h-10 rounded-lg focus:border-color-white active:border-color-white w-full pl-10 p-2.5" />
    </div>
  );
};

export default Search;
