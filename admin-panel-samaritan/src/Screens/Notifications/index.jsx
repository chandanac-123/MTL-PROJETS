import { Divider } from 'antd';
import PageLayout from '../../Common/PageLayout';
import red from '../../assets/red.svg';

const Notification = () => {
  return (
    <>
      <PageLayout>
        <h2 className="text-text_black">01/02/2024</h2>
        <Divider />
        <div className="flex gap-3">
          <img loading="lazy" src={red} alt="" />
          <div className="flex flex-col">
            <p className="font-semibold">New Expense Added</p>
            <p className="text-text_grey">A new expense of 40.00 against Skyline villa was added by Mohammed Rasif</p>
            <p className="text-noti_textgrey font-inter text-xs font-medium">2 min ago</p>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Notification;
