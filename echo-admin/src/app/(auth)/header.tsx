import Image from 'next/image'
import React from 'react'
import logo from '@public/icons/logo.svg'

export default function AuthHeader({ head, miniHead, mainHead, discription, userEmail }: any) {
    return (
        <div className='flex flex-col justify-center items-center gap-1 min-h-100vh mt-5'>
            <Image src={logo} alt='' />
            <span className='text-5xl'>{head}</span>
            <span className='text-2xl text-secondary'>{miniHead}</span>
            <span className='text-5xl font-bold text-primary text-center'>{mainHead}</span>
            {userEmail && <span className='text-md  text-secondarytext-center pb-6'>{userEmail}</span>}
            <span className='text-base text-text_label text-center whitespace-pre-line w-[475px] pb-3'>{discription}</span>
        </div>
    )
}
