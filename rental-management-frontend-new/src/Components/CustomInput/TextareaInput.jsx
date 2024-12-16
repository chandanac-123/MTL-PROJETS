import React from 'react'

const TextareaInput = ({ placeholder, className, type, name, value, handleChange, label, touched, errors,disabled=false }) => {
    return (
        <div className='w-full mb-8'>
            <textarea
                placeholder={placeholder}
                className={`rounded-lg p-2 w-full border border-color-gray focus:outline-none ${className}`}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                autoComplete='off'
                rows={3}
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

export default TextareaInput