import PageLayout from '../../../Common/PageLayout';
import ColorOutlineCard from '../../../Components/Cards/ColorOutlineCard';
import zoom from '../../../assets/zoom.svg';
import calender from '../../../assets/color-calender.svg';
import time from '../../../assets/color-time.svg';
import location from '../../../assets/color-location.svg';
import { Image, Spin } from 'antd';
import '../../../Common/style.css';
import { useState } from 'react';
import { useEventGetByIdQuery } from '../../../ApiQueries/AllEvent/EventQueries';
import { useParams } from 'react-router-dom';
import { descriptiveDateConversion, combineFun } from '../../../Utiles/Helper';
import EditorInput from '../../../Components/Inputs/EditorInput';

const View = () => {
  const params = useParams();
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const { data, isFetching } = useEventGetByIdQuery({ id: params?.id });

  return (
    <Spin spinning={isFetching}>
      <PageLayout>
        <div className="flex-auto mobile:flex">
          <div className="image-container border border-1 rounded-xl">
            <Image
              preview={{
                visible: isPreviewVisible,
                onVisibleChange: (visible, prevVisible) => setPreviewVisible(visible)
              }}
              src={data?.data?.cover_image}
              width={180}
              className="image-with-text w-44 h-40 rounded-xl object-contain"
            />
            <button onClick={() => setPreviewVisible(!isPreviewVisible)} className="text-inside-image h-4 flex  items-center justify-around">
              ZOOM IN <img loading="lazy" src={zoom} className="w-3" />
            </button>
          </div>
          <div className="flex flex-col ml-4 gap-2">
            <p className="text-text_black text-lg font-inter font-semibold">{data?.data?.name}</p>
            <p className="font-semibold font-inter text-red bg-categorybg text-xs rounded-xl pl-2 pr-2  max-w-max">{data?.data?.PostCategory?.display_name?.toUpperCase()}</p>
            <div className="flex gap-3 items-center">
              <img loading="lazy" src={data?.data?.User?.profile_pic} alt="" className="w-[34px] h-[34px] rounded-full" />
              <p className="text-head_grey text-base font-inter font-semibold">{data?.data?.User?.user_name}</p>
            </div>
            <div className="md:flex-row flex-col gap-4 mt-1 p-0 flex">
              <ColorOutlineCard label={descriptiveDateConversion(data?.data?.start_date)} className=" outline-green" image={calender} />
              <ColorOutlineCard label={combineFun(data?.data?.start_time, data?.data?.end_time, 'time')} className=" outline-yellow" image={time} />
              <ColorOutlineCard label={combineFun(data?.data?.venue, data?.data?.location)} className=" outline-red" image={location} />
            </div>
          </div>
        </div>
      </PageLayout>

      <PageLayout>
        <div className="text-head_grey font-semibold text-base font-inter">Event Description</div>
        <EditorInput view={true} value={data?.data?.description} viewDescription={true} />
      </PageLayout>
    </Spin>
  );
};

export default View;
