import { Drawer } from 'antd';
import Submenu from './Submenu';
import Menu from './Menu';
import Settings from './Settings';
import profilepic from '../../assets/profile.png';
import setting from '../../assets/setting.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../../Routes/Routes';
import samaritan from '../../assets/master-logo.svg';

const MobileDrawer = ({ open, setOpen, profileDate }) => {
  const [profile, setProfile] = useState(false);
  const pathName = useLocation().pathname;

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer placement="left" width={280} closable={false} onClose={onClose} open={open}>
        <div className="flex flex-col gap-4 justify-between h-full">
          <img loading="lazy" src={samaritan} alt="" className='w-40'/>
          <div className="flex flex-col gap-4">
            {routes.map((item, index) => {
              if (item?.menubar) {
                if (item?.subMenu) {
                  return <Submenu onClick={onClose} key={index} hideText={true} label={item.label} menues={item?.subMenu} image={item.icon} imgActive={item.iconActive} pathName={pathName} />;
                } else {
                  return <Menu postCount={profileDate?.n_pending_post} onClick={onClose} key={index} hideText={true} label={item?.label} path={item.path} pathName={pathName} image={pathName === item.path ? item.iconActive : item.icon} />;
                }
              }
            })}
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <img loading="lazy" className="w-10 h-10 rounded-full" alt="" src={profileDate?.profile?.profile_pic || profilepic} />
              <div className="block">
                <h2 className="text-base font-semibold text-text_black font-inter">{profileDate?.profile?.full_name}</h2>
                <p className="text-xs font-normal text-text_grey">{profileDate?.profile?.role}</p>
              </div>
            </div>
            <Settings>
              <button onClick={() => setProfile(!profile)}>
                <img src={setting} />
              </button>
            </Settings>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
