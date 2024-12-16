import React from 'react';
import arrow from '../../assets/eye.svg';

const IconInput = ({ name, placeholder, className, type, icons, label, touched, errors, value, handleChange }) => {
  return (
    <div className="w-full mb-8 relative">
      <label className="text-text_black font-bold text-sm mb-0">{label}</label>
      <div className="absolute top-1 right-0 flex items-center pl-0 pointer-events-none">
        <img loading="lazy" src={arrow} alt="" className="w-8" />
      </div>
      <input placeholder={placeholder} className={`rounded-lg p-2 w-full border border-color-gray focus:outline-none ${className}`} type={type} name={name} value={value} onChange={handleChange} autoComplete="off"></input>
      {touched && errors && (
        <div className="text-rose-600 text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default IconInput;
