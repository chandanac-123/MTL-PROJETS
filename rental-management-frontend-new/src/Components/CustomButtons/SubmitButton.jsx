import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const SubmitButton = ({ onClick, label, className = false, loading=false }) => {
    return (
        <div className='flex gap-4 items-center justify-end w-full' >
            <button disabled={loading} className={className ? className : `w-full mb-8 flex gap-1 bg-primary rounded-md h-10 px-6 py-2 text-color-white whitespace-nowrap`} onClick={onClick} >
                    {label}
                {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : ''}
            </button>
        </div>
    )
}

export default SubmitButton