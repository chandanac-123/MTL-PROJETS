import React, { useState } from 'react'
import CustomTable from '../../../Components/CustomeTable'
import { Dropdown, Space, Tag } from 'antd';
import action_icon from '../../../Static/Images/arrows.svg'
import Delete from '../../../Common/Delete';
import { ErrorToast } from '../../../Utils/AlertMessages';
import { useExpenseTypeDeleteQuery } from '../../../ApiQuery/ExpenseType/ExpenseTypeQuery';
import { getUserType } from '../../../Utils/utils';

const ExpenseTypeTable = ({ data, tableParams, setId, onChange, loading, setIsModalOpen, id }) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync: deleteExpenseType, isPending } = useExpenseTypeDeleteQuery()

    const columns = [
        {
            title: 'EXPENSE TYPE',
            dataIndex: 'name',
            className: 'text-[#666666]'
        },

        {
            title: getUserType()==='admin' &&'ACTION',
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
                                        setIsModalOpen(true)
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
                    </Dropdown>

                </Space>
            ),
        },

    ];
    return (
        <>
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteExpenseType(id).then(res => { setOpen(false) }).catch(err => { ErrorToast({ message: err?.response?.data?.detail?.data?.[0] || "Something went wrong !" }) })} />
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
        </>

    )
}

export default ExpenseTypeTable