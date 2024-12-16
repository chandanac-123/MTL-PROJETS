import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'


const DownloadButton = ({type, label, img, onClick ,loading}) => {
    return (
        <button type={type} className='bg-primary text-color-white px-6 py-2 h-10 min-w-1/6 rounded-lg flex items-center  gap-2 justify-center' onClick={onClick} >
            <p className='whitespace-nowrap font-medium'>
                {label}
            </p>
            <img src={img} alt="" />
            {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : ''}
        </button>
    )
}

export default DownloadButton