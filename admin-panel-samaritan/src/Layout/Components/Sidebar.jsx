import { routes } from '../../Routes/Routes';
import Menu from './Menu';
import Submenu from './Submenu';
import Settings from './Settings';
import profilepic from '../../assets/profile.png';
import masterlogo from '../../assets/master-logo.svg';
import minilogo from '../../assets/logo.svg';
import setting from '../../assets/setting.svg';
import leftarrow from '../../assets/duble-left.svg';
import rightarrow from '../../assets/duble-right.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ open, handleSetOpen, profileDate }) => {
  const [profile, setProfile] = useState(false);
  const pathName = useLocation().pathname;

  return (
    <div className={` fixed hidden mobile:flex flex-col border border-red justify-between transition-all  ${open ? 'w-[125px]' : 'w-[300px]'}  h-[95vh] bg-cream rounded-3xl p-6`}>
      <div className={`${open ? 'hidden' : 'flex'} mt-4 w-full justify-center gap-12`}>
        <img alt="" src={masterlogo} className='w-28'/>
        <button onClick={() => handleSetOpen(!open)}>
          <img alt="" src={leftarrow} className="w-[22px]"/>
        </button>
      </div>
      <div className={`${open ? 'flex' : 'hidden'} w-full flex-col justify-center items-center gap-3`}>
        <img alt="" src={minilogo} className="w-8"/>
        <button onClick={() => handleSetOpen(!open)}>
          <img alt="" src={rightarrow} className="w-[22px]" />{' '}
        </button>
      </div>

      <div className={`flex flex-col gap-4 ${open ? 'items-center' : 'items-start'} `}>
        {routes.map((item, index) => {
          if (item?.menubar) {
            if (item?.subMenu) {
              return <Submenu key={index} hideText={!open} label={item.label} open={open} menues={item?.subMenu} image={item.icon} imgActive={item.iconActive} pathName={pathName} />;
            } else {
              return <Menu postCount={profileDate?.n_pending_post} key={index} hideText={!open} label={item?.label} path={item.path} pathName={pathName} image={pathName.startsWith(item.path ) ? item.iconActive : item.icon} />;
            }
          }
        })}
      </div>
      <div className={`flex flex-wrap gap-4 ${open ? 'justify-center' : 'justify-between'}`}>
        <div className="flex gap-2 items-center ">
          <img className="w-10 h-10 bg-bg_grey rounded-full" alt="" src={profileDate?.profile?.profile_pic || profilepic} />
          <div className={`${open ? 'hidden' : 'block'} w-full`}>
            <h2 className="text-base font-semibold text-text_black font-inter w-full">{profileDate?.profile?.full_name}</h2>
            <p className="text-xs font-normal text-text_grey ">{profileDate?.profile?.role}</p>
          </div>
        </div>
        <Settings>
          <button onClick={() => setProfile(!profile)}>
            <img src={setting} />
          </button>
        </Settings>
      </div>
    </div>
  );
};

export default Sidebar;
