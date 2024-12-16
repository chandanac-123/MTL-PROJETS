import React, { useEffect, useState } from 'react';
import { Divider, Popover } from 'antd';
import Profile from '../../Static/Images/profile-pic.png';
import './style.css';
import {  logoutApiCall } from '../../Static/Apis';
import { useNavigate } from 'react-router-dom';
import { SuccessToast } from '../../Utils/AlertMessages';
import { useUserProfileGetQuery } from '../../ApiQuery/UserManagement/UserQuery';

const PopoverSettingContent = ({ setPopoverOpen }) => {
    const navigate = useNavigate()
    const { data, isPending } = useUserProfileGetQuery()

    const [tokenErr,setTokenErr] = useState(false)
    const [token,setTOken] = useState( JSON.parse(localStorage.getItem('Token')))

    useEffect(()=>{
        if(tokenErr){
            logoutApiCall({ 'refresh_token': token.REFRESH_TOKEN }).then(res=>{
                localStorage.removeItem('Token')
                navigate('/')
                SuccessToast({ message: "User Logout successfully" })
            }).catch(err=>{
                console.log(err);
            })
            
        }
    },[tokenErr])

    const logout = () => {
        let token = JSON.parse(localStorage.getItem('Token'))
        logoutApiCall({ 'refresh_token': token.REFRESH_TOKEN }).then(res => {
                localStorage.removeItem('Token')
                localStorage.removeItem('firebase-token')
                localStorage.removeItem('user')
                navigate('/')
                SuccessToast({ message: "User Logout successfully" })
                window.location.reload()
        }).catch(err => {
            if(err?.response?.data?.detail?.refresh_token?.[0] === "Invalid token"){
                    setTokenErr(true)
                    setTOken( JSON.parse(localStorage.getItem('Token')))
            }
        })
    };

    return (
        <div>
            <div className='flex gap-4 items-center w-56 p-2'>
                <img className='w-10 h-10' alt='' src={data?.profile_photo || Profile} />
                <div>
                    <h2 className='text-sm font-bold'>{data?.full_name}</h2>
                    <p className='text-xs text-secondary'>{data?.user_group}</p>
                </div>
            </div>
            <Divider />
            <div className='flex flex-col items-start pb-4 mt-4 gap-5 font-medium'>
                <button onClick={() => {
                    setPopoverOpen(false)
                    navigate('/user-profile')
                }}>Account Settings</button>
                <button onClick={() => logout()}>Sign Out</button>
            </div>
        </div>
    );
};

const PopoverSetting = ({ profile, children }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    return (
        <Popover onOpenChange={() => setPopoverOpen(!popoverOpen)} open={popoverOpen} placement="top" content={<PopoverSettingContent setPopoverOpen={setPopoverOpen} />} arrow={false} trigger='click'>
            {children}
        </Popover>
    );
};

export default PopoverSetting;
