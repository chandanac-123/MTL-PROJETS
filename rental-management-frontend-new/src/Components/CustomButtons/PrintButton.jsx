import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'


const PrintButton = ({type, label, img, onClick ,loading,disabled}) => {
    return (
        <button disabled={disabled} type={type} className='bg-[#EEF6FF] text-[#3E97FF] px-4 py-2 min-w-1/6 rounded-lg flex items-center  gap-2 justify-center' onClick={onClick} >
            <p className='whitespace-nowrap font-medium'>
                {label}
            </p>
            <img src={img} alt="" />
            {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : ''}
        </button>
    )
}

export default PrintButton