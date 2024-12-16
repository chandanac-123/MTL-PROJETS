"use client"

import React, { useState } from 'react'
import AddEditHeader from '@/common/add-edit-header'
import { useParams, useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SelectSeparator } from '@/components/ui/search-select/select';
import Image from "next/image";
import customerprofile from '@public/icons/customerprofile.svg'
import contactno from '@public/icons/contactno.svg'
import mail from '@public/icons/mail.svg'
import view from '@public/icons/view-icon.svg'
import profile from "@public/icons/profile_default.svg"
import location from "@public/icons/location.svg"
import card from "@public/icons/card.svg"
import product from "@public/icons/product.svg"
import ordertimeline from "@public/icons/ordertimeline.svg"
import { TimelineElement, TimelineLayout } from '@/components/ui/timeline/timelinelayout';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import { useOrderGetByIdQuery, useOrderStatusUpdateQuery, useOrdersInvoiceQuery } from '@/api-queries/orders/queries';
import { capitalizeWords, downloadFile } from '@/utils/helper';

export default function Orderdetails() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [confirmOrderModal, setConfirmOrderModal] = useState<boolean>(false);
    const [viewinvoiceModal, setViewinvoiceModal] = useState<boolean>(false);
    const { data: invoice_download, isFetching } = useOrdersInvoiceQuery(id, true)

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/orders");
    }

    const handleInvoiceOpen = () => {
        setViewinvoiceModal(true)
    }

    const { data: orderDetails } = useOrderGetByIdQuery({ id: id, enable: true })

    const { mutateAsync: OrderstatusUpdate, isPending } = useOrderStatusUpdateQuery()

    const order_timeline = orderDetails?.data?.timeline?.map((timeline: TimelineElement, i: number) => ({
        id: timeline?.id,
        status: timeline?.status == "NEW" ? "Order Placed" : timeline?.status == "CONFIRMED" ? "Order Confirmed" : timeline?.status == "PACKING" ? "Order Packing" : timeline?.status == "READY_FOR_SHIPMENT" ? "Ready for Shipment" : timeline?.status == "OUT_FOR_DELIVERY" ? "Out for Delivery" : timeline?.status == "DELIVERED" ? "Delivered" : timeline?.status == "CANCELLED" ? "Cancelled" : "Pending",
        orderId: orderDetails?.data?.orderId,
        createdAt: timeline?.createdAt,
        updatedAt: timeline?.updatedAt,
    }))?.reverse()

    const handleConfirmorder = async () => {
        setConfirmOrderModal(false)
        await OrderstatusUpdate({
            data: {
                status: orderDetails?.data?.status == "NEW" ? "CONFIRMED" : orderDetails?.data?.status == "CONFIRMED" ? "PACKING" : orderDetails?.data?.status == "PACKING" ? "READY_FOR_SHIPMENT" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "OUT_FOR_DELIVERY" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "DELIVERED" : ""
            }, id: orderDetails?.data?.id
        })
    }

    return (
        <div>
            <div className="flex flex-col gap-6 h-full w-full">
                <AddEditHeader
                    head="Order Details"
                    onClick={handleOnClick}
                    backwardIcon={true}
                />
            </div>
            <div className="w-full px-6 py-3.5 bg-bg_secondary rounded-base">
                <div className='flex justify-between'>
                    <div className='flex items-center gap-2'>
                        <label className='text-md font-medium'>{`Order ID: ${orderDetails?.data?.orderId ?? '--'}`}</label>
                        <Badge variant={orderDetails?.data?.status == "NEW" ? "new" : orderDetails?.data?.status == "CONFIRMED" ? "confirmed" : orderDetails?.data?.status == "PACKING" ? "order_packing" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "ready_for_shipment" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "out_for_delivery" : orderDetails?.data?.status == "DELIVERED" ? "active" : orderDetails?.data?.status == "CANCELLED" ? "deleted" : "out_for_delivery"}>
                            {orderDetails?.data?.status == "NEW" ? "New" : orderDetails?.data?.status == "CONFIRMED" ? "Confirmed" : orderDetails?.data?.status == "PACKING" ? "Packing" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "Ready For Shipment" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "Out For Delivery" : orderDetails?.data?.status == "DELIVERED" ? "Delivered" : orderDetails?.data?.status == "CANCELLED" ? "Cancelled" : ""}
                        </Badge>
                    </div>
                    <div className='flex gap-2'>
                        <Button
                            key="add_button_1"
                            variant="view_invoice"
                            size="add"
                            label="View Invoice"
                            onClick={handleInvoiceOpen}
                        />
                        {orderDetails?.data?.status == "PENDING" || orderDetails?.data?.status == "CANCELLED" || orderDetails?.data?.status == "DELIVERED" ?
                            <></> :
                            <Button
                                key="add_button_2"
                                variant="confirm_order"
                                size="add"
                                label={`${orderDetails?.data?.status == "NEW" ? "Confirm Order" : orderDetails?.data?.status == "CONFIRMED" ? "Mark As Order Packing" : orderDetails?.data?.status == "PACKING" ? "Mark As Ready For Shipment" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "Mark As Out For Delivery" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "Mark As Delivered" : "Confirm Order"}`}
                                onClick={() => setConfirmOrderModal(true)}
                                disabled={orderDetails?.data?.status == "PENDING" || orderDetails?.data?.status == "CANCELLED" || orderDetails?.data?.status == "DELIVERED" || orderDetails?.data?.paymentStatus == "PENDING"}
                            />

                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-3">
                <div className="flex flex-col basis-full lg:basis-1/2 gap-3">
                    <div className="w-full p-6 bg-bg_secondary rounded-md">
                        <div className='flex justify-items-start gap-4'>
                            <Image src={customerprofile} alt="" />
                            <label className='text-md font-medium'>Customer Details</label>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div className='flex items-center justify-items-start gap-4'>
                                <Image src={profile} alt="" width={50} height={50} className="rounded-xxxl" />
                                <label className='text-sm font-medium'>
                                    {capitalizeWords(
                                        `${orderDetails?.data?.user?.firstName ?? ""} ${orderDetails?.data?.user?.surname ?? ""}`
                                    )}
                                </label>

                            </div>
                            <button onClick={() => router.push(`/customer-management/customer-details/${orderDetails?.data?.userId}`)}>
                                <Image src={view} alt="" />
                            </button>
                        </div>
                        <SelectSeparator className="my-4 bg-light_pink" />
                        <div className='flex flex-col'>
                            <label className='text-sm text-badge_grey font-semibold'>Contact Info</label>
                            <div className='flex justify-items-start gap-2 mt-4'>
                                <Image src={contactno} width={26} height={26} alt="" />
                                <label className='text-sm font-medium'>{orderDetails?.data?.user?.mobile ?? '--'}</label>
                            </div>
                            <div className='flex justify-items-start gap-2 mt-4'>
                                <Image src={mail} width={26} height={26} alt="" />
                                <label className='text-sm font-medium'>{orderDetails?.data?.user?.email ?? '--'}</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 bg-bg_secondary rounded-md">
                        <div className='flex justify-items-start gap-4'>
                            <Image src={location} alt="" />
                            <label className='text-md font-medium'>Delivery Details</label>
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <div className="flex flex-col ml-7 whitespace-pre-line w-6/12">
                                {orderDetails?.data?.address?.addressLine1 && <p className='text-sm font-medium'>{orderDetails?.data?.address?.addressLine1}{','}</p>}
                                {orderDetails?.data?.address?.addressLine2 && <p className='text-sm font-medium'>{orderDetails?.data?.address?.addressLine2}{','}</p>}
                                {orderDetails?.data?.address?.city && <p className='text-sm font-medium'>{orderDetails?.data?.address?.city}{','}</p>}
                                {orderDetails?.data?.address?.postalCode && <p className='text-sm font-medium'>{orderDetails?.data?.address?.postalCode}{'.'}</p>}
                            </div>
                            <Badge variant="new">{orderDetails?.data?.address?.locationTag?.charAt(0)?.toUpperCase() + orderDetails?.data?.address?.locationTag?.slice(1)}</Badge>
                        </div>
                        <SelectSeparator className="my-4 bg-light_pink" />
                        <div className='flex items-center justify-between mt-4'>
                            <p className='flex-wrap text-sm font-medium'>Delivery Instructions</p>
                            <p className='flex-wrap text-sm text-dark_sandal font-medium'>{orderDetails?.data?.address?.deliveryOption?.charAt(0)?.toUpperCase() + orderDetails?.data?.address?.deliveryOption?.slice(1)?.replace(/([A-Z])/g, ' $1')}</p>
                        </div>
                    </div>
                    <div className="w-full p-6 bg-bg_secondary rounded-base">
                        <label className='flex-wrap text-sm text-dark_sandal font-medium'>Payment Mode</label>
                        <div className='flex justify-items-start mt-4 gap-4'>
                            <Image src={card} alt="" />
                            <label className='text-sm font-medium'>{orderDetails?.data?.paymentMode?.charAt(0) + orderDetails?.data?.paymentMode?.slice(1).toLowerCase()}</label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col basis-full lg:basis-1/2 gap-3">
                    <div className="w-full p-6 bg-bg_secondary rounded-md">
                        <div className='flex justify-items-start gap-4'>
                            <Image src={product} alt="" />
                            <label className='text-md font-medium'>Product Details</label>
                        </div>

                        {orderDetails?.data?.items?.map((product: any, i: number) => (
                            <div key={i}>
                                <div className='flex justify-between mt-4' key={i}>
                                    <div className='flex justify-items-start gap-3 w-full '>
                                        <Image src={product?.product?.ProductImages?.[0]?.imageUrl} width={70} height={70} alt="" className="rounded-xs h-12 object-contain" />
                                        <div className='flex justify-center flex-col w-3/4'>
                                            <p className='text-sm font-medium'>{product?.productName}</p>
                                            <p className='text-xs text-badge_grey font-medium'>{product?.product?.brand?.name}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col text-right'>
                                        <p className='text-base font-semibold'>{`£${product?.totalPrice}`}</p>
                                        <p className='text-sm text-badge_grey'>{`Qty:${product?.quantity}`}</p>
                                    </div>
                                </div>
                                <SelectSeparator key={i} className="my-4 bg-light_pink" />
                            </div>
                        ))}

                        <div className='flex flex-col'>
                            <label className='text-base font-medium'>Price Details</label>
                            <div className='flex justify-between mt-5'>
                                <p className='text-sm font-light'>Sub Total</p>
                                <p className='text-sm font-light'>{orderDetails?.data?.subtotal ? `£${orderDetails.data.subtotal.toFixed(2)}` : '£0'}</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <p className='text-sm font-light'>Delivery Fee</p>
                                <p className='text-sm font-light'>{orderDetails?.data?.deliveryFee ? `£${orderDetails.data.deliveryFee.toFixed(2)}` : '£0'}</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <p className='text-sm font-light'>Service Fee</p>
                                <p className='text-sm font-light'>{orderDetails?.data?.serviceFee ? `£${orderDetails.data.serviceFee.toFixed(2)}` : '£0'}</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <p className='text-sm font-light'>Small Order Fee</p>
                                <p className='text-sm font-light'>{orderDetails?.data?.smallOrderFee ? `£${orderDetails.data.smallOrderFee.toFixed(2)}` : '£0'}</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <div className='flex justify-items-start gap-3'>
                                    <p className='text-sm font-light'>Coupon Discount</p>
                                    {orderDetails?.data?.couponName && <Badge variant="active">{orderDetails?.data?.couponName}</Badge>}
                                </div>
                                <p className='text-sm font-light text-badge_green'>{orderDetails?.data?.couponDiscount ? `-£${orderDetails.data.couponDiscount.toFixed(2)}` : '£0'}</p>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <p className='text-sm font-light'>Credits</p>
                                <p className='text-sm font-light text-badge_green'>{orderDetails?.data?.creditApplied ? `-£${orderDetails.data.creditApplied.toFixed(2)}` : '£0'}</p>
                            </div>
                        </div>
                        <SelectSeparator className="my-4 bg-light_pink" />
                        <div className='flex justify-between mt-3'>
                            <p className='text-sm font-medium'>Total Amount</p>
                            <p className='text-sm font-light'>{orderDetails?.data?.total ? `£${orderDetails.data.total.toFixed(2)}` : '£0'}</p>
                        </div>
                    </div>
                    <div className="w-full px-6 py-3.5 bg-bg_secondary rounded-md">
                        <div className='flex justify-items-start mt-4 mb-6 gap-4'>
                            <Image src={ordertimeline} alt="" />
                            <label className='text-md font-medium'>Order Timeline</label>
                        </div>
                        <div className='flex justify-items-start'>
                            <TimelineLayout items={order_timeline} />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmationModal
                onClick={() => handleConfirmorder()}
                isModalOpen={confirmOrderModal}
                handleCloseModal={() => setConfirmOrderModal(!confirmOrderModal)}
                title={`${orderDetails?.data?.status == "NEW" ? "Confirm Order" : orderDetails?.data?.status == "CONFIRMED" ? "Mark As Order Packing" : orderDetails?.data?.status == "PACKING" ? "Mark As Ready For Shipment" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "Mark As Out For Delivery" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "Mark As Delivered" : ""}`}
                buttonText={`${orderDetails?.data?.status == "NEW" ? "Confirm Order" : orderDetails?.data?.status == "CONFIRMED" ? "Mark As Order Packing" : orderDetails?.data?.status == "PACKING" ? "Mark As Ready For Shipment" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "Mark As Out For Delivery" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "Mark As Delivered" : ""}`}
                message={`Are you sure you want to ${orderDetails?.data?.status == "NEW" ? "confirm this order" : orderDetails?.data?.status == "CONFIRMED" ? "mark this order as order packing" : orderDetails?.data?.status == "PACKING" ? "mark this order as ready for shipment" : orderDetails?.data?.status == "READY_FOR_SHIPMENT" ? "mark this order as out for delivery" : orderDetails?.data?.status == "OUT_FOR_DELIVERY" ? "mark this order as delivered" : ""}?`}
            />
            <ConfirmationModal
                onClick={() => downloadFile(invoice_download?.data)}
                isModalOpen={viewinvoiceModal}
                handleCloseModal={() => setViewinvoiceModal(!viewinvoiceModal)}
                title="Invoice"
                buttonText="Download Invoice"
                message={<iframe src={invoice_download?.data} title="PDF Preview" width='380px' height='500px' />}
            />
        </div >
    )
}
