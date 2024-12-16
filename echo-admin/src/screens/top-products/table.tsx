'use client'
import { DataTable } from '@/components/ui/table'
import { formatId } from '@/utils/helper';
import Image from 'next/image';
import React from 'react'

export default function TopProductTable({ data, actionButtons, search, onSearch, pagination, tableParams, setTableParams }: any) {

    const columns = [
        {
            header: "Product",
            accessorKey: "id",
            cell: ({ row }: any) => {
                const imageFilter = row?.original?.ProductImages?.filter((item: any) => item?.isPrimary === true).map((item: any) => item?.imageUrl);
                return (
                    <div className="flex gap-2">
                        <Image src={imageFilter[0]} alt="" width={44} height={44} className="rounded-xs h-10 bg-outline_grey object-cover" />
                        <div className="flex-1">
                            <div className="font-semibold">{row?.original?.name}</div>
                            <div className="text-text_label">{formatId(row?.original?.id,'PRD')}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            header: "Product Type",
            accessorKey: "productType",
        },
        {
            header: "Product Category",
            accessorKey: 'category.name',
        },
        {
            header: "Price",
            accessorKey: "price",
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-1">
                        <div className="text-primary">£</div>
                        {parseFloat(row?.original?.price)?.toFixed(2)}
                    </div>
                )
            }
        },
        {
            header: "Total Order Qty",
            accessorKey: 'n_order',
        },
    ]

    return (
        <div>
            <DataTable
                data={data}
                total={pagination?.totalCount}
                title="Top Products"
                columns={columns}
                subTitle="Products"
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
