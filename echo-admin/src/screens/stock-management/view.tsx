'use client'
import { useStockByIdQuery, useStockHistoryQuery } from "@/api-queries/stock-managemant/queries";
import AddEditHeader from "@/common/add-edit-header";
import ReactDatepicker from "@/components/ui/Reactdatepicker";
import { DataTable } from "@/components/ui/table"
import { dateConversion, formatDate, formatId } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react"

export default function StockManagemantView() {
  const router = useRouter();
  const params = useParams()
  const [tableParams, setTableParams] = useState({
    page: 1,
    id: params?.id,
    fromMonth: '',
    toMonth: ''
  })
  const { data, isFetching } = useStockHistoryQuery(tableParams)
  const { data: view_data } = useStockByIdQuery(params?.id)

  const columns = [
    {
      header: 'Date',
      cell: ({ row }: any) => {
        return (
          <div>{formatDate(row?.original?.createdAt)}</div>
        )
      }
    },
    {
      header: "Action",
      accessorKey: "productType",
      cell: ({ row }: any) => {
        return (
          <div>{row?.original?.type == 'INFLOW' ? "Added" : "Removed"}</div>
        )
      }
    },
    {
      header: "Count",
      accessorKey: "quantity",
    },
  ]

  const handleOnClick = (e: any) => {
    e.preventDefault();
    router.push("/stock-management");
  }

  const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
    const [startDate, endDate] = Array.isArray(date) ? date : [null, null]
    setTableParams((prev: any) => ({
        ...prev,
        fromMonth: startDate ? dateConversion(startDate, "YYYY-MM-DD") : "",
        toMonth: endDate ? dateConversion(endDate, "YYYY-MM-DD") : "",
    }));
  };

  return (
    <>
      <AddEditHeader
        head='Stock History'
        onClick={handleOnClick}
        backwardIcon={true}
      />
      <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
        <div className="flex justify-between">
          <p className="flex justify-center items-center ">#{formatId(view_data?.data?.product?.id, 'PRD')} - {view_data?.data?.product?.name}</p>
          <div>
            <ReactDatepicker
              dateRange={true}
              placeholderText="Select Date Range"
              onDateChange={handleDateChange}
              className='w-64 border border-outline_grey bg-bg_secondary placeholder:text-secondary'
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data?.data?.records}
          pagination={data?.data?.pagination}
          setTableParams={setTableParams}
          tableParams={tableParams}
          actionButtons={[]}
          onSearch={() => { }}
          title=""
          subTitle=""
          total=""
          search={false}
          expandIcon={false}
          paginationVisibile={true}
          rowClick={false}
        />
      </div>
    </>

  )
}
