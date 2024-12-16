import { Tooltip } from 'antd';
import React from 'react'
import { formatCurrencyIndianStyle } from '../../Utils/utils';
import BasicDonutCard from '../Cards/BasicDonutCard'


const DonutChartCard = ({ bgColor, cardHead, amount }) => {
  const options = { style: 'decimal', maximumFractionDigits: 2 };

  return (
    <div className={`w-full p-4 rounded-2xl ${bgColor}`}>
      <div className="border-none rounded-lg flex flex-col justify-between h-full">
        <div className='flex items-center justify-between'>
          <h2 className="text-xl font-bold">{cardHead}</h2>
        </div>
        {/* <div className="w-full flex items-center justify-end">
            <BasicDonutCard amount={amount} />
        </div> */}
        <div className="flex justify-between">
          <div className="flex w-full md:w-1/2">
            <div className="mt-1">
              <p><span className='text-xl font-bold text-primary'>-</span>Target</p>
              <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.target_amount,25)}>
                <h2 className="sm:text-lg  text-sm font-bold">₹{formatCurrencyIndianStyle(amount?.target_amount)}</h2>
              </Tooltip>
              <p><span className='text-xl font-bold text-monthly-red'>-</span>Received</p>
              <Tooltip placement="top" title={formatCurrencyIndianStyle(amount?.income_recieved,25)}>
                <h2 className="sm:text-lg  text-sm  font-bold">₹{formatCurrencyIndianStyle(amount?.income_recieved)}</h2>
              </Tooltip>
            </div>
          </div>
          <div className="w-36 md:w-1/3 flex items-center justify-center">
            <BasicDonutCard amount={amount} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonutChartCard