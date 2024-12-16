import React from 'react'
import CustomTable from '../../../Components/CustomeTable'
import { Space } from 'antd';
import view_icon from "../../../Static/Images/view_icon.svg"
import { useNavigate } from 'react-router-dom';
import { getBalance } from '../../../Utils/utils';

const AdvanceIncomeTable = ({ data, tableParams, setId, onChange, loading, id }) => {
    const navigate = useNavigate()

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
            title: 'TENANT NAME',
            dataIndex: 'town',
            className: 'text-[#666666]',
            render: (text, record) => (
                <div className=''>
                    <span className='mobile:whitespace-nowrap'>{record?.tenant_id?.tenant_name || record?.property_id?.parent_id?.town}</span>
                </div>
            ),
        },
        {
            title: 'AMOUNT RECEIVED',
            dataIndex: 'amount_recieved',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <div className='flex flex-col'>
                        <span className='text-[16px] font-normal mobile:whitespace-nowrap inline-block min-w-[110px]'>₹ {record?.amount_recieved}</span>
                        <div className={`${record?.is_partial_paid? 'bg-[#FFF8DD]' : 'bg-[#E8FFF3]'} rounded-[4px] flex items-center justify-center w-max px-2 py-1`}>
                            <p className={`${record?.is_partial_paid ? 'text-color-rellow' : 'text-[#50CD89]'} text-[12px] font-semibold inline-block`}>{record?.is_partial_paid?getBalance(record?.amount_recieved, record?.tenant_id?.advance_amount)+" Pending" : "Fully Paid"}</p>
                        </div>
                    </div>

                )
            }
        },
        {
            title: 'ADVANCE AMOUNT',
            dataIndex: 'month_collected',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <span className='flex text-[16px] whitespace-nowrap'>₹ {record?.tenant_id?.advance_amount}</span>
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

export default AdvanceIncomeTable