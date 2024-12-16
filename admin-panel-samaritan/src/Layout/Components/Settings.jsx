import { Divider, Popover } from 'antd';
import profile from '../../assets/profile.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfileQuery } from '../../ApiQueries/Authentication/AuthQuerys';

const SettingsContent = ({ setPopoverOpen }) => {
  const { data, isFetching } = useUserProfileQuery();
  const navigate = useNavigate();

  const clearTokenOnClick = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <div className="flex gap-4 items-center w-56 p-2">
        <img loading="lazy" className="w-[48px] h-[47px] bg-bg_grey rounded-lg" alt="" src={data?.profile?.profile_pic || profile} />
        <div>
          <h2 className="text-base font-semibold text-text_black">{data?.profile?.full_name}</h2>
          <p className="text-sm text-text_grey font-medium">{data?.profile?.role}</p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col items-start pl-4 pb-4 mt-4 gap-5 font-medium">
        <button
          className="w-full justify-start flex text-text_grey font-semibold text-base font-inter"
          onClick={() => {
            setPopoverOpen(false);
            navigate('/user-profile');
          }}
        >
          Account Settings
        </button>
        <button className="w-full justify-start flex text-text_grey font-semibold text-base font-inter" onClick={() => clearTokenOnClick()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const Settings = ({ children }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  return (
    <Popover onOpenChange={() => setPopoverOpen(!popoverOpen)} open={popoverOpen} placement="topRight" content={<SettingsContent setPopoverOpen={setPopoverOpen} />} arrow={false} trigger="click">
      {children}
    </Popover>
  );
};

export default Settings;
