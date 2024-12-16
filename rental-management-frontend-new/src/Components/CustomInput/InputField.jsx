import React from 'react'


const InputField = ({ name, placeholder, className, type, label, touched, errors, value, handleChange, icons ,step=false ,disabled=false}) => {

    return (
        <div className='w-full mb-8 relative'>
            <label className='text-dark font-bold text-sm mb-0'>{label}</label>

            {icons && <div className="absolute top-0 left-0 flex items-center pl-0 pointer-events-none">
                <img src={icons} alt="" className='w-8'  />
            </div>}

            <input
                placeholder={placeholder}
                className={`rounded-lg p-2 w-full border border-color-gray focus:outline-none ${className}`}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                autoComplete='off'
                step={step}
                disabled={disabled}
            />
            {touched && errors && (
                <div className='text-color-orange text-xs mt-1'>
                    <span role='alert'>{errors}</span>
                </div>
            )}
        </div>
    )
}

export default InputField