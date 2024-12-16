"use client"

import React, { useState } from 'react'
import OffercouponUsertable from './table';
import Offercoupontotaldetails from '../offer-coupon-totaldetails';
import { useCouponHistortQuery } from '@/api-queries/offers-coupons/queries';
import { useParams } from 'next/navigation';

const OffercouponUserlist = (couponData: any) => {
    const params = useParams()
    const [tableParams, setTableParams] = useState({
        page: 1,
        id: params?.id,
        search: ''
    });
    const { data, isFetching } = useCouponHistortQuery(tableParams)
    console.log('data: ', data);

    const handleSelect = (value: any) => {
        setTableParams((prevState) => {
            return {
                ...prevState,
                filter: value
            }
        })
    }

    const handleSearch = (e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value
        }));
    }

    return (
        <div className="flex flex-col w-full gap-4 p-0 bg-bg_secondary rounded-md ">
            <Offercoupontotaldetails couponData={couponData} />
            <OffercouponUsertable
                data={data?.data?.records}
                setIsModalOpen={false}
                search={false}
                onSearch={handleSearch}
                actionButtons={[]}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}

export default OffercouponUserlist;