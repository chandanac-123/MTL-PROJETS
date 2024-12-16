"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/table'
import Image from "next/image"
import view from '@public/icons/view-icon.svg'
import { capitalizeWords } from '@/utils/helper'

export default function Newordertable({ data, setTableParams, tableParams, handlepush }: any) {

    const columns = [
        {
            header: "Order ID",
            cell: ({ row }: any) => {
                return (
                    <div className='whitespace-nowrap'>{row?.original?.orderId}</div>
                )
            }
        },
        {
            header: "Customer",
            cell: ({ row }: any) => {
                return (
                    <span>
                        {capitalizeWords(
                            `${row?.original?.user?.firstName ?? ""} ${row?.original?.user?.surname ?? ""}`
                        )}
                    </span>
                )
            }
        },
        {
            header: "Total Amount",
            accessorKey: "total",
            cell: ({ row }: any) => {
                return (
                    <div className='flex flex-nowrap gap-1'><span className='text-primary'>£</span>{parseFloat(row?.original?.total)?.toFixed(2)}</div>
                )
            }
        },
        {
            header: "Status",
            cell: ({ row }: any) => {
                return (
                    <Badge variant={row?.original?.status == "NEW" ? "new" : row?.original?.status == "CONFIRMED" ? "confirmed" : row?.original?.status == "PACKING" ? "order_packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "ready_for_shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "out_for_delivery" : row?.original?.status == "DELIVERED" ? "active" : "deleted"}>
                        {row?.original?.status == "NEW" ? "New" : row?.original?.status == "CONFIRMED" ? "Confirmed" : row?.original?.status == "PACKING" ? "Order Packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "Ready For Shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "Out For Delivery" : row?.original?.status == "DELIVERED" ? "Delivered" : "Cancelled"}
                    </Badge>
                )
            }
        }
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data?.data?.records}
                actionButtons={[]}
                title="New Orders"
                subTitle="new orders"
                total={data?.data?.pagination?.totalCount}
                search={false}
                onSearch={''}
                pagination={""}
                tableParams={tableParams}
                setTableParams={setTableParams}
                expandIcon={true}
                paginationVisibile={false}
                rowClick={true}
            />
        </div>
    )
}
