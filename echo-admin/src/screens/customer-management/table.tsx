"use client"

import React from 'react'
import { DataTable } from '@/components/ui/table'
import edit from '@public/icons/tabel-edit.svg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import view from '@public/icons/view-icon.svg'
import { Badge } from '@/components/ui/badge'
import profile from "@public/icons/profile_default.svg"
import ConfirmationModal from '@/components/modals/confirmation-modal'
import { capitalizeWords, formatId } from '@/utils/helper'

export default function Customertable({ data, actionButtons, onSearch, search, setTableParams, pagination, tableParams, activemodal, setActivemodal, deactivemodal, setDeactivemodal, setUsercontrol, handleUsercontrol, handlepush }: any) {

    const columns = [
        {
            header: "Customer Name",
            accessorKey: "customer_id",
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-2">
                            <Image className='rounded-xxl' width={45} height={45} src={profile} alt="" />
                            <div className="flex-1">
                                <div className="font-semibold text-sm">{row?.original?.firstName ? capitalizeWords(row?.original?.firstName) : ""}{" "}{row?.original?.surname ? capitalizeWords(row?.original?.surname) : ""}</div>
                                <div className="text-text_label">{formatId(row?.original?.id, 'CUS')}</div>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            header: "Mobile Number",
            accessorKey: "mobile",
        },
        {
            header: "Email Address",
            accessorKey: "email",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }: any) => {
                return (
                    <Badge variant={row?.original?.isActive == true && row?.original?.isDeleted == false ? "active" : row?.original?.isActive == false && row?.original?.isDeleted == false ? "inactive" : "deleted"}>{row?.original?.isActive == true && row?.original?.isDeleted == false ? 'Active' : row?.original?.isActive == false && row?.original?.isDeleted == false ? 'Inactive' : 'Deleted'}</Badge>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }: any) => (
                <div className="flex gap-4">
                    <button onClick={() => handlepush(row?.original?.id)} className='w-5 h-5 flex items-center justify-center'>
                        <Image src={view} alt="" className="w-full h-full object-contain" />
                    </button>
                    {row?.original?.isDeleted == false ?
                        (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-5 h-5 flex items-center justify-center">
                                    <Image src={edit} alt="" className="w-full h-full object-contain" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center">
                                    <DropdownMenuItem onClick={row?.original?.isActive == true && row?.original?.isDeleted == false ? () => { setDeactivemodal(true); setUsercontrol(row?.original) } : () => { setActivemodal(true); setUsercontrol(row?.original) }} >{row?.original?.isActive == true && row?.original?.isDeleted == false ? "Deactivate" : "Activate"}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) :
                        (
                            <></>
                        )}
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
                title="Customer Management"
                subTitle="Customers"
                total={data?.data?.pagination?.totalCount}
                search={search}
                onSearch={onSearch}
                pagination={data?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
                expandIcon={false}
                paginationVisibile={true}
                rowClick={false}
            />
            <ConfirmationModal
                onClick={() => handleUsercontrol()}
                isModalOpen={activemodal}
                handleCloseModal={() => setActivemodal(false)}
                title="Activate Customer"
                buttonText="Activate"
                message="Are you sure you want to activate this customer?"
            />
            <ConfirmationModal
                onClick={() => handleUsercontrol()}
                isModalOpen={deactivemodal}
                handleCloseModal={() => setDeactivemodal(false)}
                title="Deactivate Customer"
                buttonText="Deactivate"
                message="Are you sure you want to deactivate this customer?"
            />
        </div>
    )
}