"use client"

import Image from "next/image"
import edit from '@public/icons/tabel-edit.svg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { DataTable } from "@/components/ui/table"
import DeleteModal from "@/components/modals/confirmation-modal"
import { useBrandDeleteQuery } from "@/api-queries/brands/querirs"
import { formatId } from "@/utils/helper"

export default function BrandTable({ data, setId, setIsModalOpen, onSearch, actionButtons, search, pagination, tableParams, setTableParams }: any) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<any>('');
  const { mutateAsync: deleteBrand, isPending } = useBrandDeleteQuery()

  const handleOpenDeleteModal = (id: any) => {
    setSelectedBrandId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBrandId('');
  };

  const confirmDelete = async () => {
    if (selectedBrandId) {
      try {
        await deleteBrand(selectedBrandId);
        setIsDeleteModalOpen(false);
        setSelectedBrandId(''); // Reset after deletion
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }: any) => {
        return (
          <>{formatId(row?.original?.id, 'BRD')}</>
        )
      }
    },
    {
      header: "Brand Name",
      accessorKey: "name",
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
            }
            }>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleOpenDeleteModal(row?.original?.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]


  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        actionButtons={actionButtons}
        title="Brands"
        subTitle="brands"
        total={pagination?.totalCount}
        search={search}
        onSearch={onSearch}
        pagination={pagination}
        setTableParams={setTableParams}
        tableParams={tableParams}
        expandIcon={false}
        paginationVisibile={true}
        rowClick={false}
      />
      <DeleteModal
        onClick={confirmDelete}
        isModalOpen={isDeleteModalOpen}
        handleCloseModal={handleCloseDeleteModal}
        title="Delete Brand"
        buttonText='Delete'
        message="All products associated with this brand will be removed from the list. Are you sure you want to proceed?" />
    </>
  )
}