import MobileDrawer from './MobileDrawer';
import menu_icon from '../../assets/humberger.svg';
import { useState } from 'react';
import noti_icon from '../../assets/notification.svg';
import samaritan from '../../assets/logo.svg';
import NotificationLayout from '../../Common/NotificationLayout';

const MobileHeader = ({ profileDate }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  return (
    <div className="flex items-center mobile:hidden justify-between w-full gap-2 mb-4 ">
      <div className="flex gap-2">
        <button onClick={() => setOpen(!open)}>
          <img loading="lazy" src={menu_icon} alt="" />
        </button>
      </div>

      <div className="gap-2 flex">
        {/* <button onClick={() => setNotification(!notification)}>
          <img loading="lazy" src={noti_icon} alt="" />
        </button> */}
        <img loading="lazy" alt="" src={samaritan} className="w-11" />
      </div>
      <MobileDrawer open={open} setOpen={setOpen} profileDate={profileDate} />
      {/* <NotificationLayout notification={notification} setNotification={setNotification} /> */}
    </div>
  );
};

export default MobileHeader;
