import React from 'react'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import view from '@public/icons/view-icon.svg'
import { useRouter } from 'next/navigation'
import { dateConversion } from '@/utils/helper'

export default function CustomerSupportTable({ data, actionButtons, search, onSearch, pagination, tableParams, setTableParams, handlepush }: any) {

  const router = useRouter()

  const columns = [

    {
      header: "ID",
      accessorKey: "ticketId",
    },
    {
      header: "Customer",
      accessorKey: 'customer',
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-1 items-center">
            <p className="font-light text-sm break-words whitespace-wrap">{`${row?.original?.user?.firstName} ${row?.original?.user?.surname ?? ""}`}</p>
            {row?.original?.unreadCount != 0 && <Badge variant="ticket_count">{row?.original?.unreadCount}</Badge>}
          </div>
        );
      },
    },

    {
      header: "Order ID",
      accessorKey: 'orderId',
    },
    {
      header: "Issue Category",
      accessorKey: 'issueType.name',
    },
    {
      header: "Created On",
      cell: ({ row }: any) => {
        return (
          <p className="font-light text-sm whitespace-nowrap">{dateConversion(row?.original?.createdAt, "DD MMM YYYY, HH:mm A")}</p>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        return (
          <Badge variant={row?.original?.status == "OPEN" ? "confirmed" : "active"}>{row?.original?.status == "OPEN" ? "Open" : "Closed"}</Badge>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex gap-4">
          <button className="w-5 h-5 flex items-center justify-center" onClick={() => handlepush(row?.original?.id)}>
            <Image src={view} alt="" />
          </button>
        </div >
      ),
    },
  ]

  return (
    <div>
      <DataTable
        data={data}
        total={pagination?.totalCount}
        title="Tickets"
        columns={columns}
        subTitle="Tickets"
        search={search}
        onSearch={onSearch}
        actionButtons={actionButtons}
        pagination={pagination}
        setTableParams={setTableParams}
        tableParams={tableParams}
        expandIcon={false}
        paginationVisibile={true}
        rowClick={false}
      />
    </div>
  )
}
