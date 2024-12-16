import { Breadcrumb } from 'antd';
import noti_icon from '../../assets/notification.svg';
import { routes } from '../../Routes/Routes';
import { useLocation } from 'react-router-dom';
import NotificationLayout from '../../Common/NotificationLayout';
import { useState } from 'react';

const MasterHeader = ({ profileDate }) => {
  const pathName = useLocation().pathname;
  const [notification, setNotification] = useState(false);

  const breadcrumbhead = () => {
    const filteredRouteData = routes
      .map((route) => {
        if (route.subMenu) {
          return route.subMenu.map((e) => e);
        } else {
          return route;
        }
      })
      .flat(2)
      .filter((e) => e !== undefined);
    let dataHead;
    let breadCurmbs;
    for (let x of filteredRouteData) {
      if (pathName === (x.path || x.path + '/')) {
        dataHead = x.path === '/dashboard' ? `Hello, ${profileDate?.profile?.full_name}` : x.label;
        breadCurmbs = x.breadCrumbs;
        break;
      } else if (pathName.split('/').slice(1, -1).join('/') === (x.path.split('/').slice(0, -1).join('/') || x.path.split('/').slice(0, -1).join('/') + '/')) {
        dataHead = x.path === '/dashboard' ? `Hello, ${profileDate?.profile?.full_name}` : x.label;
        breadCurmbs = x.breadCrumbs;
      }
    }

    return { dataHead, breadCurmbs };
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold font-merri_weather text-text_black">{breadcrumbhead().dataHead}</h2>
          <Breadcrumb items={breadcrumbhead().breadCurmbs} />
        </div>
        {/* <div className="hidden mobile:flex gap-2 justify-between">
          <button onClick={() => setNotification(!notification)}>
            <div className="">
              <img loading="lazy" src={noti_icon} alt="" />
            </div>
          </button>
        </div> */}
      </div>
      {/* <NotificationLayout notification={notification} setNotification={setNotification} /> */}
    </>
  );
};

export default MasterHeader;
