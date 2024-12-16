import React from 'react'
import toast from 'react-hot-toast'
import close from '@public/icons/close.svg'
import info from '@public/icons/info.svg'
import success from '@public/icons/success.svg'
import error from '@public/icons/warning.svg'
import Image from 'next/image';

interface ToastNotificationProps {
    className?: string;
    type: 'success' | 'error' | 'info';
    message: string;
    id: string;
    title: string | boolean;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ type, message, id, className, title = false }) => {
    const backgroundColor = {
        success: '#E1F9E6',
        error: '#FFE4E4',
        info: '#E5F2FF'
    }[type]

    const icons = {
        success: success,
        error: error,
        info: info
    }[type]

    const textColor = {
        success: ' #2B771E',
        error: "#E51C26",
        info: "#1B3F6D"
    }[type]

    return (
        <div className={`${className} max-w-md w-full shadow-lg rounded-xs pointer-events-auto flex justify-center mt-10`}
            style={{ backgroundColor }}>
            <div className="flex-1 w-0 p-4">
                <div className="flex  justify-center items-center">
                    <div className="flex-shrink-0 pt-0.5">
                        <Image
                            className="h-10 w-10 rounded-full"
                            src={icons}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1 ">
                        {title && <p className="text-sm font-semibold flex" style={{ color: textColor }}>{title}</p>}
                        <p className="text-sm font-medium flex" style={{ color: textColor }}>{message}</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button
                    onClick={() => toast.dismiss(id)}
                    className="w-full border-none rounded-none rounded-r-lg p-4 flex items-center justify-center"
                >
                    <Image src={close} alt="" className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default ToastNotification
