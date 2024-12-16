import { Tooltip } from "antd";
import { splitWordFun } from "../../Utiles/Helper";

const KudosCard = ({ card, message, userName, date, color, profilePic, badge }) => {
  return (
    <div className=" w-full   border-none h-[182px]">
      <div className="w-full relative  h-full">
        <img src={card} alt="" className="object-cover top-0 left-0 w-full h-full  shadow-lg rounded-xl absolute" />
        <div className="flex justify-between flex-col w-full pt-5 pl-4 pb-4 h-full relative   ">
          <div className="font-bold rounded-xl text-sm font-merri_weather w-[186px] h-[72px] break-all leading-[17px] " style={{ color: color }}>
            <Tooltip title={message?.length > 80 ? message : ''}>{splitWordFun(message, 80)}</Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex items-baseline relative ">
              <img loading="lazy" src={profilePic} alt="" className="rounded-full w-[46px] h-[46px] border-2 border-white" />
              <img loading="lazy" src={badge} alt="" className="w-[18px] h-[18px] absolute bottom-0 right-0 bg-white rounded-full" />
            </div>
            <div className="flex flex-col mt-1">
              <p className="text-text_black font-semibold text-base font-inter leading-5">{userName}</p>
              <p className="text-text_grey text-[10px] items-center text-center font-normal font-inter leading-2">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KudosCard;