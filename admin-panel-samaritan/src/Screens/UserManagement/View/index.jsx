import { Popover, Space, Spin, Tabs } from 'antd';
import Achievements from './Achievements';
import Posts from './Posts';
import KudosReceived from './KudosReceived';
import './style.css';
import user from '../../../assets/user-icon.svg';
import phone from '../../../assets/phone.svg';
import email from '../../../assets/mail.svg';
import follower from '../../../assets/follower.svg';
import following from '../../../assets/following.svg';
import post from '../../../assets/post.svg';
import action from '../../../assets/action.svg';
import OutlineCard from '../../../Components/Cards/OutlineCard';
import { useState } from 'react';
import reject_icon from '../../../assets/reject.svg';
import unblock_icon from '../../../assets/unblock.svg';
import { useUserAchievementQuery, useUserDetailQuery, useUserKudosQuery, useUserPostsQuery } from '../../../ApiQueries/UserManagement/UserQueries';
import { useParams } from 'react-router-dom';
import BlockUnblock from '../../../Common/BlockUnblock';

const UserDetails = () => {
  const params = useParams();
  const [block, setBlock] = useState(false);
  const [open, setOpen] = useState();
  const [unblock, setUnblock] = useState(false);
  const [activeKey, setActive] = useState(1);
  const { data: userDetails, isPending } = useUserDetailQuery(params?.id);
  const { data: achievmentsDetails } = useUserAchievementQuery(params?.id);
  const { data: postsDetails, refetch } = useUserPostsQuery({
    userId: params?.id
  });
  const { data: kudosDetails } = useUserKudosQuery(params?.id);

  const content = (
    <div className="flex flex-col w-20 items-start">
      <button
        onClick={() => {
          if (!userDetails?.data?.profile?.is_blocked) {
            setUnblock(false);
            setBlock(!block);
          } else {
            setBlock(false);
            setUnblock(!unblock);
          }
        }}
        className="w-full  hover:bg-light_green hover:text-green flex"
      >
        {!userDetails?.data?.profile?.is_blocked ? 'Block' : 'Unblock'}
      </button>
    </div>
  );

  const Items = [
    {
      key: 1,
      label: 'Achievements',
      children: <Achievements id={params?.id} data={achievmentsDetails?.data} activeKey={activeKey} />
    },
    {
      key: 2,
      label: 'Posts',
      children: <Posts data={postsDetails?.data} refetch={refetch} />
    },
    {
      key: 3,
      label: 'Kudos Received',
      children: <KudosReceived data={kudosDetails?.data} />
    }
  ];

  return (
    <Spin spinning={isPending}>
      <div className="flex flex-col bg-white mt-8 border-l  border-r border-t border-border_grey p-4 rounded-t-2xl">
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <img loading="lazy" src={userDetails?.data?.profile?.profile_pic} className="w-32 h-32 rounded-lg" />
            </div>
            <div className="flex flex-col pl-4 ">
              <div className="mobile:flex gap-4">
                <div className="font-semibold text-lg text-text_black font-inter">{userDetails?.data?.profile?.full_name}</div>
                <div className="flex flex-nowrap w-auto">
                  <div className="flex flex-wrap rounded-2xl pr-4 justify-center items-center outline outline-1 outline-badge-grey bg-btn_grey gap-1 font-semibold text-xs font-inter text-badge_text w-auto">
                    <img loading="lazy" src={userDetails?.data?.profile?.Badge?.image_url} alt="" className="w-[26px] h-[26px]" />
                    {userDetails?.data?.profile?.Badge?.display_name}
                  </div>
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-7 mt-4">
                <div className="flex gap-1">
                  {' '}
                  <img loading="lazy" src={user} alt="" /> <p className="font-normal text-sm text-head_grey font-inter">{userDetails?.data?.profile?.user_name}</p>
                </div>
                <div className="flex gap-1">
                  <img loading="lazy" src={phone} alt="" /> <p className="font-normal text-sm text-head_grey font-inter">+91 {userDetails?.data?.profile?.mobile}</p>
                </div>
                <div className="flex gap-1">
                  {' '}
                  <img loading="lazy" src={email} alt="" />
                  <p className="font-normal text-sm text-head_grey font-inter">{userDetails?.data?.profile?.email}</p>
                </div>
              </div>
              <div className="flex md:flex-row flex-col gap-4 mt-4 p-1">
                <OutlineCard image={follower} count={userDetails?.data?.n_followers} label="Followers" />
                <OutlineCard image={following} count={userDetails?.data?.n_following} label="Following" />
                <OutlineCard image={post} count={userDetails?.data?.n_post} label="Posts" />
              </div>
            </div>
          </div>
          <div>
            {
              !userDetails?.data?.profile?.is_deleted &&
              <Space wrap>
                <Popover onOpenChange={() => setOpen(!open)} content={content} open={open} arrow={false} placement="bottomRight">
                  <img loading="lazy" src={action} alt="" className='cursor-pointer' />
                </Popover>
              </Space>
            }
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Tabs
          tabBarStyle={{
            borderBottomWidth: 0.8,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 10,
            marginTop: -8,
            paddingLeft: 10
          }}
          className="custom-tab-style"
          size="large"
          activeKey={activeKey}
          onChange={(e) => setActive(e)}
          items={Items}
        />
      </div>
      <BlockUnblock
        block={block}
        unblock={unblock}
        setBlock={setBlock}
        setUnblock={setUnblock}
        label={block ? 'Block' : 'Unblock'}
        icon={block ? unblock_icon : reject_icon}
        actionType={userDetails?.data?.profile?.id}
        message={block ? 'Are you sure you wish to restrict/block this individual?' : 'Are you certain you wish to unblock this individual?'}
      />
    </Spin>
  );
};

export default UserDetails;
