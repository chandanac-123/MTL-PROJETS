import { DataTable } from "@/components/ui/table";
import view from '@public/icons/view-icon.svg'
import Image from "next/image";
import UpdateStock from "./update-stock";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatId } from "@/utils/helper";

export default function StockTable({ search, onSearch, pagination, tableParams, setTableParams, actionButtons, data }: any) {
    const [update, setUpdate] = useState<string | boolean>(false);
    const [singleData, setSingleData] = useState<string>('');
    const router = useRouter()

    const handleUpdate = (data: any) => {
        setUpdate(data?.original?.id)
        setSingleData(data?.original)
    }

    const columns = [
        {
            header: "Product",
            accessorKey: "product.name",
            cell: ({ row }: any) => {
                return (
                    <div className="flex gap-2 items-center justify-center">
                        <Image src={row?.original?.product?.ProductImages[0]?.imageUrl} alt="" width={44} height={44} className="h-8 rounded-xs bg-outline_grey object-cover" />
                        <div className="flex-1">
                            <div className="font-semibold text-left">{row?.original?.product?.name}</div>
                            <div className="text-text_label pr-3">{formatId(row?.original?.id, 'PRD')}</div>
                        </div>
                    </div>
                )
            }
        },
        {
            header: "Menu",
            accessorKey: "productType",
            cell: ({ row }: any) => {
                return (
                    <div>{row?.original?.product?.productGroups?.map((i: any) => i?.name).join(' , ')}</div>
                )
            }
        },
        {
            header: "Category",
            cell: ({ row }: any) => {
                return (
                    <div>{row?.original?.product?.category?.name}</div>
                )
            }
        },
        {
            header: "Stock",
            accessorKey: "price",
            cell: ({ row }: any) => {
                return (
                    <Badge variant={row?.original?.status == "low-in-stock" ? 'low_stock' : row?.original?.status == "in-stock" ? "active" : "out_stock"}>
                        <div className="flex whitespace-nowrap">{row?.original?.status == "low-in-stock" ? 'Low Stock' : row?.original?.status == "in-stock" ? "In Stock" : "Out Of Stock"}</div>
                    </Badge>
                )
            }

        },
        {
            header: "Stock Quantity",
            accessorKey: "status",
            cell: ({ row }: any) => (
                <button className="underline text-primary" onClick={() => handleUpdate(row)}>
                    {row?.original?.stock}
                </button>
            )

        },
        {
            id: "actions",
            cell: ({ row }: any) => (
                <div className="flex gap-4">
                    <button onClick={() => handleViewClick(row?.original?.id)}>
                        <Image src={view} alt="" />
                    </button>
                </div>
            ),
        },
    ]

    const handelCloseModal = () => {
        setUpdate(false)
    }

    const handleViewClick = (id: any) => {
        router.push(`/stock-management/view/${id}`);
    };

    return (
        <div>
            <DataTable
                data={data}
                title="Stock Management"
                subTitle="Products"
                total={pagination?.totalCount}
                columns={columns}
                actionButtons={actionButtons}
                search={search}
                onSearch={onSearch}
                pagination={pagination}
                setTableParams={setTableParams}
                tableParams={tableParams}
                expandIcon={false}
                paginationVisibile={data?.length > 0 ? true : false}
                rowClick={false}
            />
            <UpdateStock update={update} singleData={singleData} handelCloseModal={handelCloseModal} setTableParams={setTableParams} />
        </div>
    )
}
