import { useState } from 'react';
import eye_icon from '../../assets/eye.svg';
import slash_eye from '../../assets/eye-slash.svg';

const PasswordInput = ({ name, placeholder, className, label, touched, errors, value, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-8 relative">
      <label className="text-text_black font-bold text-sm mb-0">{label}</label>
      <div className="relative">
        <input placeholder={placeholder} className={`rounded-lg p-2 w-full border border-color-gray focus:outline-none ${className}`} type={showPassword ? 'text' : 'password'} name={name} value={value} onChange={handleChange} autoComplete="off" />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
          <img loading="lazy" src={!showPassword ? slash_eye : eye_icon} alt="" />
        </span>
      </div>
      {touched && errors && (
        <div className="text-rose-600 text-xs mt-1">
          <span role="alert">{errors}</span>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
