"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React, { useState } from 'react'
import Image from "next/image"
import edit from '@public/icons/tabel-edit.svg'
import { DataTable } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import ConfirmationModal from '@/components/modals/confirmation-modal'
import { useCategoryActivateQuery, useCategoryDeactivateQuery } from '@/api-queries/category/category-queries'
import { formatId } from '@/utils/helper'

export default function CategoryTable({ data, setId, actionButtons, onSearch, setIsModalOpen, search, setTableParams, pagination, tableParams }: any) {
    const [actionId, setActionId] = useState('');
    const [activate, setActivate] = useState(false)
    const [deactivate, setDeactivate] = useState(false)
    const { mutateAsync: activate_category } = useCategoryActivateQuery()
    const { mutateAsync: deativate_category } = useCategoryDeactivateQuery()

    const handleActivate = (id: any) => {
        setActionId(id)
        setActivate(!activate)
        setDeactivate(false)
    }
    const handleDeactivate = (id: any) => {
        setActionId(id)
        setDeactivate(!deactivate)
        setActivate(false)
    }

    const handleConfirmClose = () => {
        setDeactivate(false)
        setActivate(false)
    }

    const handleConfirm = async () => {
        try {
            if (activate) {
                await deativate_category({ 'categoryIds': [actionId] });
                setActivate(false)

            } else {
                await activate_category({ 'categoryIds': [actionId] });
                setDeactivate(false)
            }
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const columns = [
        {
            header: "ID",
            accessorKey: "id",
            cell: ({ row }: any) => {
                return (
                    <>{formatId(row?.original?.id,'CAT')}</>
                )
            }
        },
        {
            header: "Category",
            accessorKey: "name",
        },
        {
            header: "No of Products",
            accessorKey: "no_pro",
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
                        <DropdownMenuItem onClick={row?.original?.isActive ? () => handleActivate(row?.original?.id) : () => handleDeactivate(row?.original?.id)} >
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
                columns={columns}
                data={data}
                actionButtons={actionButtons}
                title="Categories"
                subTitle="Categories"
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
                title={!activate ? "Activate Category" : "Deactivate Category"}
                buttonText={!activate ? "Activate" : 'Deactivate'}
                message={activate ? "All products under this category will be removed from the list. Are you sure want to proceed?" :
                    "All products under this category will be listed. Are you sure want to proceed?"} />
        </div>
    )
}
