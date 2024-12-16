import Image from 'next/image'
import React from 'react'
import logo from '@public/icons/logo.svg'

export default function ExpiredLink() {

    return (
        <div className='flex flex-col justify-center items-center gap-1 min-h-100vh mt-5'>
            <Image src={logo} alt='' />
            <span className='text-lg w-1/2 text-center flex py-4 text-primary break-words whitespace-wrap'>This password reset link is no longer active. It may have expired or been used already. Please request a new link to reset your password.</span>
        </div>
    )
}
