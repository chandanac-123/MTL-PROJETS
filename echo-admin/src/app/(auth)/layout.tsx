import React from 'react'

export default function layout({ children }: any) {
  return (
    <div className='flex flex-col bg-bg_primary w-full min-h-screen justify-center items-center'>
        {children}
    </div>
  )
}

