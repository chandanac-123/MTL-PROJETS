"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import CustomeSelect from '@/components/ui/select';
import { ProductStatus } from '@/constants/status';
import AddEditMenu from './add-edit';
import MenuTable from './table';
import { useMenuListQuery } from '@/api-queries/menu/menu-queries';
import { debounce } from '@/utils/helper';

export default function MenuLIst() {
    const [tableParams, setTableParams] = useState({
        page: 1,
        search: '',
        filter: ''
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState(false);
    const { data, isFetching } = useMenuListQuery(tableParams)

    const handleSelect = (value: any) => {
        setTableParams((prevState) => {
            return {
                ...prevState,
                filter: value,
                page: 1
            }
        })
    }

    const handleSearch = debounce((e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value,
            page: 1
        }));
    })

    const handleOpenModal = () => {
        setId(false)
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
            <AddEditMenu
                id={id}
                isModalOpen={isModalOpen}
                setTableParams={setTableParams}
                setIsModalOpen={setIsModalOpen} />
            <MenuTable
                data={data?.data?.records}
                id={id}
                setId={setId}
                setIsModalOpen={setIsModalOpen}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select"
                        placeholder='Status'
                        onSelect={handleSelect}
                        options={ProductStatus} />,
                    <Button
                        key="button"
                        onClick={handleOpenModal}
                        variant="add_button"
                        size="add"
                        label="Add New Menu"
                    />]}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}
