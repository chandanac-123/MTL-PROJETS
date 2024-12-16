"use client"

import React from 'react'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import view from '@public/icons/view-icon.svg'
import { Badge } from '@/components/ui/badge'
import { dateConversion } from '@/utils/helper'
import { useRouter } from 'next/navigation'

export default function Tickettable({ data, actionButtons, onSearch, search, setTableParams, pagination, tableParams }: any) {

    const router = useRouter()

    const columns = [
        {
            header: "Ticket ID",
            accessorKey: "ticketId",
        },
        {
            header: "Order ID",
            accessorKey: "orderId",
        },
        {
            header: "Issue Category",
            accessorKey: "issueType.name",
        },
        {
            header: "Created On",
            accessorKey: "createdon",
            cell: ({ row }: any) => {
                return (
                    <p className="font-light text-sm whitespace-nowrap">{dateConversion(row?.original?.createdAt, "DD MMM YYYY,HH:mm A")}</p>
                );
            },
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }: any) => {
                return (
                    <Badge variant={row?.original?.status == 'OPEN' ? "confirmed" : "active"}>{row?.original?.status == 'OPEN' ? "Open" : "Closed"}</Badge>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }: any) => (
                <div className="flex gap-4">
                    <button onClick={() => router.push(`/customer-support/ticket/${row?.original?.id}`)}>
                        <Image src={view} alt="" />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                actionButtons={actionButtons}
                title="Tickets"
                subTitle="Tickets"
                total={pagination?.totalCount}
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
