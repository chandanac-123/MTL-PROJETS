import React from 'react'

const CancelButton = ({ label,onClick}) => {
    return (
        <div className='flex gap-4 items-center justify-end w-56 h-10' >
            <button className='bg-button-secondary text-primary px-4 py-2 w-56 h-10 rounded-lg flex items-center gap-2'onClick={onClick} >
                <p className='whitespace-nowrap'>
                    {label}
                </p>
            </button>
        </div>
    )
}

export default CancelButton