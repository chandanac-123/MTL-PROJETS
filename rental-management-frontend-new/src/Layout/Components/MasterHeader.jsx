import React, { useState } from 'react'
import notifications from '../../Static/Images/notification.svg'
import { routes } from '../../Routes/Routes';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import NotificationLayout from '../../Common/NotificationLayout';
import { useNotificationListQuery } from '../../ApiQuery/Notification/NotificationQuery';
import { getUser } from '../../Utils/utils';

const MasterHeader = () => {
  const { data, isFetching, refetch } = useNotificationListQuery({
    enabled: true,
  });

  const handleClick = () => {
    setNotification(!notification)
    refetch();
  };


  const [notification, setNotification] = useState(false)
  const pathName = useLocation().pathname

  const isPath = (path) => {
    return pathName?.split('/').slice(1, 3).join('/') === path?.split('/').slice(0, 2).join('/')
  }
  
  const heading = () => {
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
      if (pathName.split("/").join("/").slice(1) === (x.path || x.path + "/")) {
        dataHead = x.path === "dashboard" ? `Hello, ${getUser()}` : x.title;
        breadCurmbs = x.breadCrumbs;
        break;
      } else if (
        pathName.split("/").slice(1, -1).join("/") ===
        (x.path.split("/").slice(0, -1).join("/") ||
          x.path.split("/").slice(0, -1).join("/") + "/")
      ) {
        dataHead = x.path === "dashboard" ? `Hello, ${getUser()}` : x.title;
        breadCurmbs = x.breadCrumbs;
      }
    }

    return { dataHead, breadCurmbs };
  };

  return (
    <>
      <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
          <div>
            <h2 className='text-2xl font-bold'>{heading().dataHead}</h2>
            <Breadcrumb items={heading().breadCurmbs} />
          </div>
        </div>
        <div className='gap-2 justify-between hidden mobile:flex'>
          <button onClick={handleClick}><div className='border-[1px] p-1 rounded-md border-color-gray bg-color-white'><img src={notifications} alt='' /></div></button>
        </div>
      </div>
      {notification && <NotificationLayout notification={notification} setNotification={setNotification}  data={data}/>}
    </>
  )
}

export default MasterHeader