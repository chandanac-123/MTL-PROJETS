import React from 'react'

const AddButton = ({ label, img ,onClick,className=false}) => {
    return (
        <div className='flex gap-4 items-center justify-end w-full' >
            <button className={className?className:`bg-button-secondary text-primary px-6 py-2 w-full rounded-lg flex items-center justify-center gap-2 `}onClick={onClick} >
                <img src={img} alt="" />
                <p className='whitespace-nowrap'>
                    {label}
                </p>
            </button>
        </div>
    )
}

export default AddButton