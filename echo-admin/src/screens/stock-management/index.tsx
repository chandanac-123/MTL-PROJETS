'use client'
import { useState } from "react"
import StockTable from "./table"
import CustomeSelect from "@/components/ui/select"
import { useStockListQuery } from "@/api-queries/stock-managemant/queries"
import { debounce } from "@/utils/helper"
import { StockStatus } from "@/constants/stock-status"

export default function StockManagementList() {

    const [tableParams, setTableParams] = useState({
        page: 1,
        search: '',
        status: '',
    })
    const { data, isFetching } = useStockListQuery(tableParams)

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


    return (
        <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
            <StockTable
                data={data?.data?.records}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select_1"
                        placeholder='Stock'
                        options={StockStatus}
                        onSelect={handleSelect}
                    />,
                ]}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}
