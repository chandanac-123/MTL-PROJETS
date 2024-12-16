"use client"

import React, { useState } from 'react'
import CategoryTable from './table'
import AddEditCategory from './add-edit';
import { Button } from '@/components/ui/button';
import CustomeSelect from '@/components/ui/select';
import { ProductStatus } from '@/constants/status';
import { useCategoryListQuery } from '@/api-queries/category/category-queries';
import { debounce } from '@/utils/helper';

export default function CategoryLIst() {
    const [tableParams, setTableParams] = useState({
        page: 1,
        filter: '',
        search: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState(false);
    const { data, isLoading } = useCategoryListQuery(tableParams)

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
            <AddEditCategory
                id={id}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setTableParams={setTableParams}
            />
            <CategoryTable
                data={data?.data?.records}
                setId={setId}
                setIsModalOpen={setIsModalOpen}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select"
                        placeholder='Status'
                        onSelect={handleSelect}
                        options={ProductStatus}
                    />,
                    <Button
                        key="button"
                        onClick={handleOpenModal}
                        variant="add_button"
                        size="add"
                        label="Add New Category"
                    />]}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}
