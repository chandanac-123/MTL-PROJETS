import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBalanceSheetGetByIdQuery } from '../../ApiQuery/BalanceSheet/BalancesheetQuery'
import location_icon from '../../Static/Images/geolocation.svg'
import finance_icon from '../../Static/Images/finance.svg'
import general_icon from '../../Static/Images/general.svg'
import edit_icon from '../../Static/Images/arrows.svg'
import { Divider, Popover, Space } from 'antd'
import ContinueButton from '../../Components/CustomButtons/ContinueButton'
import download_icon from "../../Static/Images/exit-down.svg";
import print from '../../Static/Images/devices.svg'
import SelectField from '../../Components/CustomSelect/SelectField'
import { month_year } from '../../Utils/Constants'
import BalanceSheetReceipt from './BalanceSheetReceipt'

const BalanceSheetView = () => {
    const params = useParams()
    const componentRef = useRef(null);
    const [dateFilter, setDateFilter] = useState({ date: '', month: '' });
    const [receipt, setReceipt] = useState(false)
    const { data, isFetching } = useBalanceSheetGetByIdQuery({ id: params?.id, data: dateFilter })

    const handleSelect = (value, name) => {
        let stringConvert = value?.value?.toString();
        let month = stringConvert?.length === 2 ? stringConvert : '';
        let year = stringConvert?.length === 4 ? stringConvert : '';
        setDateFilter((prevState) => {
            return {
                ...prevState,
                date: year,
                month: month,
            };
        });
    };


    return (
        <>
            <div className='outline outline-1 rounded-lg outline-slate-200 px-8 py-4 mt-11 bg-color-white'>
                <div className='flex justify-end gap-2 mb-4'>
                    <div className='w-full sm:w-auto'>
                        <ContinueButton label='Download' img={download_icon} onClick={() => setReceipt(true)}
                            className='bg-primary text-color-white px-6 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
                    </div>
                </div>

                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-2'>
                    <div className='flex  flex-col w-full'>
                        <div className='flex gap-4 items-center'>
                            <label className='font-medium text-lg'>{data?.property_name}</label>
                        </div>
                        <div className='mt-4 flex flex-wrap gap-4 mb-4'>
                            <img src={finance_icon} alt='' />
                            <label className='text-text-color-secondary'>
                                {data?.child_property
                                    ?.map((i) => i?.property_type_id?.name)
                                    .filter((typeName, index, self) => self.indexOf(typeName) === index)
                                    .join(' / ')||data?.property_type_id?.name}
                            </label>
                        </div>
                        <div className='flex items-start gap-2 mobile:items-center'>
                            <img src={location_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>{data?.address}, {data?.town}, {data?.state_id?.state_name}, {data?.pincode}</label>
                        </div>
                    </div>
                </div>

            </div>
            <div className="shadow border color-gray bg-color-white rounded-xl  w-full mt-8">
                <div className="flex p-5 justify-between">
                    <span className="color-black text-[18px] font-semibold">
                        Payment Details
                    </span>
                    <div className='flex w-40'>
                        <SelectField options={month_year} onChange={handleSelect} name='dateFilter' placeholder="All" constant={true} isMulti={false} />
                    </div>
                </div>

                <Divider className="my-0" />

                <div className="p-5 flex items-center flex-wrap gap-8">
                    <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2 w-52 h-16">
                        <div className="text-color-green text-[24px] font-semibold">
                          <>₹  {data?.income_recieved}</> 
                        </div>
                        <div className="text-text-extra-light text-xs font-semibold">
                            Income
                        </div>
                    </div>
                    <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2  w-52 h-16">
                        <p className="text-color-pink text-[24px]  font-semibold">
                            <>₹ {data?.expense_recieved}</>
                        </p>
                        <p className="text-text-extra-light text-xs  font-semibold">
                            Expense
                        </p>
                    </div>
                    <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2  w-52 h-16">
                        <p className="text-[24px] font-semibold  text-color-orange">
                           <>₹ {data?.balance_amount}</> 
                        </p>
                        <p className="text-text-extra-light text-xs font-semibold">
                           Balance
                        </p>
                    </div>
                    <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2  w-52 h-16">
                        <p className="text-[24px] font-semibold text-color-purple">
                            <>₹ {data?.target_amount}</>
                        </p>
                        <p className="text-text-extra-light text-xs font-semibold">
                            Target
                        </p>
                    </div>
                </div>
            </div>
            <div ref={componentRef}>
                <BalanceSheetReceipt receiptData={data} setReceipt={setReceipt} receipt={receipt} />
            </div>
        </>
    )
}

export default BalanceSheetView