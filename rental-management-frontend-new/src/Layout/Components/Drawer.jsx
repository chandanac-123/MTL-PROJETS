import React,{useState} from "react";
import { Drawer } from "antd";
import RentEase from "../../Static/Images/RentEase..svg";
import MenuCard from "./MenuCard";
import { routes } from '../../Routes/Routes'
import SubmenuIncome from './Submenu'
import { useLocation } from 'react-router-dom'
import PopoverSetting from './PopoverSetting'
import Profile from '../../Static/Images/profile-pic.png'
import SettingIcon from "../../Static/Images/setting.png"
import { useUserProfileGetQuery } from "../../ApiQuery/UserManagement/UserQuery";
import logo from '../../Static/Images/logo-dark.svg'
import {v4} from 'uuid'

const DrawerComponent = (props) => {
  const { data, isPending } = useUserProfileGetQuery()

  const pathName = useLocation().pathname
  const [profile, setProfile] = useState(false)
  const userDetail = JSON.parse(localStorage.getItem('user'));

  const onClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Drawer
        placement="left"
        width={250}
        closable={false}
        onClose={onClose}
        open={props.open}
      >

        <div className="flex flex-col gap-7 justify-between h-full">
        {/* <img alt="" src={RentEase} className="w-28 " /> */}
        <img alt="" src={logo} className="w-28 ml-10" />
        <div className="flex flex-col gap-7">
           {routes.map((item) => {
                    if (item.menubar) {
                        if (item.subMenu) {
                            return (
                                <SubmenuIncome key={v4()} menues={item?.subMenu} image={item.icon}
                                    imgActive={item.iconActive} title={item.title} pathName={pathName}  />
                            )
                        }
                        else {
                            return (
                                <MenuCard key={v4()} hideText={true} image={pathName === '/' + item.path ? item.iconActive : item.icon}
                                    title={item.title} path={item.path} pathName={pathName} tooltip={item.tooltip} />

                            )
                        }
                    }

                })}
        </div>

        <div className='flex gap-4 items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <img className='w-10 h-10' alt='' src={data?.profile_photo ||Profile} />
                    <div>
                        <h2 className='text-xs font-bold'>{data?.full_name}</h2>
                        <p className='text-xs text-secondary'>{data?.user_type}</p>
                    </div>
                </div>
                <PopoverSetting>
                    <button onClick={() => setProfile(!profile)} ><img src={SettingIcon} /></button>
                </PopoverSetting>
            </div>
            </div>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
