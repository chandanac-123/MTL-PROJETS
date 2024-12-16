'use client'
import { debounce } from '@/utils/helper'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CustomeSelect from '@/components/ui/select'
import UserManagementTable from './table'
import AddUser from './add-user'
import { useGetUserQuery } from '@/api-queries/user-managament/queries'
import {  userStatus } from '@/constants/status'

export default function UserManagement() {
  const [tableParams, setTableParams] = useState({
    page: 1,
    status: '',
    search: ''
  })
  const { data, isFetching } = useGetUserQuery(tableParams)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  const handleSelect = (value: any) => {
    setTableParams((prevState) => {
        return {
            ...prevState,
            status: value,
            page: 1
        }
    })
}

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
      <UserManagementTable
        data={data?.data?.records}
        search={true}
        onSearch={handleSearch}
        actionButtons={[
          <CustomeSelect
            key="select"
            placeholder='Status'
            options={userStatus}
            onSelect={handleSelect}
          />,
          <Button
            key="button"
            variant="add_button"
            size="add"
            label="Add New User"
            onClick={handleOpenModal}
          />]}
        pagination={data?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams} />
      <AddUser
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)} />
    </div>
  )
}
