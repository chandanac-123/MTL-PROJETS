import React, { useState } from 'react'
import CustomTable from '../../Components/CustomeTable'
import { Dropdown, Space, Tag } from 'antd';
import action_icon from '../../Static/Images/arrows.svg'
import Delete from '../../Common/Delete';
import { useUserRoleDeleteQuery } from '../../ApiQuery/UserRole/UserRoleQuery';
import { ErrorToast } from '../../Utils/AlertMessages';

const UserRoleTable = ({ data, tableParams, setId, onChange, loading, setIsModalOpen, id }) => {
    const [open, setOpen] = useState(false)
    const { mutateAsync: deleteRole, isPending } = useUserRoleDeleteQuery()
    const [showAllItems, setShowAllItems] = useState(null);

    const columns = [
        {
            title: 'USER ROLE',
            dataIndex: 'name',
            className: 'text-[#666666] uppercase',
        },
        {
            title: 'PERMISSIONS',
            dataIndex: 'access_granted',
            align: 'left',
            render: (_, { access_granted }, idx) => {
                const visibleItems = showAllItems === idx ? access_granted : access_granted.slice(0, 4);
                const hiddenItemCount = access_granted.length - visibleItems.length;
                return (
                    <>
                        {visibleItems?.map((tag, index) => {
                            let color = index % 2 === 0 ? 'blue' : 'magenta';
                            return (
                                <Tag color={color} key={tag} bordered={false} style={{ fontWeight: 'bold' }}>
                                    {tag}
                                </Tag>
                            );
                        })}
                        {access_granted?.length > 4 && idx !== showAllItems ?
                            <Tag
                                color="blue"
                                key="more"
                                bordered={false}
                                style={{ fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => setShowAllItems(idx)}
                            >
                                +{hiddenItemCount} More
                            </Tag> :
                            access_granted?.length > 4 && idx === showAllItems ?
                                <Tag type="link"
                                    color="red"
                                    bordered={false}
                                    onClick={() => setShowAllItems(null)}>
                                    Show Less
                                </Tag>
                                : null
                        }
                    </>
                );
            }

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
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteRole(id).then(res => { setOpen(false) }).catch(err => {
                ErrorToast({ message: err?.response?.data?.detail?.data?.[0] || "Something went wrong !" })
            })} />
        </>
    )
}

export default UserRoleTable