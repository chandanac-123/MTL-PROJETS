import { DataTable } from '@/components/ui/table'
import { formatId } from '@/utils/helper'
import React from 'react'

export default function ReferralsTable({ data, actionButtons, search, onSearch, pagination, tableParams, setTableParams }: any) {

  const columns = [

    {
      header: "Referral ID",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <>{formatId(row?.original?.id, 'RFR')}</>
        )
      }
    },
    {
      header: "Customer",
      accessorKey: 'customerName',
    },

    {
      header: "Customer ID",
      accessorKey: 'customerId',
      cell: ({ row }: any) => {
        return (
          <>{formatId(row?.original?.customerId, 'CUS')}</>
        )
      }
    },
    {
      header: "Referral Code",
      accessorKey: '',
      cell: ({ row }: any) => {
        return (
          <div className='text-badge_green'>{row?.original?.referralCode}</div>
        )
      }
    },
    {
      header: "No Of Customers",
      accessorKey: 'totalCustomer',
    },
    {
      header: "Credits Earned",
      accessorKey: 'credits',
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-1">
            <div className="text-primary">£</div>
            {parseFloat(row?.original?.credits)?.toFixed(2)}
          </div>
        )
      }
    },
  ]

  return (
    <div>
      <DataTable
        data={data}
        total={''}
        title="Referrals"
        columns={columns}
        subTitle=""
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
