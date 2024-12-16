import React,{useState} from "react";
import notification_icon from "../../Static/Images/notification.svg";
import menu from "../../Static/Images/humberger.svg";
import RentEase from "../../Static/Images/RentEase..svg";
import DrawerComponent from "./Drawer";
import NotificationLayout from "../../Common/NotificationLayout";
import { useNotificationListQuery } from "../../ApiQuery/Notification/NotificationQuery";
import logo from '../../Static/Images/logo-dark.svg'

const MobileHeader = () => {
  
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false)

  const { data, isFetching, refetch } = useNotificationListQuery({
    enabled: true,
  });

  const handleClick = () => {
    setNotification(!notification)
    refetch();
  };

  return (
    <div className="flex items-center mobile:hidden justify-between w-full gap-2 mb-4 ">
      <div className="flex gap-2">
        <button onClick={()=>setOpen(true)}>
          <img src={menu} alt="" />
        </button>
        {/* <img alt="" src={RentEase} className="w-28" /> */}
        <img alt="" src={logo} className="w-28" />
      </div>

      <div className="gap-2 flex">
        <button onClick={handleClick}>
          <div className="border-[1px] p-1 rounded-md border-color-gray bg-color-white">
            <img src={notification_icon} alt="" />
          </div>
        </button>
      </div>
      <DrawerComponent open={open} setOpen={setOpen}/>
      <NotificationLayout notification={notification} setNotification={setNotification} data={data}/>
    </div>
  );
};

export default MobileHeader;
