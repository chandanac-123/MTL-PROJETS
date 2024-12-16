import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'


const ContinueButton = ({ type, label, img, onClick, loading, disabled=false, className = false }) => {
    return (
        <button disabled={disabled || loading} type={type} className={className ? className : `bg-primary text-color-white px-6 py-2 min-w-1/6 rounded-lg flex items-center  gap-2 justify-center`} onClick={onClick} >
            <p className='whitespace-nowrap font-medium'>
                {label}
            </p>
            <img src={img} alt="" />
            {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : ''}
        </button>
    )
}

export default ContinueButton