"use client"

import React, { useState } from 'react'
import AddEditHeader from '@/common/add-edit-header'
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import SelectField from '@/components/ui/multi-select';
import doller from '@public/icons/doller.svg'
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/text-area';
import ReactDatepicker from '@/components/ui/Reactdatepicker';
import { useFormik } from 'formik';
import { useCouponAddQuery, useCouponEditQuery, useCouponGetByIdQuery } from '@/api-queries/offers-coupons/queries';
import { dateFormat } from '@/utils/helper';
import { discountType } from '@/constants/discountType';
import { couponSchema } from '@/utils/validations';

type FormValues = {
    couponCode: string;
    couponName: string;
    discountType: string;
    discountValue: string;
    minCartValue: string;
    validFrom: string | Date | null;
    validTo: string | Date | null;
    totalCoupon: string;
    couponLimit: string;
    discription: string;
}

const CreateOffersCoupons = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const couponId = searchParams.get('id');
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const { mutateAsync: createCoupon, isPending } = useCouponAddQuery()
    const { mutateAsync: updateCoupon, isPending: editpending } = useCouponEditQuery()
    const { data, isFetching } = useCouponGetByIdQuery(couponId)

    const initialValues = {
        couponCode: data?.data?.code || '',
        couponName: data?.data?.name || '',
        discountType: data?.data?.type || '',
        discountValue: data?.data?.value || '',
        minCartValue: data?.data?.minOrderValue || '',
        validFrom: data?.data?.validityStart ? dateFormat(data?.data?.validityStart) : null,
        validTo: data?.data?.validityEnd ? dateFormat(data?.data?.validityEnd) : null,
        totalCoupon: data?.data?.maxUsageCount || '',
        couponLimit: data?.data?.maxUsagePerUserCount || '',
        discription: data?.data?.description || '',
    }

    const formik = useFormik<FormValues>({
        initialValues,
        enableReinitialize: true,
        validationSchema: couponSchema,
        onSubmit: async (values: any) => {
            const details = {
                name: values.couponName,
                code: values.couponCode,
                type: values.discountType,
                value: parseInt(values.discountValue),
                validityStart: values.validFrom,
                validityEnd: values.validTo,
                maxUsageCount: parseInt(values.totalCoupon),
                maxUsagePerUserCount: parseInt(values.couponLimit),
                minOrderValue: parseInt(values.minCartValue),
                maxOrderValue: values.maxOrderValue,
                description: values.discription,
            }
            try {
                if (couponId) {
                    await updateCoupon({ data: details, id: couponId })
                } else await createCoupon(details)
                router.push('/offers-coupons')
            } catch (error: any) {

            }
        }
    });

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/offers-coupons");
    }


    const handleStartDateChange = (date: Date | null) => {
        formik.setFieldValue('validFrom', date ? dateFormat(date) : '');
    };

    const handleEndDateChange = (date: Date | null) => {
        formik.setFieldValue('validTo', date ? dateFormat(date) : '');
    };

    const handleDiscard = () => {
        formik.resetForm({
            values: {
                couponCode: '',
                couponName: '',
                discountType: '',
                discountValue: '',
                validFrom: null,
                validTo: null,
                minCartValue: '',
                totalCoupon: '',
                couponLimit: '',
                discription: '',
            },
        });
        formik.setFieldValue('validFrom', '');
        formik.setFieldValue('validTo', '');
        formik.setFieldValue('discountType', '');
    };



    return (
        <form onSubmit={formik.handleSubmit} noValidate>
            <div className="flex flex-col gap-6 h-full w-full">
                <AddEditHeader
                    head={couponId ? "Edit Offer/Coupon" : "Create New Offer/Coupon"}
                    subhead={couponId ? "Edit Offer/Coupon" : "Create New Offer/Coupon"}
                    onClick={handleOnClick}
                    backwardIcon={true}
                />
                <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md h-full mb-3">
                    <label className="text-md text-primary font-semibold">Basic Details</label>
                    <div className="flex flex-col lg:flex-row md:flex-col w-full gap-4 h-full mb-3">
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter offer/coupon code"
                                label="Offer/Coupon Code"
                                name="couponCode"
                                handleChange={formik.handleChange}
                                value={formik.values.couponCode}
                                errors={formik.errors.couponCode}
                                touched={formik.touched.couponCode}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter offer/coupon name"
                                label="Offer/Coupon Name"
                                name="couponName"
                                handleChange={formik.handleChange}
                                value={formik.values.couponName}
                                errors={formik.errors.couponName}
                                touched={formik.touched.couponName}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <SelectField
                                label="Discount Type"
                                name="discountType"
                                placeholder="Select discount type"
                                constant={false}
                                isMulti={false}
                                options={discountType}
                                key={formik.values.discountType}
                                value={formik?.values?.discountType}
                                errors={formik?.errors?.discountType}
                                touched={formik?.touched?.discountType}
                                onChange={(selectedOptions: any) => {
                                    formik.setFieldValue('discountType', selectedOptions || '');
                                }}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter value"
                                label="Discount Value"
                                icon={false}
                                type="text"
                                name="discountValue"
                                handleChange={formik.handleChange}
                                value={formik.values.discountValue}
                                errors={formik.errors.discountValue}
                                touched={formik.touched.discountValue}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row md:flex-col w-full gap-4 h-full mb-3">
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter price"
                                label="Minimum Cart Value"
                                icon={doller}
                                type="text"
                                name="minCartValue"
                                handleChange={formik.handleChange}
                                value={formik.values.minCartValue}
                                errors={formik.errors.minCartValue}
                                touched={formik.touched.minCartValue}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <ReactDatepicker
                                selectedDate={startDate}
                                onDateChange={(date: any) => handleStartDateChange(date)} // true for validFrom
                                placeholderText="MM/DD/YYYY"
                                label="Valid From"
                                dateRange={false}
                                isClearable={false}
                                className='w-full bg-inputbg text-gray-700 border-none'
                                value={formik.values.validFrom}
                                errors={formik.errors.validFrom}
                                touched={formik.touched.validFrom}
                                disablePastDate={true}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <ReactDatepicker
                                selectedDate={endDate}
                                onDateChange={(date: any) => handleEndDateChange(date)} // false for validTo
                                placeholderText="MM/DD/YYYY"
                                label="Valid To"
                                dateRange={false}
                                className='w-full bg-inputbg text-gray-700 border-none'
                                isClearable={false}
                                value={formik.values.validTo}
                                errors={formik.errors.validTo}
                                touched={formik.touched.validTo}
                                disablePastDate={true}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter No. of coupons"
                                label="Total Coupons"
                                name="totalCoupon"
                                type='text'
                                handleChange={formik.handleChange}
                                value={formik.values.totalCoupon}
                                errors={formik.errors.totalCoupon}
                                touched={formik.touched.totalCoupon}
                            />
                        </div>
                        <div className="basis-full lg:basis-3/12 md:basis-full">
                            <Input
                                placeholder="Enter No. of coupons"
                                label="Coupon Limit Per User"
                                name="couponLimit"
                                type='text'
                                handleChange={formik.handleChange}
                                value={formik.values.couponLimit}
                                errors={formik.errors.couponLimit}
                                touched={formik.touched.couponLimit}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-col md:flex-col w-full gap-4 h-full">
                        <Textarea
                            title="Description"
                            placeholder="Enter description"
                            name="discription"
                            handleChange={formik.handleChange}
                            value={formik.values.discription}
                            errors={formik.errors.discription}
                            touched={formik.touched.discription}
                        />
                    </div>
                </div>
                <div className="flex w-full justify-center items-center">
                    <div className="flex justify-center items-center bg-primary rounded-sm w-80 py-0 px-3">
                        <Button variant="add_button" label="Discard Changes" type='button' onClick={handleDiscard} />
                        <Button variant="cancel" label="Save" size="save" type="submit" />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateOffersCoupons