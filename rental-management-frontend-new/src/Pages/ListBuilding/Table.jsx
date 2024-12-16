import React, { useState } from 'react'
import CustomTable from '../../Components/CustomeTable';
import { Dropdown, Space } from 'antd';
import action_icon from '../../Static/Images/arrows.svg'
import { ErrorToast } from '../../Utils/AlertMessages';
import { useBuildingDeleteQuery } from '../../ApiQuery/ListBuilding/BuildingQuery';
import Delete from '../../Common/Delete';
import { getUserType } from '../../Utils/utils';
import { capitalizeNames } from '../../Utils/Helper';

const Table = ({ data, tableParams, onChange, loading, setIsModalOpen, setId, id }) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync: deleteBuilding, isPending } = useBuildingDeleteQuery()

    const columns = [
        {
            title: 'BUILDING NAME',
            dataIndex: 'property_name',
            className: 'text-[#071437] font-bold',
            render: (text, record) => (
                <div className='flex'>
                    <div className='flex-col'>
                        <span className='ml-4 mobile:whitespace-nowrap'>{capitalizeNames(text)}</span>
                        <p className='ml-4 text-text-color-secondary font-light' >{record?.property_type}</p>
                    </div>
                </div>
            ),
        },
        {
            title:  getUserType()==='admin' &&'ACTION',
            dataIndex: 'operation',
            key: 'operation',
            align: 'right',
            render: (_, record) => (
                getUserType()==='admin' &&
                <Space size="middle">
                    <Dropdown
                        dropdownRender={() => {
                            return (
                                <div className='flex flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start'>
                                    <button onClick={() => {
                                        setIsModalOpen(record)
                                        setId(record?.id)
                                    }}
                                        className='hover:bg-color-light-gray transition-all w-full text-secondary items-start'>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpen(!open)
                                            setId(record?.id)
                                        }}
                                        className='hover:bg-color-light-gray transition-all w-full text-secondary'>
                                        Delete
                                    </button>
                                </div>
                            )
                        }}
                    >
                        <button><img src={action_icon} alt='' /></button>
                    </Dropdown>
                </Space>
            ),
        },

    ];
    return (
        <>
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteBuilding(id).then(res => { setOpen(false) }).catch(err => {
                ErrorToast({ message: err?.response?.data?.detail?.data || "Something went wrong !" })
            })} />
        </>
    )
}

export default Table