"use client"

import Image from "next/image"
import edit from '@public/icons/tabel-edit.svg'
import view from '@public/icons/view-icon.svg'
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/table"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import ConfirmationModal from "@/components/modals/confirmation-modal"
import { useRouter } from "next/navigation"
import { useProductDeleteQuery } from "@/api-queries/products/queries"
import { capitalizeWords, formatId } from "@/utils/helper"

export type Payment = {
  id: string
  product: number
  type: string
  sub_category: string
  price: string
  status: string
}

export default function ProductTable({ data, onSearch, selectedIds, setSelectedIds, actionButtons, search, pagination, tableParams, setTableParams }: any) {
  const router = useRouter();
  const [modalState, setModalState] = useState<{ id: any } | null>(null);
  const { mutate: delete_product } = useProductDeleteQuery()

  const handleAction = (id: string) => {
    setModalState({ id });
  };

  const handleDeleteConfirm = async (id: any) => {
    try {
      await delete_product(id);
      setModalState(null);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  const handleSelectAll = (value: boolean) => {
    if (value) {
      const allIds = data.map((item: any) => item.id);
      setSelectedIds(allIds); // Select all products
    } else {
      setSelectedIds([]); // Deselect all products
    }
  };

  const handleCheckboxChange = (id: string, value: boolean) => {
    if (value) {
      setSelectedIds((prev: any) => [...prev, id]); // Add to selected IDs
    } else {
      setSelectedIds((prev: any) => prev.filter((selectedId: any) => selectedId !== id)); // Remove from selected IDs
    }
  };

  const handleEditClick = (id: any) => {
    router.push(`/product-management/products/add-product?id=${id}`);
  };

  const handleViewClick = (id: any) => {
    router.push(`/product-management/products/detail-view/${id}`);
  };

  const columns = [
    {
      id: "select",
      header: ({ table }: any) => (
        <div className="flex gap-2 items-center">
          <Checkbox
            checked={selectedIds.length === data?.length}
            onCheckedChange={(value) => handleSelectAll(!!value)}
            aria-label="Select all"
          />
          <div className="flex gap-4 items-center text-sm text-muted-foreground">
            Product
            <div className="bg-light_pink h-8 items-center flex px-2 rounded-xs">
              {selectedIds.length} Selected {/* Display count of selected products */}
            </div>
          </div>
        </div>
      ),
      cell: ({ row }: any) => {
        const imageFilter = row?.original?.ProductImages?.filter((item: any) => item?.isPrimary === true).map((item: any) => item?.imageUrl);
        const isChecked = selectedIds.includes(row.original.id); // Check if the product is selected

        return (
          <div className="flex gap-4 items-center w-full">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => handleCheckboxChange(row.original.id, !!value)}
              aria-label="Select row"
            />
            <div className="flex gap-2 items-center justify-center">
              <Image src={imageFilter[0]} alt="" width={44} height={44} className="h-8 rounded-xs bg-outline_grey object-fill" />
              <div className="flex-1">
                <button onClick={() => handleViewClick(row?.original?.id)} className="font-semibold text-left">{row?.original?.name}</button>
                <div className="text-text_label pr-3">{formatId(row?.original?.id, 'PRD')}</div>
              </div>
            </div>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Product\u00A0Type",
      accessorKey: "productType",
      cell: ({ row }: any) => {
        return (
          <>{capitalizeWords(row?.original?.productType)}</>
        )
      }
    },
    {
      header: "Menu",
      accessorKey: "menu",
      cell: ({ row }: any) => {
        const productGroups = row?.original?.productGroups || [];
        return (
          <div>
            {productGroups.length > 0
              ? productGroups.map((item: any, index: number) => (
                <span key={index}>
                  {item?.name}
                  {index < productGroups.length - 1 ? ', ' : ''}
                </span>
              ))
              : 'No menu available'}
          </div>
        );
      },
    },
    {
      header: "Category",
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
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        return (
          <Badge variant={row?.original?.isActive ? "active" : "inactive"}>{row?.original?.isActive ? 'Active' : 'Inactive'}</Badge>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleViewClick(row?.original?.id)}
            className="w-5 h-5 flex items-center justify-center"
          >
            <Image src={view} alt="View" className="w-full h-full object-contain" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-5 h-5 flex items-center justify-center">
              <Image src={edit} alt="Edit" className="w-full h-full object-contain" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleEditClick(row?.original?.id)}
              >
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction(row?.original?.id)}
              >
                Delete Products
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div>
      <DataTable
        title="Products"
        subTitle="Products"
        total={pagination?.totalCount}
        columns={columns}
        data={data}
        actionButtons={actionButtons}
        search={search}
        onSearch={onSearch}
        pagination={pagination}
        setTableParams={setTableParams}
        tableParams={tableParams}
        expandIcon={false}
        paginationVisibile={true}
        rowClick={false}
      />

      <ConfirmationModal
        onClick={() => handleDeleteConfirm(modalState?.id)}
        isModalOpen={modalState !== null}
        handleCloseModal={() => setModalState(null)}
        title="Delete"
        buttonText="Delete"
        message="This product will be permanently removed from the customers list. Are you sure you want to proceed?" />
    </div>
  )
}
