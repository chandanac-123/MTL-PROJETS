'use client'
import Image from 'next/image'
import React, { Fragment } from 'react'
import left_icon from "@public/icons/left.svg"

export default function AddEditHeader({ head, subhead, onClick, backwardIcon }: any) {
    return (
        <div className='flex-1'>
            <div className='flex gap-4 items-center'>
                {backwardIcon ? <button type='button' onClick={onClick}><Image src={left_icon} alt='' /></button> : <Fragment />}
                <label className='text-2xl font-light'>{head}</label>
            </div>
            <div className='flex mt-4'>
                <label className='text-lg font-medium '>{subhead}</label>
            </div>
        </div>
    )
}
