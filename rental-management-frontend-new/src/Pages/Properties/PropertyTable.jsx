import React, { useState } from 'react'
import CustomTable from '../../Components/CustomeTable'
import { Dropdown, Space, Tag } from 'antd';
import action_icon from '../../Static/Images/arrows.svg'
import Delete from '../../Common/Delete';
import view_icon from "../../Static/Images/view_icon.svg"
import { useNavigate } from 'react-router-dom';
import { usePropertyDeleteQuery } from '../../ApiQuery/Property/PropertyQuery';
import prop_icon from '../../Static/Images/property.jpg'
import { getUserType } from '../../Utils/utils';
import { capitalizeNames } from '../../Utils/Helper';

const PropertyTable = ({ data, tableParams, setId, onChange, loading, id }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    const { mutateAsync: deleteProperty, isPending } = usePropertyDeleteQuery()

    const columns = [
        {
            title: 'PROPERTY',
            dataIndex: 'property_name',
            className: 'text-[#071437] font-bold',
            width: 300,
            render: (text, record) => (
                <div className='flex mr-10'>
                    <img
                        className='w-12 h-12'
                        src={record?.property_image ? record?.property_image + "?" + new Date() : prop_icon}
                        alt=''
                    />
                    <div className='flex-col'>
                        <span className='ml-4 whitespace-nowrap'>{text || record?.parent_id?.property_name}</span>
                        <p className='ml-4 text-text-color-secondary font-light' >{record?.property_type_id?.name}</p>
                    </div>
                </div>
            ),

        },
        {
            title: 'FLAT NO.',
            dataIndex: 'flat_number',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    record?.flat_number || '--'
                )
            }
        },
        {
            title: 'HOUSE NO.',
            dataIndex: 'house_number',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    record?.house_number || '--'
                )
            }
        },
        {
            title: 'LOCATION',
            dataIndex: 'town',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    record?.parent_id?.town || record?.town
                )
            }
        },
        {
            title: 'TENANT NAME',
            dataIndex: 'tenant_name',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    capitalizeNames(record?.property_history[0]?.tenant_id?.tenant_name) || 'N/A'
                )
            }
        },
        {
            title: 'RENT',
            dataIndex: 'rent_amount',
            className: 'text-[#009EF7]',
            render: (_, record) => {
                return (
                    <>
                        {
                            record?.property_history[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount ?
                                <div className='flex whitespace-nowrap'> ₹ {record?.property_history[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount}</div> : "N/A"
                        }
                    </>
                )
            }
        },
        {
            title: 'STATUS',
            dataIndex: 'is_occupied',
            className: 'text-[#666666]',
            render: (item) => {
                let color = item ? 'green' : 'red'
                return (
                    <Tag color={color}>{item ? "Occupied" : "Vacant"}</Tag>
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
                        setViewOpen(!viewOpen)
                        navigate(`view/${record.id}`)
                    }}><img src={view_icon} alt='' />
                    </button>
                    {getUserType() === 'admin' &&
                        <Dropdown
                            dropdownRender={() => {
                                return (
                                    <div className='flex flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start'>
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
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteProperty(id).then(res => { setOpen(false) }).catch(err => { })} />
        </>
    )
}

export default PropertyTable