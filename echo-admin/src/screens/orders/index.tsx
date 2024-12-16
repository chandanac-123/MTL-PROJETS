"use client"

import React, { useState } from 'react'
import CustomeSelect from '@/components/ui/select';
import Orderstable from './table';
import { OrderStatus } from '@/constants/status';
import { useOrdersHistoryQuery, useOrdersListQuery } from '@/api-queries/orders/queries';
import { useRouter } from 'next/navigation';
import ReactDatepicker from '@/components/ui/Reactdatepicker';
import { dateConversion } from '@/utils/helper';

interface Ordersprops {
    mainheading: boolean,
    subheading: boolean,
    customercol: Boolean,
    historyId?: string | string[]
}

const OrdersList: React.FC<Ordersprops> = ({ mainheading, subheading, customercol, historyId }) => {
    const router = useRouter();
    const [tableParams, setTableParams] = useState({
        page: 1,
        search: '',
        status: '',
        fromDate: '',
        toDate: '',
        id: historyId
    });

    // Call both hooks unconditionally, but control the API calls with the "enabled" option
    const ordersHistoryQuery = useOrdersHistoryQuery(tableParams, mainheading);
    const ordersListQuery = useOrdersListQuery(tableParams, !mainheading);

    // Select the correct data based on the mainheading value
    const data = mainheading ? ordersHistoryQuery.data : ordersListQuery.data;

    const handleSelect = (value: any) => {
        setTableParams((prevState) => {
            return {
                ...prevState,
                status: value,
                page: 1
            }
        })
    }

    const handleSearch = (e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value,
            page: 1
        }));
    }

    const handlepush = (id: string) => {
        router.push(`/orders/order-details/${id}`)
    }

    const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
        const [startDate, endDate] = Array.isArray(date) ? date : [null, null]
        setTableParams((prev: any) => ({
            ...prev,
            fromDate: startDate ? dateConversion(startDate, "YYYY-MM-DD") : "",
            toDate: endDate ? dateConversion(endDate, "YYYY-MM-DD") : "",
        }));
    };

    return (
        <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
            <Orderstable
                data={data}
                setIsModalOpen={false}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select"
                        placeholder='Status'
                        onSelect={handleSelect}
                        options={OrderStatus}
                    />,
                    <ReactDatepicker
                        key='select_2'
                        onDateChange={(date) => handleDateChange(date)}
                        placeholderText="Select Date Range"
                        label=""
                        dateRange={true}
                        disableFutureDate={true}
                        isClearable={true}
                        className='w-64 border border-outline_grey bg-bg_secondary placeholder:text-secondary'
                    />,
                ]}
                tableParams={tableParams}
                setTableParams={setTableParams}
                mainheading={mainheading}
                subheading={subheading}
                customercol={customercol}
                handlepush={handlepush}
            />
        </div>
    )
}

export default OrdersList;