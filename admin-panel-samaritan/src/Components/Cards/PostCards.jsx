import { Carousel, Tooltip } from 'antd';
import { splitWordFun } from '../../Utiles/Helper';

const PostCards = ({ post, category, description, time }) => {
  return (
    <div className=" w-full border-none">
      <div className="h-full p-2">
        <div className="w-full  relative text-start text-white">
          <Carousel className="mobile:w-full w-80">
            {post?.map((i) => {
              return (
                <div className="w-full relative">
                  <img loading="lazy" src={i?.image_url} alt="" className="w-full object-fill rounded-xl h-56 mb-8 relative" />
                  <div className="absolute top-0 bottom-0 left-0 w-full h-[88%] bg-gradient-to-t from-[#000000] opacity-50 rounded-xl"></div>
                </div>
              );
            })}
          </Carousel>
          <div className="bg-white font-semibold font-inter text-xs text-red absolute top-2 left-2 rounded-xl p-1 m-3">{category?.toUpperCase()}</div>
          <div className="flex gap-2 flex-col absolute bottom-4 left-3 items-start mb-6">
            <span className="text-white font-semibold text-xs font-inter break-all flex-wrap pl-1 pr-3">
              <Tooltip title={description?.length > 100 ? description : ''}>{splitWordFun(description, 100)}</Tooltip>
            </span>
            <span className="text-white font-normal font-inter text-xs pl-1 pb-1">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCards;
