import React from 'react'
import AuthHeader from '../header'
import ResetSuccessForm from '@/screens/Auth/reset-success'

export default function page() {
    return (
        <div className='flex flex-col w-full px-20 items-center'>
            <AuthHeader />
            <ResetSuccessForm />
        </div>
    )
}
