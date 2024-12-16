"use client"

import React, { useState } from 'react'
import CustomeSelect from '@/components/ui/select';
import {  userStatus } from '@/constants/status';
import Customertable from './table';
import { useCustomeractive_deactiveQuery, useCustomerListQuery } from '@/api-queries/customer-management/queries';
import { useRouter } from "next/navigation";

function CustomersList() {
    const router = useRouter();
    const [tableParams, setTableParams] = useState({
        page: 1,
        search: '',
        status: '',
    });
    const [id, setId] = useState(false);
    const [activemodal, setActivemodal] = useState(false)
    const [deactivemodal, setDeactivemodal] = useState(false)
    const [usercontrol, setUsercontrol] = useState({})

    const { data, isFetching } = useCustomerListQuery(tableParams)

    const handleSelect = (value: any) => {
        setTableParams((prevState) => {
            return {
                ...prevState,
                status: value,
                page: 1
            }
        })
    }

    const { mutate: activateDeactivateUser } = useCustomeractive_deactiveQuery();


    const handleUsercontrol = () => {
        if (usercontrol && 'id' in usercontrol && 'isActive' in usercontrol && 'isDeleted' in usercontrol) {
            const status = usercontrol.isActive && !usercontrol.isDeleted ? "deactivate" : "activate";
            const userId = usercontrol.id
            activateDeactivateUser({ userId, status });
            setActivemodal(false)
            setDeactivemodal(false)
        }
    }

    const handleSearch = (e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value,
            page: 1
        }));
    }

    const handlepush = (id: string) => {
        router.push(`/customer-management/customer-details/${id}`)
    }

    return (
        <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
            <Customertable
                data={data}
                setId={setId}
                setIsModalOpen={false}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select"
                        placeholder='Status'
                        onSelect={handleSelect}
                        options={userStatus}
                    />
                ]}
                pagination={data}
                tableParams={tableParams}
                setTableParams={setTableParams}
                activemodal={activemodal}
                setActivemodal={setActivemodal}
                deactivemodal={deactivemodal}
                setDeactivemodal={setDeactivemodal}
                usercontrol={usercontrol}
                setUsercontrol={setUsercontrol}
                handleUsercontrol={handleUsercontrol}
                handlepush={handlepush}
            />
        </div>
    )
}

export default CustomersList;