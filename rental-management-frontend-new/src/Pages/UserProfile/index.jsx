import React from 'react'
import BasicDetails from './BasicDetails'
import ChangePassword from './ChangePasswod'

const UserProfile = () => {
    return (
        <div className='gap-8 flex  flex-col mobile:flex-row pt-20'>
            <BasicDetails />
            <ChangePassword />
        </div>
    )
}

export default UserProfile