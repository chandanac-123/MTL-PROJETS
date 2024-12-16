'use client'
import React from 'react'
import appstore from '@public/icons/appstore.svg'
import playstore from '@public/icons/playstore.svg'
import mainlogo from '@public/icons/logo.svg'
import Image from 'next/image'

export default function SharePage() {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex sm:w-[900px] w-[300px]  sm:h-[400px] h-[500px]  outline outline-1 outline-outline_grey rounded-xl ">
                <div className="flex flex-col gap-2 justify-center items-center w-full">
                    <div className="flex w-full justify-center items-center">
                        <Image src={mainlogo} alt="" />
                    </div>
                    <div className='flex break-words flex-wrap justify-center text-center gap-1.5 py-4 px-12'>
                        <p className='text-xl font-trirong'>“Unlock Your</p><p className='text-xl font-trirong font-bold'>Natural Beauty with ECHO”</p>
                    </div>
                    <div className="w-full sm:flex gap-2 justify-center items-center">
                        <div className='flex justify-center items-center'>
                            <button><Image src={appstore} alt="" className='sm:w-full w-[164px]' /></button>
                        </div>
                        <div className='flex justify-center items-center py-2'>
                            <button><Image src={playstore} alt="" className='sm:w-full w-[164px]' /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
