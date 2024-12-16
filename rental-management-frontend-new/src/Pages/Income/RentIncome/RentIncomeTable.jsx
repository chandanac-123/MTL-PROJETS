import React, { useState } from 'react'
import CustomTable from '../../../Components/CustomeTable'
import { Dropdown, Space, Tag } from 'antd';
import action_icon from '../../../Static/Images/arrows.svg'
import Delete from '../../../Common/Delete';
import { ErrorToast } from '../../../Utils/AlertMessages';
import view_icon from "../../../Static/Images/view_icon.svg"
import { useNavigate } from 'react-router-dom';
import { usePropertyDeleteQuery } from '../../../ApiQuery/Property/PropertyQuery';
import { getBalance, getMonthName } from '../../../Utils/utils';

const RentIncomeTable = ({ data, tableParams, setId, onChange, loading, id }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    const { mutateAsync: deleteProperty, isPending } = usePropertyDeleteQuery()

    const columns = [
        {
            title: 'BUILDING NAME',
            dataIndex: 'property_name',
            className: 'text-[#071437] font-bold',
            width: 300,
            render: (text, record) => (
                <div className='flex flex-col'>
                    <span className='mobile:whitespace-nowrap'>{record?.property_id?.property_name || record?.property_id?.parent_id?.property_name}</span>
                    <p className="text-text-color-secondary font-light">
                        {record?.property_id?.property_type_id?.name} {record?.property_id?.flat_number ? <> |  {record?.property_id?.flat_number}</> : <>|  {record?.property_id?.house_number}</>}
                    </p>
                </div>
            ),

        },
        {
            title: 'LOCATION',
            dataIndex: 'town',
            className: 'text-[#666666]',
            render: (text, record) => (
                <div className=''>
                    <span className='mobile:whitespace-nowrap'>{record?.property_id?.town || record?.property_id?.parent_id?.town}</span>
                </div>
            ),
        },
        {
            title: 'AMOUNT',
            dataIndex: 'town',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <div className='flex flex-col'>
                        <span className='text-[16px] font-normal mobile:whitespace-nowrap inline-block min-w-[110px]'>₹ {record?.amount_recieved}</span>
                        <div className={`${getBalance(record?.amount_recieved, record?.rent_id?.rent_amount) > 0 ? 'bg-[#FFF8DD]' : 'bg-[#E8FFF3]'} rounded-[4px] flex items-center justify-center w-max px-2 py-1`}>
                            <p className={`${getBalance(record?.amount_recieved, record?.rent_id?.rent_amount) > 0 ? 'text-color-rellow' : 'text-[#50CD89]'} text-[12px] font-semibold inline-block`}>{getBalance(record?.amount_recieved, record?.rent_id?.rent_amount) > 0 ? getBalance(record?.amount_recieved, record?.rent_id?.rent_amount) + " Pending" : "Fully Paid"}</p>
                        </div>
                    </div>

                )
            }
        },
        {
            title: 'MONTH COLLECTED',
            dataIndex: 'month_collected',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <div className=''>
                        <span className='text-[16px] font-normal'>{getMonthName(record?.rent_month)} {record?.rent_year}</span>
                    </div>
                )
            }
        },
        {
            title: 'RENT AMOUNT',
            dataIndex: 'month_collected',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <span className='flex text-[16px] whitespace-nowrap'>₹ {record?.rent_id?.rent_amount}</span>
                )
            }
        },
        {
            title: 'ACTION',
            dataIndex: 'operation',
            key: 'operation',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => {
                        navigate(`view/${record.id}`)
                    }}><img src={view_icon} alt='' />
                    </button>
                </Space>
            ),
        },

    ];

    return (
        <>
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
        </>
    )
}

export default RentIncomeTable