"use client"

import React, { useState } from 'react'
import Newordertable from './table'
import { Tabslayout } from '@/components/ui/tabs';
import { Tabstitle } from '@/constants/dashboard-ticketscount';
import { Ticketdetails } from './ticketdetails';
import Image from "next/image"
import slidearrow from '@public/icons/slidearrow.svg'
import slide_dark_arrow from '@public/icons/slide_dark_arrow.svg'
import productImg1 from "@public/dummy_product_order_img/productImg1.svg"
import { Badge } from '@/components/ui/badge';
import { BarchartLayout } from './chartLayout';
import { useDashboardQuery, useSalessummarychartQuery } from '@/api-queries/dashboard/queries';
import { useRouter } from 'next/navigation';
import { useOrdersListQuery } from '@/api-queries/orders/queries';
import { customRound } from '@/utils/helper';
import { Spinner } from "@/components/ui/spinner"
import noDataImg from '@public/icons/no_data.svg'
import { useTicketListQuery } from '@/api-queries/customer-support/queries';

export default function DashboardPage() {
    const router = useRouter()
    const [tableParams, setTableParams] = useState({
        page: 1,
        pageSize: 6,
        route: '/orders',
        search: '',
        status: 'new',
    });
    const [ticketParams, setTicketParams] = useState({
        page: 1,
        search: '',
        status: '',
        fromDate: '',
        toDate: '',
        issueType: '',
        user_id: ''
    });

    const { data } = useOrdersListQuery(tableParams, true)
    const { data: TicketList, isFetching } = useTicketListQuery(ticketParams)
    const openTickets = TicketList?.data?.tickets
        .filter((item: any) => item?.status === 'OPEN')
        .slice(0, 2);
    const closedTickets = TicketList?.data?.tickets
        .filter((item: any) => item?.status === 'CLOSE')
        .slice(0, 2);

    const handlepush = (id: string) => {
        router.push(`/orders/order-details/${id}`)
    }

    const { data: dashboard, isFetching: dashboardFetching, isError: dashboardError } = useDashboardQuery()

    const [salesofmonth, setSalesofmonth] = useState<Record<string, any>>({});

    const { data: salessummaryChart, isFetching: saleschartfetching, isError: saleschartError } = useSalessummarychartQuery()


    const Ticketcounttabs: Tabstitle[] = [
        { id: "open_tickets", label: "Open Tickets", count: dashboard?.data?.ticketCount?.OPEN },
        { id: "closed_tickets", label: "Closed Tickets", count: dashboard?.data?.ticketCount?.CLOSE },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col basis-full lg:basis-1/2 gap-3">
                <div className="w-full h-auto p-6 bg-bg_secondary rounded-md lg:h-[100%] md:h-auto">
                    <Newordertable
                        data={data}
                        tableParams={tableParams}
                        setTableParams={setTableParams}
                        handlepush={handlepush}
                    />
                </div>

                <div className={`w-full lg:min-w-[600px] flex flex-col p-6 bg-bg_secondary rounded-md ${saleschartfetching || saleschartError || !salessummaryChart || Object.values(salessummaryChart?.data)?.length === 0 ? 'min-h-[260px] lg:min-h-[260px] md:h-auto' : 'lg:flex-row h-auto'}`} >
                    {saleschartfetching ? (
                        <div className='flex justify-center items-center h-full'>
                            <Spinner />
                        </div>
                    ) : saleschartError || !salessummaryChart || Object.values(salessummaryChart?.data)?.length == 0 ? (
                        <div className="flex flex-col basis-full lg:basis-1/12 gap-3">
                            <label className="text-base font-medium text-secondary whitespace-nowrap">
                                Sales this month
                            </label>
                            <div className='flex flex-col justify-center items-center h-full mt-8'>
                                <Image src={noDataImg} alt='' width={70} height={70} />
                                <p className="text-xs mt-3 text-primary">No Data</p>
                            </div>

                        </div>

                    ) : (
                        <>
                            <div className="flex flex-col basis-full lg:basis-1/12 min-w-[200px]">
                                <label className="text-base font-medium text-grey w-full whitespace-nowrap">
                                    {` Sales ${salesofmonth?.this_month} month`}
                                </label>
                                <label className="text-2xl font-medium text-secondary mt-0 whitespace-nowrap">
                                    {`£${salesofmonth?.sales?.total}`}
                                </label>
                                {/* {(salesofmonth?.sales?.increment != "N/A" && salesofmonth?.sales?.increment && salesofmonth?.sales?.increment != "0") && (
                                    <div className="flex px-1 py-3 w-[75px] h-[32px] items-center justify-center bg-bg_primary rounded-xxl mb-0">
                                        <p className="font-semibold text-xs mr-2">{salesofmonth?.sales?.increment}</p>
                                        <Image src={slide_dark_arrow} width={16} height={16} alt="Increment arrow" />
                                    </div>
                                )} */}
                            </div>
                            <div className="flex flex-col basis-full lg:basis-11/12 min-w-[400px]">
                                <BarchartLayout data={salessummaryChart?.data} setSalesofmonth={setSalesofmonth} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col basis-full lg:basis-1/2 gap-3">
                <div className="w-full h-auto p-6 bg-bg_secondary rounded-md">
                    <label className='text-base font-medium text-primary'>Overview</label>
                    <div className='flex flex-row gap-3 mt-2'>
                        <div>
                            <label className='text-xs font-medium text-grey w-full'>Orders this month</label>
                            <p className='text-sm font-semibold text-secondary'>{dashboard?.data?.n_orders ?? 0}</p>
                        </div>
                        <div>
                            <label className='text-xs font-medium text-grey'>Average daily sales</label>
                            <p className='text-sm font-semibold text-secondary'>
                                {dashboard?.data?.avg_daily_sale ? `£${dashboard?.data?.avg_daily_sale}` : '0'}
                            </p>
                        </div>
                        <div>
                            <label className='text-xs font-medium text-grey'>New customers</label>
                            <p className='text-sm font-semibold text-secondary'>{dashboard?.data?.n_newCustomers ?? 0}</p>
                        </div>
                        <div>
                            <label className='text-xs font-medium text-grey'>New products</label>
                            <p className='text-sm font-semibold text-secondary'>{dashboard?.data?.n_newProducts ?? 0}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto p-6 bg-bg_secondary rounded-md">
                    <Tabslayout
                        title={Ticketcounttabs}
                        expandIcon={true}
                        route={'/customer-support'}
                        content={[
                            <Ticketdetails opentickets={openTickets || []} key={1} loading={isFetching} />,
                            <Ticketdetails closedtickets={closedTickets || []} key={2} loading={isFetching}/>
                        ]}
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full flex flex-col basis-full lg:basis-1/2 gap-3">
                        <div className="w-full h-auto p-6 bg-bg_secondary rounded-md">
                            <div className='flex justify-between '>
                                <label className='text-base font-medium text-secondary'>Product Details</label>
                                {/* <Image className='cursor-pointer' src={slidearrow} alt="" onClick={() => router.push('/stock-management')} /> */}
                            </div>
                            <div>
                                <div className='flex justify-between mt-4'>
                                    <label className='text-xs text-grey font-light'>Products in stock</label>
                                    <Badge variant={'active'}>{dashboard?.data?.stockDetails?.in_stock ?? 0}</Badge>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <label className='text-xs text-grey font-light'>Products low stock</label>
                                    <Badge variant={'low_stock'}>{dashboard?.data?.stockDetails?.low_in_stock ?? 0}</Badge>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <label className='text-xs text-grey font-light'>Products out of stock</label>
                                    <Badge variant={'out_stock'}>{dashboard?.data?.stockDetails?.out_of_stock ?? 0}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className={`w-full p-6 bg-bg_secondary rounded-md ${dashboardFetching || dashboardError || !dashboard || dashboard?.data?.topProducts?.length != 0 ? 'min-h-[260px] lg:min-h-[260px] md:h-auto' : 'lg:flex-row h-auto lg:h-[100%] md:h-auto'}`} >
                            {dashboardFetching ? (
                                <div className='flex justify-center items-center h-full'>
                                    <Spinner />
                                </div>
                            ) : dashboardError || !dashboard || dashboard?.data?.topProducts?.length == 0 ? (
                                <div>
                                    <div className='flex justify-between'>
                                        <label className='text-base font-medium text-secondary'>Top Products</label>
                                        {/* <Image className='cursor-none' src={slidearrow} alt="" onClick={() => router.push('/product-management/top-products')} /> */}
                                    </div>
                                    <div className='flex flex-col justify-center items-center h-full mt-8'>
                                        <Image src={noDataImg} alt='' width={70} height={70} />
                                        <p className="text-xs mt-3 text-primary">No Data</p>
                                    </div>
                                </div>

                            ) : (
                                <>
                                    <div className='flex justify-between'>
                                        <label className='text-base font-medium text-secondary'>Top Products</label>
                                        <Image className='cursor-pointer' src={slidearrow} alt="" onClick={() => router.push('/product-management/top-products')} />
                                    </div>
                                    <div>
                                        {Array.isArray(dashboard?.data?.topProducts) && dashboard?.data?.topProducts?.map((product: any, i: number) => (
                                            <div className='flex items-center justify-items-start mt-4' key={i}>
                                                <Image src={product?.ProductImages?.[0]?.imageUrl} width={40} height={40} alt="" className='h-10' />
                                                <label className='text-xs text-grey font-light ms-3'>{product?.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex flex-col basis-full lg:basis-1/2">
                        <div className="w-full h-auto flex flex-col px-4 py-4 bg-bg_secondary rounded-md lg:h-[100%] md:h-auto">
                            <div className='flex justify-between py-3'>
                                <label className='text-base font-medium text-secondary'>Order Summary</label>
                                {/* <Image className='cursor-pointer' src={slidearrow} alt="" onClick={() => router.push('/orders')} /> */}
                            </div>
                            <div className='flex p-3.5 items-center justify-between bg-bg_primary rounded-xs mb-4'>
                                <label className='text-xs font-semibold text-primary'>New Orders</label>
                                <Badge variant={'order_summary'}>{dashboard?.data?.orderSummary?.new ?? 0}</Badge>
                            </div>
                            <div className='flex p-3.5 items-center justify-between bg-bg_primary rounded-xs mb-4'>
                                <label className='text-xs font-semibold text-primary'>Confirmed Orders</label>
                                <Badge variant={'order_summary'}>{dashboard?.data?.orderSummary?.confirmed ?? 0}</Badge>
                            </div>
                            <div className='flex p-3.5 items-center justify-between bg-bg_primary rounded-xs mb-4'>
                                <label className='text-xs font-semibold text-primary'>Ready To Shipment</label>
                                <Badge variant={'order_summary'}>{dashboard?.data?.orderSummary?.ready ?? 0}</Badge>
                            </div>
                            <div className='flex p-3.5 items-center justify-between bg-bg_primary rounded-xs mb-4'>
                                <label className='text-xs font-semibold text-primary'>Out For Delivery</label>
                                <Badge variant={'order_summary'}>{dashboard?.data?.orderSummary?.out ?? 0}</Badge>
                            </div>
                            <div className='flex p-3.5 items-center justify-between bg-bg_primary rounded-xs mb-4'>
                                <label className='text-xs font-semibold text-primary'>Delivered</label>
                                <Badge variant={'order_summary'}>{dashboard?.data?.orderSummary?.delivered ?? 0}</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

