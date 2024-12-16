import React, { useState } from 'react'
import CustomTable from '../../../Components/CustomeTable'
import { Dropdown, Space } from 'antd';
import action_icon from '../../../Static/Images/arrows.svg'
import view_icon from "../../../Static/Images/view_icon.svg"
import Delete from '../../../Common/Delete';
import { useInvestIncomeDeleteQuery } from '../../../ApiQuery/InvestmentIncome/InvestIncomeQuery';
import { ErrorToast } from '../../../Utils/AlertMessages';
import { useNavigate } from 'react-router-dom';
import { getUserType } from '../../../Utils/utils';

const Table = ({ data, tableParams, onChange, loading, setIsModalOpen, setId, id }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    const { mutateAsync: deleteIncome, isPending } = useInvestIncomeDeleteQuery()

    const columns = [
        {
            title: 'BUILDING NAME',
            dataIndex: 'property_name',
            className: 'text-[#666666] ',
            render: (text, record) => (
                <div className='flex flex-col'>
                    <span className='mobile:whitespace-nowrap font-semibold text-color-black'>{record?.property_id?.property_name || record?.property_id?.parent_id?.property_name}</span>
                    <p className="text-text-color-secondary font-light">
                        {record?.property_id?.property_type_id?.name} {record?.property_id?.flat_number ? <> |  {record?.property_id?.flat_number}</> : <>|  {record?.property_id?.house_number}</>}
                    </p>
                </div>
            ),
        },
        {
            title: 'LOCATION',
            dataIndex: 'town',
            className: 'text-[#666666] ',
            render: (_, record) => {
                return (
                    record?.property_id?.town || record?.property_id?.parent_id?.town
                )
            }
        },
        {
            title: 'AMOUNT',
            dataIndex: 'amount_recieved',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <span className='flex whitespace-nowrap'>₹ {record?.amount_recieved}</span>
                )
            }
        },
        {
            title: 'INVESTOR NAME',
            dataIndex: 'name',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    record?.investor_id?.investor_name
                )
            }
        },
        {
            title: 'DATE',
            dataIndex: 'created_at',
            className: 'text-[#666666]',
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
                    {getUserType()==='admin' &&
                    <Dropdown
                        dropdownRender={() => {
                            return (
                                <div className='flex flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start'>
                                    <button onClick={() => {
                                        setIsModalOpen(record)
                                        setId(record?.id)
                                    }} className='hover:bg-color-light-gray transition-all w-full text-secondary items-start'>
                                        Edit
                                    </button>
                                    <button onClick={() => {
                                        setOpen(true)
                                        setId(record?.id)
                                    }} className='hover:bg-color-light-gray transition-all w-full text-secondary'>
                                        Delete
                                    </button>
                                </div>
                            )
                        }}
                    >
                        <button><img src={action_icon} alt='' /></button>
                    </Dropdown>}
                </Space>
            ),
        },

    ];
    return (
        <>
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteIncome(id).then(res => { setOpen(false) }).catch(err => {
                ErrorToast({ message: "Something went wrong !" })
            })} />
        </>
    )
}

export default Table