import DynamicCard from '../../Components/Cards/DynamicCard';
import user from '../../assets/user.svg';
import calender from '../../assets/calendar.svg';
import posts from '../../assets/posts.svg';
import donation from '../../assets/donation.svg';
import approval from '../../assets/approval.svg';
import arrow from '../../assets/green-arrow.svg';
import SolidCard from '../../Components/Cards/SolidCard';
import DashboardTable from './DashboardTable';
import { useEffect, useState } from 'react';
import slideright from '../../assets/slide-right.svg';
import slideleft from '../../assets/slide-left.svg';
import { usePostListQuery } from '../../ApiQueries/PostApprovals/PostQueries';
import view from '../../assets/view.svg';
import dot from '../../assets/dot.svg';
import { combineFun, dateConversion, daysOfWeekConversion, splitWordFun } from '../../Utiles/Helper';
import { Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAllEventListQuery } from '../../ApiQueries/AllEvent/EventQueries';
import { useDashboardQuery } from '../../ApiQueries/Dashboard/DashboardQueries';

const getSlidesToShow = () => {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 992) return 3;
  return 4;
};

const Dashboard = () => {
  const { data: postlist, isFetching } = usePostListQuery();
  const { data: eventlist, isFetching: eventFetch } = useAllEventListQuery({ 'eventStatus': 'upcoming' });
  const { data: dashboardData, isFetching: dashboardFetch } = useDashboardQuery();
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const initialColors = ['#C99055', '#E48068', '#7CC590', '#FECB0D'];
  const [startIndex, setStartIndex] = useState(0);
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    function handleResize() {
      setSlidesToShow(getSlidesToShow());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prev = () => {
    setStartIndex(startIndex - 1);
    rotateColorsLeft();
  };

  const next = () => {
    setStartIndex(startIndex + 1);
    rotateColorsRight();
  };

  const rotateColorsRight = () => {
    const rotatedColors = [colors[colors.length - 1], ...colors.slice(0, colors.length - 1)];
    setColors(rotatedColors);
  };

  const rotateColorsLeft = () => {
    const rotatedColors = [...colors.slice(1), colors[0]];
    setColors(rotatedColors);
  };

  const post_columns = [
    {
      title: 'POST',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <img loading="lazy" src={record?.PostImages[0]?.image_url} alt="" className="w-[50px] h-[50px] rounded-lg" />
          <div className="flex flex-col">
            <p className="text-black font-semibold text-base">
              <Tooltip title={record?.title?.length > 25 ? record?.title : ''}>
                <span className="text-table_text font-semibold text-base">{splitWordFun(record?.title, 25)}</span>
              </Tooltip></p>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-red font-semibold bg-categorybg w-auto pl-2 pr-2  h-auto rounded-xl">{record?.PostCategory?.display_name?.toUpperCase()}</p>
              <div className="flex mobile:flex-wrap gap-2">
                <img loading="lazy" src={dot} alt="" />
                <p className="text-xs text-table_text_grey"> {dateConversion(record?.createdAt)}</p>
              </div>
              <div className="flex mobile:flex-wrap gap-2">
                <img loading="lazy" src={dot} alt="" />
                <p className="text-xs text-table_text_grey">{record?.User?.user_name}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'ACTION',
      key: 'name',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => navigate(`/post-approval/view/${record?.id}`)}>
            <img loading="lazy" src={view} alt="" />
          </button>
        </Space>
      )
    }
  ];

  const event_columns = [
    {
      title: 'EVENTS',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <img loading="lazy" src={record?.cover_image} alt="" className="w-[50px] h-[50px]" />
          <div className="flex flex-col">
            <p className="text-black font-semibold text-base">
              <Tooltip title={record?.name?.length > 25 ? record?.name : ''}>
                <span className="text-table_text font-semibold text-base">{splitWordFun(record?.name, 25)}</span>
              </Tooltip></p>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-red font-semibold bg-categorybg w-auto pl-2 pr-2  h-auto rounded-xl">{record?.['PostCategory.display_name']?.toUpperCase()}</p>
              <div className="flex mobile:flex-wrap gap-2">
                <img loading="lazy" src={dot} alt="" />
                <p className="text-xs text-table_text_grey">
                  {daysOfWeekConversion(record?.start_date)} | {combineFun(record?.start_time, record?.end_time, 'time')}
                </p>
              </div>
              <div className="flex mobile:flex-wrap gap-2">
                <img loading="lazy" src={dot} alt="" />
                <p className="text-xs text-table_text_grey">{combineFun(record?.venue, record?.location)}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'ACTION',
      key: 'name',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => navigate(`/event-management/all/view/${record?.id}`)}>
            <img loading="lazy" src={view} alt="" />
          </button>
        </Space>
      )
    }
  ];

  return (
    <div className="bg-white mt-8">
      <div className="gap-4 mt-8 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
        <DynamicCard icon={user} count={dashboardData?.data?.n_registeredUsers} text="Registered Users " colors="#FECB0D" onClick={() => navigate('/user-management')} />
        <DynamicCard icon={posts} count={dashboardData?.data?.n_post} text="Posts From Users" colors="#7CC590" />
        <DynamicCard icon={calender} count={dashboardData?.data?.n_events} text="Events Added" colors="#E48068" onClick={() => navigate('/event-management/all')} />
        <DynamicCard icon={approval} count={dashboardData?.data?.n_pendingPosts} text="Posts Pending For Approval" colors="#594740" onClick={() => navigate('/post-approval')} />
        <DynamicCard icon={donation} count={dashboardData?.data?.donation} text="Donations Made" colors="#C99055" />
      </div>
      <div className="flex mt-8 gap-4">
        {dashboardData?.data?.activities?.slice(startIndex, startIndex + getSlidesToShow()).map((item, index) => (
          <div key={index} style={{ width: `${100 / getSlidesToShow()}%` }}>
            <SolidCard count={item?.count} text={item?.lable} colors={colors[index % colors.length]} />
          </div>
        ))}
      </div>
      <div className="flex justify-between -mt-20 -mx-6">
        <button onClick={prev} style={{ visibility: startIndex != 0 ? 'visible' : 'hidden' }}>
          {' '}
          <img loading="lazy" src={slideleft} alt="" />
        </button>
        <button
          onClick={next}
          style={{
            visibility: startIndex + getSlidesToShow() >= dashboardData?.data?.activities?.length ? 'hidden' : 'visible'
          }}
        >
          <img loading="lazy" src={slideright} alt="" />
        </button>
      </div>

      <div className="flex mobile:flex-row flex-col gap-4 mt-12">
        <div className="w-full flex flex-col border border-border_grey rounded-xl p-3">
          <div className="font-merri_weather font-bold text-lg text-black">Posts Pending For Approval</div>
          <p className="text-xs font-normal text-grey mb-3">{postlist?.data?.totalCount} Pending</p>
          <DashboardTable columns={post_columns} data={postlist?.data?.posts?.slice(0, 5)} tableParams={false} loading={isFetching} />
          {postlist?.data?.posts?.length > 5 && (
            <button onClick={() => navigate('/post-approval')} className="flex justify-center text-sm font-normal text-green mb-3 mt-2">
              View All Post
              <img loading="lazy" src={arrow} alt="" className="ml-3" />
            </button>
          )}
        </div>

        <div className="w-full flex flex-col border border-border_grey rounded-xl p-3">
          <div className="font-merri_weather font-bold text-lg text-black">Upcoming Events</div>
          <p className="text-xs font-normal text-grey mb-3">{eventlist?.data?.totalCount} Events</p>
          <DashboardTable columns={event_columns} data={eventlist?.data?.events?.slice(0, 5)} tableParams={false} loading={eventFetch} />
          {eventlist?.data?.events?.length > 5 && (
            <button onClick={() => navigate('/event-management/all')} className="flex justify-center text-sm font-normal text-green mb-3 mt-2">
              View All Events
              <img loading="lazy" src={arrow} alt="" className="ml-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
