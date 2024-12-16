import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const AuthButton = ({ type, className = false, label, loading, onClick, disabled=false }) => {
    return (

        <button
            type={type}
            onClick={onClick}
            className={className ? className : `w-full mb-8 bg-primary rounded-md h-10 flex items-center justify-center text-color-white`}
            disabled={disabled || loading}
        >
            {loading ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : label}
        </button>
    )
}

export default AuthButton