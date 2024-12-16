"use client"

import React, { useState } from 'react'
import AddEditHeader from '@/common/add-edit-header'
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import profile from "@public/icons/profile_default.svg"
import { Badge } from '@/components/ui/badge';
import { SelectSeparator } from '@/components/ui/select/select';
import { Tabslayout } from '@/components/ui/tabs';
import { Customertabs } from '@/constants/customer-tabs-title';
import { Button } from '@/components/ui/button';
import OrdersList from '../orders';
import { Customeraddress } from './customer-address';
import { useCustomeractive_deactiveQuery, useCustomerGetByIdQuery } from '@/api-queries/customer-management/queries';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import { dateConversion, formatId } from '@/utils/helper';
import { Ticketlist } from './tickets';

export interface Collapsibledetails {
    id: String | null,
    userId: String | null,
    addressLine1?: String | null,
    addressLine2?: String | null,
    city?: String | null,
    postalCode?: String | null,
    landmark?: String | null,
    locationTag?: String | null,
    deliveryOption?: String | null,
    deliveryNotes?: String | null,
    latitude?: Number | null,
    longitude?: Number | null,
    isDefault?: Boolean | null,
    createdAt?: String | null,
    updatedAt?: String | null
}

export interface Customeraddresslist {
    Address: Collapsibledetails[]
}

export default function Customerdetails() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { data: customerdetails, isLoading } = useCustomerGetByIdQuery({ id: id, enable: true })
    console.log('customerdetails: ', customerdetails?.data?.orders[0]?.orderId);
    const [activemodal, setActivemodal] = useState(false)
    const [deactivemodal, setDeactivemodal] = useState(false)
    const [usercontrol, setUsercontrol] = useState({})
    const { mutate: activateDeactivateUser, isSuccess, isError, error, isPending } = useCustomeractive_deactiveQuery();

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/customer-management");
    }

    const handleUsercontrol = () => {
        if (usercontrol && 'id' in usercontrol && 'isActive' in usercontrol && 'isDeleted' in usercontrol) {
            const status = usercontrol.isActive && !usercontrol.isDeleted ? "deactivate" : "activate";
            const userId = usercontrol.id
            activateDeactivateUser({ userId, status });
            setActivemodal(false)
            setDeactivemodal(false)
        }
    }

    return (
        <div>
            <div className="flex flex-col gap-6 h-full w-full">
                <AddEditHeader
                    head="Customer Details"
                    onClick={handleOnClick}
                    backwardIcon={true}
                />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mt-3">
                <div className="flex flex-col basis-full lg:basis-1/4 gap-3">
                    <div className="w-full p-6 bg-bg_secondary rounded-md">
                        <div className='flex items-center flex-col gap-4'>
                            <Image src={profile} alt="" width={125} height={125} className="rounded-xxxl" />
                            <label className='text-md font-medium break-all whitespace-wrap'>{`${customerdetails?.data?.firstName ? customerdetails?.data?.firstName : ""}${customerdetails?.data?.surname ? customerdetails?.data?.surname : ""}`}</label>
                            <Badge variant={customerdetails?.data?.isActive == true && customerdetails?.data?.isDeleted == false ? "active" : customerdetails?.data?.isActive == false && customerdetails?.data?.isDeleted == false ? "inactive" : "deleted"}>{customerdetails?.data?.isActive == true && customerdetails?.data?.isDeleted == false ? 'Active' : customerdetails?.data?.isActive == false && customerdetails?.data?.isDeleted == false ? 'Inactive' : 'Deleted'}</Badge>
                        </div>
                        <div className='mt-5'>
                            <label className='text-sm font-medium text-primary'>Details</label>
                            <SelectSeparator className="my-3 bg-light_pink" />
                            <div className='flex flex-col mt-5'>
                                <p className='text-sm text-badge_grey font-normal'>Account ID</p>
                                <p className='text-sm font-medium'>{customerdetails?.data?.id ? `ID:${formatId(customerdetails?.data?.id, 'CUS')}` : "--"}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-sm text-badge_grey font-normal'>Email ID</p>
                                <p className='text-sm font-medium'>{customerdetails?.data?.email ? customerdetails?.data?.email : "--"}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-sm text-badge_grey font-normal'>Registered Mobile</p>
                                <p className='text-sm font-medium'>{customerdetails?.data?.mobile ? customerdetails?.data?.mobile : "--"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex flex-col mt-5'>
                                    <p className='text-sm text-badge_grey font-normal'>Gender</p>
                                    <p className='text-sm font-medium'>{customerdetails?.data?.gender ? customerdetails?.data?.gender : "--"}</p>
                                </div>
                                <div className='flex flex-col mt-5'>
                                    <p className='text-sm text-badge_grey font-normal'>DOB</p>
                                    <p className='text-sm font-medium'>{customerdetails?.data?.dob ? dateConversion(customerdetails?.data?.dob, 'DD MMM YYYY') : "--"}</p>
                                </div>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-sm text-badge_grey font-normal'>Recent Order</p>
                                <p className='text-sm text-primary font-medium'>{customerdetails?.data?.orders[0]?.orderId || '--'}</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        key="add_button_1"
                        variant="view_invoice"
                        size="add"
                        type='submit'
                        label={`${customerdetails?.data?.isActive == true && customerdetails?.data?.isDeleted == false ? 'Deactivate' : customerdetails?.data?.isActive == false && customerdetails?.data?.isDeleted == false ? 'Activate' : 'Deleted'} Customer`}
                        onClick={customerdetails?.data?.isActive == true && customerdetails?.data?.isDeleted == false ? () => { setDeactivemodal(true); setUsercontrol(customerdetails?.data) } : () => { setActivemodal(true); setUsercontrol(customerdetails?.data) }}
                    />
                </div>
                <div className="flex flex-col basis-full lg:basis-3/4 gap-3">
                    <div className="w-full">
                        <Tabslayout
                            title={Customertabs}
                            expandIcon={false}
                            route={""}
                            content={[
                                <OrdersList mainheading={true} subheading={true} customercol={true} key={1} historyId={id} />,
                                <Customeraddress Address={customerdetails?.data?.addresses} key={2} />,
                                <Ticketlist key={3} customer_id={id} />
                            ]}
                        />
                    </div>
                </div>
            </div>
            <ConfirmationModal
                onClick={() => handleUsercontrol()}
                isModalOpen={activemodal}
                handleCloseModal={() => setActivemodal(false)}
                title="Activate Customer"
                buttonText="Activate"
                disabled={isPending}
                message="Are you sure want to activate this customer?"
            />
            <ConfirmationModal
                onClick={() => handleUsercontrol()}
                isModalOpen={deactivemodal}
                handleCloseModal={() => setDeactivemodal(false)}
                title="Deactivate Customer"
                buttonText="Deactivate"
                disabled={isPending}
                message="Are you sure want to deactivate this customer?"
            />
        </div>
    )
}
