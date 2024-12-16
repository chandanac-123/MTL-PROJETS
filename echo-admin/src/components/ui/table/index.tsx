"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./pagination"
import { Search } from "../search"
import { Spinner } from "../spinner" // Assume Spinner is a spinner component
import slidearrow from '@public/icons/slidearrow.svg'
import Image from "next/image"
import { useRouter } from "next/navigation"

type DataTableProps<TData extends { id: string }, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title: string
  subTitle: string
  total: string
  search: boolean
  actionButtons: any
  onSearch: any
  pagination: any,
  tableParams: any
  setTableParams: any
  expandIcon: boolean
  paginationVisibile: boolean
  rowClick: boolean
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  title,
  subTitle,
  total,
  search,
  onSearch,
  actionButtons,
  pagination,
  tableParams,
  setTableParams,
  expandIcon,
  paginationVisibile,
  rowClick
}: DataTableProps<TData, TValue>) {
  const router = useRouter()
  const rowsPerPage = 10;
  const page = tableParams.page || 1;
  const [rowSelection, setRowSelection] = useState({})
  const [loading, setLoading] = useState(false);  // Add loading state

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: pagination?.totalCount,
    state: {
      rowSelection,
      pagination: { pageIndex: page, pageSize: rowsPerPage },
    },
    onPaginationChange: () => handlePageChange,
  })

  useEffect(() => {
    setLoading(true);  // Start loading when data fetching begins
    // Simulate data fetching or integrate with actual API call
    setTimeout(() => setLoading(false), 500);  // Example to stop loading after data is fetched
  }, [tableParams]);

  function handlePageChange(newPage: number) {
    setTableParams((prevParams: any) => ({
      ...prevParams,
      page: newPage
    }));
  }

  const totalPageCount = pagination?.totalPages || 0;
  const paginationItems = [];

  for (let i = 1; i <= totalPageCount; i++) {
    if (
      i === 1 ||
      i === totalPageCount ||
      (i >= page && i <= page + 2)
    ) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === page}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    } else if (
      paginationItems[paginationItems.length - 1]?.type !== PaginationEllipsis
    ) {
      paginationItems.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
    }
  }

  const handleRowClick = (row: TData) => {
    router.push(`/orders/order-details/${row?.id}`)
  };

  return (
    <div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex w-full items-center">
          <div className={`${expandIcon ? 'flex-grow' : ""} flex justify-between gap-4`}>
            <div className="flex flex-col justify-center gap-1 text-secondary text-md font-medium">
              {title}
              <div className="text-extra_light_grey text-xs">{total} {subTitle}</div>
            </div>
            {search && <Search onChange={onSearch} />}
            {expandIcon && (
              <div className="ml-auto flex-shrink-0">
                <Image className="cursor-pointer" src={slidearrow} alt="" onClick={() => router.push(tableParams?.route)} />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {actionButtons.map((i: any) => {
            return i
          })}

        </div>
      </div>

      <div className={`${paginationVisibile ? 'min-h-full' : "h-[100%]"}`} >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Spinner />  {/* Render the spinner while loading */}
                </TableCell>
              </TableRow>
            ) : table?.getRowModel().rows.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow className={rowClick ? "cursor-pointer" : ""} key={row.id} data-state={row.getIsSelected() && "selected"} onClick={rowClick ? () => handleRowClick(row?.original) : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {paginationVisibile ? "No results." : "no new orders."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {paginationVisibile && (
          <div className="flex justify-between items-center w-full mt-4">

            <div className="text-grey text-sm ">
              {pagination?.displayRange}
            </div>

            <div className="flex items-center space-x-2">
              <Pagination
                currentPage={page}
                lastPage={pagination?.totalPages}
                setPageIndex={handlePageChange}
              >
                <PaginationContent>
                  <PaginationItem>
                    <PaginationFirst onClick={() => handlePageChange(1)} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(Math.max(page - 1, 0))} />
                  </PaginationItem>
                  {paginationItems}
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(Math.min(page + 1, totalPageCount))} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLast onClick={() => handlePageChange(totalPageCount)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
