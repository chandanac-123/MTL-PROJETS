"use client"

import React from 'react'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import profile from "@public/icons/profile_default.svg"
import { currencyFormat, customRound, formatDateWithoutTime, formatId } from '@/utils/helper'

export default function OffercouponUsertable({ data, actionButtons, onSearch, search, setTableParams, pagination, tableParams }: any) {

    const columns = [
        {
            header: "Customer",
            accessorKey: "customer",
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-2">
                            <Image className='rounded-xxl' width={45} height={45} src={profile} alt="" />
                            <div className="flex-1">
                                <div className="font-semibold text-sm">{row?.original?.User?.firstName} {row?.original?.User?.surname}</div>
                                <div className="text-text_label">#{formatId(row?.original?.User?.id, 'CUS')}</div>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Order ID",
            accessorKey: "Order.orderId",
        },
        {
            header: "Date Redeemed",
            accessorKey: "date_redeemed",
            cell: ({ row }: any) => {
                return (
                    <div>{formatDateWithoutTime(row?.original?.createdAt)}</div>
                )
            }
        },
        {
            header: "Total Price",
            accessorKey: "total_amount",
            cell: ({ row }: any) => {
                return (
                    <div className='flex gap-1'><p className='text-primary'>£ </p> {currencyFormat(customRound(row?.original?.Order?.total))}</div>
                )
            }
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                actionButtons={actionButtons}
                title=""
                subTitle=""
                total={''}
                search={search}
                onSearch={onSearch}
                pagination={pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
                expandIcon={false}
                paginationVisibile={data?.length > 0 ? true : false}
                rowClick={false}
            />
        </div>
    )
}
