import { Skeleton, Tooltip } from "antd";
import React from "react";
import { formatCurrencyIndianStyle } from "../../Utils/utils";
import BasicCard from "../Cards/BasicCard";

const LineChart = ({ lineColor, bgColor, cardHead, amount, todays }) => {
  return (
    <div className={`w-full p-4  h-full  rounded-2xl ${bgColor}`}>
      <div className="border-none rounded-lg h-full flex flex-col gap-2 justify-between">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{cardHead}</h2>
        <h2 className="text-sm font-bold w-[38%]">{todays}</h2>
      </div>
      <BasicCard lineColor={lineColor} />
      <div className="flex justify-between items-center mt-4">
        <Tooltip placement="top" title={formatCurrencyIndianStyle(amount,25)}>
          <h2 className="text-2xl font-bold">₹{formatCurrencyIndianStyle(amount)}</h2>
        </Tooltip>
        {/* <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5837 18.9764C12.6837 19.4764 12.2837 20.0764 11.7837 20.1764C11.2837 20.2764 10.6837 20.2764 10.1837 20.2764C7.58371 20.2764 4.98371 19.2764 3.08371 17.3764C-0.516294 13.7764 -0.816307 7.97641 2.38369 4.07641L3.78372 5.47644C1.38372 8.57644 1.6837 13.0764 4.4837 15.9764C6.2837 17.7764 8.8837 18.6764 11.4837 18.1764C11.9837 18.0764 12.4837 18.4764 12.5837 18.9764ZM16.4837 15.0764L17.8837 16.4764C20.9837 12.5764 20.7837 6.77642 17.0837 3.17642C14.7837 0.876419 11.5837 -0.123569 8.38369 0.376431C7.88369 0.476431 7.48371 0.976437 7.58371 1.47644C7.68371 1.97644 8.18371 2.37642 8.68371 2.27642C11.1837 1.87642 13.7837 2.67644 15.6837 4.47644C18.5837 7.47644 18.7837 11.9764 16.4837 15.0764Z"
            fill="#999999"
          />
          <path
            opacity="0.3"
            d="M0.046875 1.87646H5.04688C5.64687 1.87646 6.04688 2.27646 6.04688 2.87646V7.87643L0.046875 1.87646ZM14.0469 12.6765V17.6765C14.0469 18.2765 14.4469 18.6765 15.0469 18.6765H20.0469L14.0469 12.6765Z"
            fill="#999999"
          />
        </svg> */}
      </div>
    </div>
      
    </div>
  );
};

export default LineChart;
