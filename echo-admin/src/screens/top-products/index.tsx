"use client"
import { useState } from 'react'
import TopProductTable from './table'
import {  useTopProductListQuery } from '@/api-queries/products/queries'
import { debounce } from '@/utils/helper'

export default function TopProducts() {
    const [tableParams, setTableParams] = useState({
        page: 1,
        isTop: true,
        status: true,
        search: ''
    })
    const { data, isFetching } = useTopProductListQuery(tableParams)

    const handleSearch = debounce((e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value,
            page: 1
        }));
    })

    return (
        <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
            <TopProductTable
                data={data?.data?.records}
                search={true}
                onSearch={handleSearch}
                actionButtons={[]}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}
