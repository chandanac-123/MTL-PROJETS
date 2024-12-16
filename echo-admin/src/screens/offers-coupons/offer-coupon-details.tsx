"use client"

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import AddEditHeader from '@/common/add-edit-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import customerprofile from '@public/icons/coupon.svg'
import { SelectSeparator } from '@/components/ui/select/select';
import OffercouponUserlist from './offer_coupon_user_table';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import { useCouponActivateQuery, useCouponDeactivateQuery, useCouponDeleteQuery, useCouponGetByIdQuery } from '@/api-queries/offers-coupons/queries';
import { capitalizeWords, formatDateWithoutTime } from '@/utils/helper';

const Offercoupondetails = () => {
    const params = useParams()
    const router = useRouter();
    const [modalState, setModalState] = useState<{ type: string, id: any } | null>(null);
    const { data, isFetching } = useCouponGetByIdQuery(params?.id)
    const { mutateAsync: activateCoupon, isPending } = useCouponActivateQuery()
    const { mutateAsync: deactivateCoupon, isPending: deativatePending } = useCouponDeactivateQuery()
    const { mutate: deleteCoupon } = useCouponDeleteQuery()

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/offers-coupons");
    }

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

    return (
        <div>
            <div>
                <div className="flex flex-col gap-6 h-full w-full">
                    <AddEditHeader
                        head="Offers/Coupon Details"
                        onClick={handleOnClick}
                        backwardIcon={true}
                    />
                </div>
                <div className="w-full px-6 py-3.5 bg-bg_secondary rounded-base">
                    <div className='flex justify-between flex-col lg:flex-row md:flex-col'>
                        <div className='flex items-center flex-col lg:flex-row md:flex-col gap-2'>
                            <label className='text-md font-medium'>Welcome Offer</label>
                            <Badge variant="new">{data?.data?.code}</Badge>
                        </div>
                        <div className='flex flex-col lg:flex-row md:flex-col md:mt-2 gap-2'>
                            <Button
                                key="add_button_2"
                                variant="delete_coupon"
                                size="add"
                                label="Delete"
                                onClick={() => handleAction('delete', data?.data?.id)}
                            />
                            <Button
                                key="add_button_1"
                                variant="view_invoice"
                                size="add"
                                label={data?.data?.isActive ? "Deactivate" : "Activate"}
                                onClick={() => handleAction(data?.data?.isActive ? 'deactivate' : 'activate', data?.data?.id)}
                            />
                            <Button
                                key="add_button_2"
                                variant="add_button"
                                size="add"
                                label="Edit"
                                onClick={() => router.push(`/offers-coupons/create/?id=${data?.data?.id}`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-3.5 mt-3.5'>
                <div className='w-full lg:w-[28%] md:w-full'>
                    <div className="w-full p-4 lg:p-6 bg-bg_secondary rounded-md">
                        <div className='flex justify-items-start gap-4'>
                            <Image src={customerprofile} alt="" />
                            <label className='text-sm font-semibold'>Offer/Coupon Details</label>
                        </div>
                        <SelectSeparator className="my-3 bg-light_pink" />
                        <div className='flex justify-items-start gap-5'>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Offer Code</p>
                                <p className='text-[13.5px] font-medium'>{data?.data?.code}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Offer Name</p>
                                <p className='text-[13.5px] font-medium'>{data?.data?.name}</p>
                            </div>
                        </div>
                        <div className='flex justify-items-start gap-5'>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Discount Type</p>
                                <p className='text-[13.5px] font-medium'>{capitalizeWords(data?.data?.type)}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Discount Value</p>
                                <p className='text-[13.5px] font-medium'>{data?.data?.type == 'flat' && '£'} {parseFloat(data?.data?.value)?.toFixed(2)} {data?.data?.type == 'percentage' && '%'}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Minimum Cart Value</p>
                                <p className='text-[13.5px] font-medium'>£ {parseFloat(data?.data?.minOrderValue)?.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='flex justify-items-start gap-5'>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Valid From</p>
                                <p className='text-[13.5px] font-medium'>{formatDateWithoutTime(data?.data?.validityStart)}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Valid To</p>
                                <p className='text-[13.5px] font-medium'>{formatDateWithoutTime(data?.data?.validityEnd)}</p>
                            </div>
                        </div>
                        <div className='flex justify-items-start gap-5'>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Total Coupons</p>
                                <p className='text-[13.5px] font-medium'>{data?.data?.maxUsageCount}</p>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <p className='text-xs text-badge_grey font-semibold'>Coupon Limit Per User</p>
                                <p className='text-[13.5px] font-medium'>{data?.data?.maxUsagePerUserCount}</p>
                            </div>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <p className='text-xs text-badge_grey font-semibold'>Description</p>
                            <p className='text-[13.5px] font-medium break-all whitespace-normal'>{data?.data?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-[73%] md:w-full'>
                    <div className="w-full p-4 lg:p-6 bg-bg_secondary rounded-md">
                        <OffercouponUserlist data={data?.data} />
                    </div>
                </div>
            </div>
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

export default Offercoupondetails;