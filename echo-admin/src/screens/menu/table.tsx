"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import Image from "next/image"
import edit from '@public/icons/tabel-edit.svg'
import profile from '@public/icons/profile.svg'
import { DataTable } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import ConfirmationModal from '@/components/modals/confirmation-modal'
import { useMenuActivateQuery, useMenuDeactivateQuery } from '@/api-queries/menu/menu-queries'
import { useSearchParams } from 'next/navigation'

export default function MenuTable({ data, actionButtons, onSearch, setId, setIsModalOpen, search, setTableParams, pagination, tableParams }: any) {
    const [actionId, setActionId] = useState('');
    const [activate, setActivate] = useState(false)
    const [deactivate, setDeactivate] = useState(false)
    const { mutateAsync: activate_menu, isPending } = useMenuActivateQuery()
    const { mutateAsync: deactivate_menu, isPending: deactivate_pending } = useMenuDeactivateQuery()
    const { } = useSearchParams()

    const handleActivate = (id: any) => {
        setActivate(!activate)
        setActionId(id)
        setDeactivate(false)
    }
    const handleDeactivate = (id: any) => {
        setDeactivate(!deactivate)
        setActionId(id)
        setActivate(false)
    }

    const handleConfirmClose = () => {
        setDeactivate(false)
        setActivate(false)
    }

    const handleConfirm = async () => {
        try {
            if (activate) {
                await deactivate_menu({ 'groupIds': [actionId] });
                setActivate(false)

            } else {
                await activate_menu({ 'groupIds': [actionId] });
                setDeactivate(false)
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const columns = [
        {
            header: "Menu",
            accessorKey: "menu",
            cell: ({ row }: any) => {
                return (
                    <div className='flex gap-2 items-center'>
                        <Image src={row?.original?.imageUrl ? row?.original?.imageUrl : ''} alt='' width={40} height={40} className='rounded-4xl w-11 h-11 object-contain' />
                        <label>{row?.original?.name}</label>
                    </div>
                )
            }
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }: any) => {
                return (
                    <Badge variant={row?.original?.isActive ? "active" : "inactive"}>{row?.original?.isActive ? "Active" : "Inactive"}</Badge>
                )
            }

        },
        {
            header: "",
            accessorKey: "id",
            cell: ({ row }: any) => (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Image src={edit} alt="" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                            setId(row?.original?.id)
                            setIsModalOpen(true)
                        }}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={row?.original?.isActive ? () => handleActivate(row?.original?.id) : () => handleDeactivate(row?.original?.id)}>
                            {row?.original?.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ]
    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
                actionButtons={actionButtons}
                title="Menu"
                subTitle="Items"
                total={pagination?.totalCount}
                search={search}
                onSearch={onSearch}
                pagination={pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
                expandIcon={false}
                paginationVisibile={true}
                rowClick={false}
            />
            <ConfirmationModal
                onClick={handleConfirm}
                isModalOpen={activate ? activate : deactivate}
                handleCloseModal={handleConfirmClose}
                title={!activate ? "Activate Menu" : "Deactivate Menu"}
                buttonText={!activate ? "Activate" : 'Deactivate'}
                message={!activate ? "This menu will be displayed to the customer. Are you sure you want to proceed?" :
                    "This menu will no longer be displayed to the customer. Are you sure you want to proceed?"} />
        </div>
    )
}
