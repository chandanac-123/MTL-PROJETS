import { Tooltip } from "antd";
import React from "react";
import { formatCurrencyIndianStyle } from "../../Utils/utils";
import IncomeBasicDonutCard from "../Cards/IncomeBasicDonutCard";

const IncomeDonutChartCard = ({ bgColor, cardHead, amount, todays }) => {

  return (
    <div className={`w-full p-4 rounded-2xl ${bgColor}`}>
      <div className="border-none rounded-lg flex flex-col justify-between h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{cardHead}</h2>
          <h2 className="text-sm font-bold w-[38%]">{todays}</h2>
        </div>
        {/* <div className="w-full flex items-center justify-end">
            <BasicDonutCard amount={amount} />
        </div> */}
        <div className="flex justify-between gap-1">
          {/* <div className="flex w-full md:w-1/2">
            <div className="mt-1">
              <p>
                <span className="text-xl font-bold text-primary">-</span>Cash
              </p>
              <Tooltip placement="top" title={amount?.cash_income}>
                <h2 className="text-sm font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.cash_income)}
                </h2>
              </Tooltip>
              <p>
                <span className="text-xl font-bold text-monthly-red">-</span>
                Account
              </p>
              <Tooltip placement="top" title={amount?.bank_income}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.bank_income)}
                </h2>
              </Tooltip>
              <p>
                <span className="text-xl font-bold text-[#9016ed]">-</span>
                Investment
              </p>
              <Tooltip placement="top" title={amount?.investment_income}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.investment_income)}
                </h2>
              </Tooltip>
              <p>
                <span className="text-xl font-bold text-[#0dcb72]">-</span>
                Advance
              </p>
              <Tooltip placement="top" title={amount?.advance_income}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.advance_income)}
                </h2>
              </Tooltip>
            </div>
          </div> */}
          <div>
            <div>
              <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.cash_income,25)}>
                <h2 className="text-[14px] font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.cash_income,8)}
                </h2>
              </Tooltip>
              <p className="sm:text-[12px] text-[10px] min-w-[80px]">
                <span className="font-extrabold text-primary text-lg">-</span>
                Cash
              </p>
            </div>
            <div className="mt-2">
            <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.bank_income,25)}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.bank_income,8)}
                </h2>
              </Tooltip>
              <p className="sm:text-[12px] text-[10px] min-w-[80px]">
                <span className="font-extrabold text-lg text-monthly-red">-</span>
                Account
              </p>
            </div>
          </div>
          <div className="sm:w-auto w-[28%]">
            <div>
            <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.investment_income,25)}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.investment_income,8)}
                </h2>
              </Tooltip>
              <p className="sm:text-[12px] text-[10px] min-w-[80px]">
                <span className="font-extrabold text-lg text-[#9016ed]">-</span>
                Investment
              </p>
            </div>
            <div className="mt-2">
            <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.advance_income,25)}>
                <h2 className="text-sm  font-bold">
                  ₹{formatCurrencyIndianStyle(amount?.advance_income,8)}
                </h2>
              </Tooltip>
              <p className="sm:text-[12px] text-[10px] min-w-[80px]">
                <span className="font-extrabold text-lg text-[#0dcb72]">-</span>
                Advance
              </p>
            </div>
          </div>
          <div className="w-36 md:w-1/3 flex items-center justify-center">
            <IncomeBasicDonutCard amount={amount} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.total_income,25)}>
            <h2 className="text-2xl font-bold">
              ₹{formatCurrencyIndianStyle(amount?.total_income)}
            </h2>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default IncomeDonutChartCard;
