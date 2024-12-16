import React from 'react'
import CustomTable from '../../Components/CustomeTable';
import { Space } from 'antd';
import view_icon from "../../Static/Images/view_icon.svg"
import { useNavigate } from 'react-router-dom';

const Table = ({ data, tableParams, onChange, loading, }) => {
    const navigate=useNavigate()

    const columns = [
        {
            title: 'BUILDING NAME',
            dataIndex: 'property_name',
            className: 'text-[#071437] font-bold',
            render: (text, record) => (
                <div className='flex'>
                    <div className='flex-col'>
                        <span className='ml-4 mobile:whitespace-nowrap'>{text}</span>
                        <p className='ml-4 text-text-color-secondary font-light' >{record?.property_type}</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'INCOME',
            dataIndex: 'income_recieved',
            className: 'text-[#00C47D] uppercase',
            render: (_, record) => {
                return (
                  <span className='flex whitespace-nowrap'>₹ {record?.income_recieved}</span>
                )
              }
        },
        {
            title: 'EXPENSES',
            dataIndex: 'expense_recieved',
            className: 'text-[#EC305E] uppercase',
            render: (_, record) => {
                return (
                  <span className='flex whitespace-nowrap'>₹ {record?.expense_recieved}</span>
                )
              }
        },
        {
            title: 'BALANCE',
            dataIndex: 'balance_amount',
            className: 'text-[#FC3C00] uppercase',
            render: (_, record) => {
                return (
                  <span className='flex whitespace-nowrap'>₹ {record?.balance_amount}</span>
                )
              }
        },
        {
            title: 'TARGET',
            dataIndex: 'target_amount',
            className: 'text-[#7239EA] uppercase',
            render: (_, record) => {
                return (
                  <span className='flex whitespace-nowrap'>₹ {record?.target_amount}</span>
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
                    <button onClick={()=>navigate(`view/${record.id}`)}><img src={view_icon} alt='' />
                    </button>
                </Space>
            ),
        },

    ];
  return (
    <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
  )
}

export default Table