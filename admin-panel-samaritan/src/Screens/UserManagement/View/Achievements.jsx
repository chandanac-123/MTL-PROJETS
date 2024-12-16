import PageLayout from '../../../Common/PageLayout';
import SolidCard from '../../../Components/Cards/SolidCard';
import Datepicker from '../../../Components/DateAndTime/Datepicker';
import ViewTable from './ViewTable';
import slideright from '../../../assets/slide-right.svg';
import slideleft from '../../../assets/slide-left.svg';
import { useEffect, useState } from 'react';
import { useUserDonationsQuery } from '../../../ApiQueries/UserManagement/UserQueries';
import dayjs from 'dayjs';

const getSlidesToShow = () => {
  if (window.innerWidth < 576) return 1;
  if (window.innerWidth < 768) return 2;
  if (window.innerWidth < 992) return 3;
  return 4;
};

const Achievements = ({ id, activeKey, data }) => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    },
    dateFilter: ''
  });

  const { data: donationDetails, isFetching } = useUserDonationsQuery({
    id,
    tableParams
  });

  const onChange = (e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: e?.current,
        pageSize: e?.pageSize
      }
    });
  };

  const handleDateChange = (date) => {
    let value;
    if (date) value = dayjs(date)?.format('YYYY-MM');
    else value = '';
    setTableParams((prevState) => {
      return {
        ...prevState,
        dateFilter: value,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      };
    });
  };

  const initialColors = ['#C99055', '#E48068', '#7CC590', '#FECB0D'];
  const [startIndex, setStartIndex] = useState(0);
  const [colors, setColors] = useState(initialColors);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

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

  useEffect(() => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        dateFilter: ''
      };
    });
  }, [activeKey]);

  return (
    <>
      <div className="flex mt-8 gap-4">
        {data?.slice(startIndex, startIndex + getSlidesToShow()).map((item, index) => {
          const itemName = item?.type == 'donation' ? 'Donation made' : item?.type == 'tree_plantation' ? 'Trees planted' : item?.type == 'marathon' ? 'Kilometers run' : item?.type == 'volunteer' ? 'Volunteered activity' : item?.type == 'teaching_drive' ? 'Teaching drive' : item?.type == 'cleanup_drive' ? 'Clean up done' : "";
          return (
            <div key={index} style={{ width: `${100 / getSlidesToShow()}%` }}>
              <SolidCard count={item?.value} text={itemName} colors={colors[index % colors.length]} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between -mt-20 -mx-6 mb-12">
        <button onClick={prev} style={{ visibility: startIndex != 0 ? 'visible' : 'hidden' }}>
          {' '}
          <img loading="lazy" src={slideleft} alt="" />
        </button>
        <button
          onClick={next}
          style={{
            visibility: startIndex + getSlidesToShow() >= data?.length ? 'hidden' : 'visible'
          }}
        >
          <img loading="lazy" src={slideright} alt="" />
        </button>
      </div>

      <PageLayout>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="font-merri_weather font-bold text-lg text-text_black">Donations Made</p>
            <p className="text-xs font-normal font-inter text-grey">{donationDetails?.data?.n_donation} Donations</p>
          </div>
          <div>
            <Datepicker donationTable={true} name="dateFilter" value={tableParams?.dateFilter} picker="month" format="MMM YYYY" onChange={handleDateChange} />
          </div>
        </div>
        <ViewTable
          tableData={donationDetails?.data?.donations}
          tableParams={{
            ...tableParams.pagination,
            total: donationDetails?.data?.n_donation
          }}
          onChange={onChange}
          loading={isFetching}
          setTableParams={setTableParams}
        />
      </PageLayout>
    </>
  );
};

export default Achievements;
