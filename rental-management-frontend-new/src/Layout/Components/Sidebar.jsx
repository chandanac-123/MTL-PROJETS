import React, { useState } from 'react'
import RentEase from '../../Static/Images/RentEase..svg'
import MenuCard from './MenuCard'
import SettingIcon from "../../Static/Images/setting.png"
import SubmenuIncome from './Submenu'
import leftclose from '../../Static/Images/duble-left.svg'
import logo from '../../Static/Images/logo-dark.svg'
import rightclose from '../../Static/Images/duble-right.svg'
import subhead from '../../Static/Images/RE.svg'
import PopoverSetting from './PopoverSetting'
import { routes } from '../../Routes/Routes'
import { useLocation } from 'react-router-dom'
import Profile from '../../Static/Images/profile-pic.png';
import favicon from '../../Static/Images/favicon.svg';
import { useUserProfileGetQuery } from '../../ApiQuery/UserManagement/UserQuery'

const Sidebar = ({ open, handleSetOpen }) => {
    const { data, isPending } = useUserProfileGetQuery()
    const [profile, setProfile] = useState(false)
    const pathName = useLocation().pathname

    return (
        <div className={` fixed hidden mobile:flex flex-col justify-between overflow-auto ${open ? 'w-[90px]' : 'w-[300px]'}  h-[95vh] bg-color-white rounded-3xl p-8`}>

            <div className={`${open ? 'hidden' : 'flex'} w-full justify-between gap-6`}>
                <img alt='' src={logo} className='w-36 ml-10' />
                <button onClick={() => handleSetOpen(!open)}><img src={leftclose} /></button>
            </div>
            <div className={`${open ? 'flex' : 'hidden'} w-full flex-col justify-between gap-6`}>
                <img alt='' src={favicon} className='w-32' />
                <button onClick={() => handleSetOpen(!open)} ><img src={rightclose} /></button>
            </div>

            <div className='flex flex-col gap-5'>
                {routes.map((item, index) => {
                    if (item.menubar) {
                        if (item.subMenu) {
                            return (
                                <SubmenuIncome key={index} hideText={!open} open={open} menues={item?.subMenu} image={item.icon}
                                    imgActive={item.iconActive} title={item.title} pathName={pathName} />
                            )
                        }
                        else {
                            return (
                                <MenuCard key={index} hideText={!open} image={pathName.startsWith('/' + item?.path) ? item.iconActive : item.icon}
                                    title={item.title} path={item.path} pathName={pathName} tooltip={item.tooltip} />

                            )
                        }
                    }

                })}


            </div>

            <div className='flex flex-wrap gap-4 items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10' alt='' src={data?.profile_photo || Profile} />
                    <div className={`${open ? 'hidden' : 'block'} `}>
                        <h2 className='text-sm font-bold'>{data?.full_name}</h2>
                        <p className='text-xs text-secondary'>{data?.user_group}</p>
                    </div>
                </div>
                <PopoverSetting>
                    <button onClick={() => setProfile(!profile)} ><img src={SettingIcon} /></button>
                </PopoverSetting>
            </div>
        </div>
    )
}

export default Sidebar

