import { Modal } from 'antd';
import green from '../assets/green.svg';
import arrow from '../assets/arrow-blue.svg';
import { useNavigate } from 'react-router-dom';

const NotificationLayout = ({ notification, setNotification }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    setNotification(false);
  };

  const handleNavigate = () => {
    navigate('/notification');
    setNotification(false);
  };

  return (
    <Modal open={notification} footer={null} className="mobile:left-[30%]" onCancel={handleCancel}>
      <h1 className="text-card_text font-semibold text-lg">Notifications</h1>
      <div className="flex outline outline-1 rounded-lg outline-outline_grey mt-4 p-1">
        <img loading="lazy" src={green} alt="" />
        <div className="flex flex-col p-2 gap-1">
          <p>New User has been Added to Samaritan</p>
          <p className="text-noti_textgrey font-inter text-xs font-medium">2 min ago</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="flex mt-4" onClick={handleNavigate}>
          <div className="text-text-blue flex gap-2">
            View All Notifications
            <img loading="lazy" src={arrow} alt="" />
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default NotificationLayout;
