import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';
import MasterHeader from './Components/MasterHeader';
import MobileHeader from './Components/MobileHeader';
import { useUserProfileQuery } from '../ApiQueries/Authentication/AuthQuerys';

const MasterLayout = () => {
  const { data, isFetching } = useUserProfileQuery();
  const [open, setOpen] = useState(false);

  const handleSetOpen = (val) => {
    setOpen(val);
  };

  return (
    <div className="p-2 md:p-6 bg-white min-h-screen">
      <div className="flex h-full">
        <Sidebar open={open} handleSetOpen={handleSetOpen} profileDate={data} />
        <div className={`  p-4 ${open ? 'mobile:ml-[140px] mobile:w-[calc(100vw-175px)] w-full' : ' mobile:ml-[320px] mobile:w-[calc(100vw-350px)] w-full'}`}>
          <MobileHeader profileDate={data} />
          <MasterHeader profileDate={data} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
