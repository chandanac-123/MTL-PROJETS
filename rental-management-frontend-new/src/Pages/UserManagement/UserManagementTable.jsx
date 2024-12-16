import React, { useState } from 'react'
import CustomTable from '../../Components/CustomeTable'
import { Dropdown, Space, Tag } from 'antd';
import action_icon from '../../Static/Images/arrows.svg'
import Delete from '../../Common/Delete';
import { useUserDeleteQuery } from '../../ApiQuery/UserManagement/UserQuery';
import { ErrorToast } from '../../Utils/AlertMessages';

const UserManagementTable = ({ data, tableParams, setId, onChange, loading, setIsModalOpen, id }) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync: deleteUser, isPending } = useUserDeleteQuery()

    const columns = [
        {
            title: 'USER NAME',
            dataIndex: 'full_name',
            className: 'text-[#071437] font-bold'
        },
        {
            title: 'USER ROLE',
            dataIndex: 'name',
            className: 'text-[#666666]',
            render: (_, { groups }) => (
                <>
                    {groups.map((tag) =>
                        tag.name
                    )}
                </>
            )
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            className: 'text-[#666666]'
        },
        {
            title: 'PHONE NUMBER',
            dataIndex: 'phone_number',
            className: 'text-[#666666]'
        },
        {
            title: 'ACTION',
            dataIndex: 'operation',
            key: 'operation',
            align: 'right',

            render: (_, record) => (
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
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteUser(id).then(res => { setOpen(false) }).catch(err => { ErrorToast({ message: err?.response?.data?.detail?.data?.[0] || err?.response?.data?.error || "Something went wrong !" }) })} />
        </>
    )
}

export default UserManagementTable