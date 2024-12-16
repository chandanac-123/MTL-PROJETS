import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import React, { useState } from 'react'
import edit from '@public/icons/tabel-edit.svg'
import { Badge } from '@/components/ui/badge'
import { capitalizeWords, formatDateWithoutTime } from '@/utils/helper'
import { useUserStatusChangeQuery, useUserDeleteQuery } from '@/api-queries/user-managament/queries'
import ConfirmationModal from '@/components/modals/confirmation-modal'
import profile from "@public/icons/profile_default.svg"

export default function UserManagementTable({ data, actionButtons, search, onSearch, pagination, tableParams, setTableParams }: any) {
  const { mutate: statusChange, isPending } = useUserStatusChangeQuery()
  const { mutate: userDelete, isPending: deletePending } = useUserDeleteQuery()
  const [modalState, setModalState] = useState<{ type: string, id: any } | null>(null)

  const handleAction = (type: string, id: string) => {
    setModalState({ type, id })
  }

  const handleConfirm = async () => {
    if (modalState) {
      try {
        switch (modalState.type) {
          case 'activate':
            await statusChange(modalState.id)
            break
          case 'deactivate':
            await statusChange(modalState.id)
            break
          case 'delete':
            await userDelete(modalState.id)
            break
          default:
            break
        }
        setModalState(null)
      } catch (error) {
      }
    }
  }

  const columns = [
    {
      header: 'User',
      accessorKey: 'firstName',
      cell: ({ row }: any) => {
        return (
          <div className='flex items-center gap-1 pr-6'>
            <Image src={profile} alt="" width={45} height={45} className="rounded-xxxl" />
            <p className='font-semibold'>{row?.original?.firstName} {row?.original?.surname}</p>
          </div>
        )
      }
    },
    {
      header: 'User Role',
      accessorKey: 'role',
      cell: ({ row }: any) => {
        return <>{capitalizeWords(row?.original?.roles?.[0]?.name)}</>
      }
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Joined Date',
      accessorKey: '',
      cell: ({ row }: any) => {
        return <div className='whitespace-nowrap'>{formatDateWithoutTime(row?.original?.createdAt)}</div>
      }
    },
    {
      header: 'Status',
      accessorKey: '',
      cell: ({ row }: any) => {
        return (
          <Badge variant={row?.original?.isDeleted ? 'deleted' : row?.original?.isActive ? 'active' : 'inactive'}>
            {row?.original?.isDeleted ? "Deleted" : row?.original?.isActive ? 'Active' : 'Inactive'}
          </Badge>
        )
      }
    },
    {
      header: '',
      accessorKey: 'id',
      cell: ({ row }: any) => (
        <DropdownMenu>
          {!row?.original?.isDeleted && <DropdownMenuTrigger className="w-5 h-5 flex items-center justify-center">
            <Image src={edit} alt="" />
          </DropdownMenuTrigger>}
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleAction(row?.original?.isActive ? 'deactivate' : 'activate', row?.original?.id)}
            >
              {row?.original?.isActive ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction('delete', row?.original?.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div>
      <DataTable
        data={data}
        total={pagination?.totalCount}
        title="User Management"
        columns={columns}
        subTitle="Users"
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
      <ConfirmationModal
        onClick={handleConfirm}
        isModalOpen={modalState !== null}
        handleCloseModal={() => setModalState(null)}
        title={modalState?.type === 'activate' ? 'Activate User' : modalState?.type === 'deactivate' ? 'Deactivate User' : 'Delete User'}
        buttonText={modalState?.type === 'activate' ? 'Activate' : modalState?.type === 'deactivate' ? 'Deactivate' : 'Delete'}
        message={
          modalState?.type === 'activate'
            ? 'Are you sure you want to activate this user?'
            : modalState?.type === 'deactivate'
              ? 'Are you sure you want to deactivate this user?'
              : 'Are you sure you want to delete this user?'
        }
      />
    </div>
  )
}
