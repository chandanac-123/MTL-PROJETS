import React, { useState } from 'react'
import { DataTable } from '@/components/ui/table'
import Image from 'next/image'
import view from '@public/icons/view-icon.svg'
import edit from '@public/icons/tabel-edit.svg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import ConfirmationModal from '@/components/modals/confirmation-modal'
import { useRouter } from 'next/navigation'
import { capitalizeWords, formatDateWithoutTime } from '@/utils/helper'
import { useCouponActivateQuery, useCouponDeactivateQuery, useCouponDeleteQuery } from '@/api-queries/offers-coupons/queries'

export default function OffersCouponTable({ data, actionButtons, search, onSearch, pagination, tableParams, setTableParams }: any) {
  const router = useRouter()
  const { mutateAsync: activateCoupon, isPending } = useCouponActivateQuery()
  const { mutateAsync: deactivateCoupon, isPending: deativatePending } = useCouponDeactivateQuery()
  const { mutate: deleteCoupon } = useCouponDeleteQuery()
  const [modalState, setModalState] = useState<{ type: string, id: any } | null>(null);

  const handleAction = (type: string, id: any) => {
    setModalState({ type, id });
  };

  const handleConfirm = async () => {
    if (modalState) {
      try {
        switch (modalState.type) {
          case 'activate':
            await activateCoupon(modalState.id);
            break;
          case 'deactivate':
            await deactivateCoupon(modalState.id);
            break;
          case 'delete':
            await deleteCoupon(modalState.id)
            break;
          default:
            break;
        }
        setModalState(null);
      } catch (error) {
        console.log('error: ', error);
      }
    }
  };

  const columns = [
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Name",
      accessorKey: 'name',
    },
    {
      header: "Discount Type",
      accessorKey: 'type',
      cell: ({ row }: any) => {
        return (
          <>{capitalizeWords(row?.original?.type)}</>
        )
      }
    },
    {
      header: "Discount Value",
      accessorKey: 'type',
      cell: ({ row }: any) => {
        return (
          <div className='text-badge_green'>
            {row?.original?.type === 'flat' ?
              <>£ {parseFloat(row?.original?.value)?.toFixed(2)}</> : <>{row?.original?.value} %</>
            }</div>
        )
      }
    },
    {
      header: "Valid From",
      accessorKey: 'validityStart',
      cell: ({ row }: any) => {
        return (
          <>{formatDateWithoutTime(row?.original?.validityStart)}</>
        )
      }
    },
    {
      header: "Valid To",
      accessorKey: 'validityEnd',
      cell: ({ row }: any) => {
        return (
          <>{formatDateWithoutTime(row?.original?.validityEnd)}</>
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
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex gap-4 items-center">
          <button className="w-5 h-5 flex items-center justify-center" onClick={() => router.push(`/offers-coupons/details/${row?.original?.id}`)}>
            <Image src={view} alt="View" className="w-full h-full object-contain" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-1">
              <Image src={edit} alt="" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem onClick={() => router.push(`/offers-coupons/create/?id=${row?.original?.id}`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction(row?.original?.isActive ? 'deactivate' : 'activate', row?.original?.id)}>{row?.original?.isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('delete', row?.original?.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),

    },
  ]

  return (
    <div>
      <DataTable
        data={data}
        total={pagination?.totalCount}
        title="Offers and Coupons"
        columns={columns}
        subTitle="Offers and coupons"
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
        title={modalState?.type === 'activate' ? "Activate Offer/Coupon" : modalState?.type === 'deactivate' ? "Deactivate Offer/Coupon" : "Delete Offer/Coupon"}
        buttonText={modalState?.type === 'delete' ? "Delete" : modalState?.type === 'activate' ? "Activate" : 'Deactivate'}
        message={modalState?.type === 'activate' ? "Are you sure you want to activate this offer/coupon?" :
          modalState?.type === 'deactivate' ? "Are you sure you want to deactivate this offer/coupon?" :
            "Are you sure you want to delete this offer/coupon?"} />
    </div>
  )
}
