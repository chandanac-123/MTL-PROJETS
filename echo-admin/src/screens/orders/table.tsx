"use client"

import React, { useState } from 'react'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import view from '@public/icons/view-icon.svg'
import edit from '@public/icons/tabel-edit.svg'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { capitalizeWords, dateConversion, downloadFile, formatDateWithoutTime } from '@/utils/helper'
import { useRouter } from 'next/navigation'
import { useOrdersInvoiceQuery } from '@/api-queries/orders/queries'
import ConfirmationModal from '@/components/modals/confirmation-modal'

export default function Orderstable({ data, actionButtons, onSearch, search, setTableParams, tableParams, mainheading, subheading, customercol, handlepush }: any) {
    const router = useRouter()
    const [viewinvoiceModal, setViewinvoiceModal] = useState<boolean>(false);
    const [selectedOrderId, setSelectedOrderId] = useState<any>(false);
    const { data: invoice_download, isFetching } = useOrdersInvoiceQuery(selectedOrderId || '', !!selectedOrderId);

    const handleInvoiceOpen = (id: string) => {
        setSelectedOrderId(id);
        setViewinvoiceModal(true);
    }

    const columns = customercol ?
        [
            {
                header: "Order ID",
                accessorKey: "orderId",
                cell: ({ row }: any) => {
                    return (
                        <div className='whitespace-nowrap'>{row?.original?.orderId}</div>
                    )
                }
            },
            {
                header: "Order Placed On",
                accessorKey: "order_placed_on",
                cell: ({ row }: any) => {
                    return (
                        <>{formatDateWithoutTime(row?.original?.createdAt)}</>
                    )
                }
            },
            {
                header: "Item Count",
                accessorKey: "itemCount",
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
                accessorKey: "status",
                cell: ({ row }: any) => {
                    return (
                        <Badge variant={row?.original?.status == "NEW" ? "new" : row?.original?.status == "CONFIRMED" ? "confirmed" : row?.original?.status == "PACKING" ? "order_packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "ready_for_shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "out_for_delivery" : row?.original?.status == "DELIVERED" ? "active" : row?.original?.status == "CANCELLED" ? "deleted" : "out_for_delivery"}>
                            {row?.original?.status == "NEW" ? "New" : row?.original?.status == "CONFIRMED" ? "Confirmed" : row?.original?.status == "PACKING" ? "Order Packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "Ready For Shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "Out For Delivery" : row?.original?.status == "DELIVERED" ? "Delivered" : row?.original?.status == "CANCELLED" ? "Cancelled" : "Pending"}
                        </Badge>
                    )
                }
            },
            {
                id: "actions",
                cell: ({ row }: any) => (
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-1">
                                <Image src={edit} alt="" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuItem onClick={() => handleInvoiceOpen(row?.original?.id)}>View Invoice</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/orders/order-details/${row?.original?.id}`)}>View Order Details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ),
            },
        ]
        :
        [
            {
                header: "Order ID",
                accessorKey: "orderId",
                cell: ({ row }: any) => {
                    return (
                        <div className=' whitespace-nowrap'>{row?.original?.orderId}</div>
                    )
                }
            },
            {
                header: "Order Placed On",
                cell: ({ row }: any) => {
                    return (
                        <span>{dateConversion(row?.original?.createdAt, 'DD MMM YYYY')}</span>
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
                header: "Item Count",
                accessorKey: "itemCount",
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
                        <Badge variant={row?.original?.status == "NEW" ? "new" : row?.original?.status == "CONFIRMED" ? "confirmed" : row?.original?.status == "PACKING" ? "order_packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "ready_for_shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "out_for_delivery" : row?.original?.status == "DELIVERED" ? "active" : row?.original?.status == "CANCELLED" ? "deleted" : "out_for_delivery"}>
                            {row?.original?.status == "NEW" ? "New" : row?.original?.status == "CONFIRMED" ? "Confirmed" : row?.original?.status == "PACKING" ? "Order Packing" : row?.original?.status == "READY_FOR_SHIPMENT" ? "Ready For Shipment" : row?.original?.status == "OUT_FOR_DELIVERY" ? "Out For Delivery" : row?.original?.status == "DELIVERED" ? "Delivered" : row?.original?.status == "CANCELLED" ? "Cancelled" : "Pending"}
                        </Badge>
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
                    </div>
                ),
            },
        ]

    return (
        <div>
            <DataTable
                columns={columns}
                data={data?.data?.records}
                actionButtons={actionButtons}
                title={mainheading ? "" : "Orders"}
                subTitle={subheading ? "" : "Orders"}
                total={mainheading ? "" : data?.data?.pagination?.totalCount}
                search={search}
                onSearch={onSearch}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
                expandIcon={false}
                paginationVisibile={data?.data?.records?.length > 0 ? true : false}
                rowClick={false}
            />
            <ConfirmationModal
                onClick={() => downloadFile(invoice_download?.data)}
                isModalOpen={viewinvoiceModal}
                handleCloseModal={() => {
                    setViewinvoiceModal(false);
                    setSelectedOrderId('');
                }}
                title="Invoice"
                buttonText="Download Invoice"
                message={
                    <iframe
                        src={invoice_download?.data}
                        title="PDF Preview"
                        width='380px'
                        height='500px'
                    />
                }
            />
        </div>
    )
}
