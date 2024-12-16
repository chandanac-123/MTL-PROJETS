import React from 'react'

const PageLayout = ({ children }) => {
    return (
        <div className="flex flex-col bg-color-white rounded-2xl mt-8">
            <div className="p-5 h-full">
                {children}
            </div>
        </div>
    )
}

export default PageLayout