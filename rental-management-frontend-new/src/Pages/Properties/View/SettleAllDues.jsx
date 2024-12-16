import React, { useState } from 'react'
import ModalLayout from '../../../Common/ModalLayout'
import InputField from '../../../Components/CustomInput/InputField'
import rupees_icon from '../../../Static/Images/rupees.svg'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import double_check from '../../../Static/Images/double-check.svg'
import { useTenantSplitDueQuery, useTenantSettleAllDueQuery } from '../../../ApiQuery/Tenant/TenantQuery'
import { useFormik } from 'formik'
import dayjs from 'dayjs'

const SettleAllDues = ({ isSettleDueOpen, setIsSettleDueOpen, data }) => {
    const [isSplit, setIsSplit] = useState(false);

    const { mutateAsync: split, isPending, data: splitData } = useTenantSplitDueQuery()
 
    const { mutateAsync: settle, isPending: isSettleAllDue } = useTenantSettleAllDueQuery()

    const initialValues = {
        split_due_amt: data?.tenant_due || '',
    };

    const settleInitialValues = {
        settle_due: splitData || []
    };

    const handleSplit = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const details = {
                'property_id': data?.id,
                'tenant_id': data?.property_history?.[0]?.tenant_id?.id,
                'amount': values.split_due_amt,
            }

            setSubmitting(true)
            try {
                const splitResult = await split(details);
                setIsSplit(true);
            } catch (err) {
                setStatus("Somthing went wrong !")
            }
        },
    })



    const handleSettleDuesNow = useFormik({
        initialValues: settleInitialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const details = {
                'property_id': data?.id,
                'tenant_id': data?.property_history?.[0]?.tenant_id?.id,
                'dues_to_settle': values?.settle_due,
            }
            setSubmitting(true)
            try {
                const splitResult = await settle(details);
                handleSettleDuesNow.resetForm()
                setIsSettleDueOpen(false)
            } catch (err) {
                setStatus("Somthing went wrong !")
            }
        },
    })


    const rentDate = (date) => {
        const rentDate = new Date(date?.rent_year, date?.rent_month - 1);
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sept", "Oct", "Nov", "Dec"
        ];
        const monthName = monthNames[rentDate.getMonth()];
        const year = rentDate.getFullYear();

        return `${monthName} ${year}`;
    }
    rentDate(splitData?.[0])



    return (
        <ModalLayout isModalOpen={isSettleDueOpen} setIsModalOpen={setIsSettleDueOpen} title=" Settle All Dues">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // Call the appropriate function based on button click
                    if (isSplit) {
                        handleSettleDuesNow();
                    } else {
                        handleSplit.handleSubmit(e);
                    }
                }}
                noValidate>
                <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Enter Paid Amount</label>
                        <InputField
                            placeholder=""
                            type='number'
                            icons={rupees_icon}
                            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
                            name='split_due_amt'
                            errors={handleSplit?.errors.split_due_amt}
                            value={handleSplit?.values.split_due_amt}
                            touched={handleSplit?.touched.split_due_amt}
                            handleChange={handleSplit?.handleChange}
                        />
                    </div>
                </div>
                <div className='flex justify-end pt-6'>
                    <ContinueButton
                        onClick={() => {
                            setIsSplit(true);
                            handleSplit.handleSubmit();
                        }}
                        loading={isPending}
                        type='button'
                        label="Split"
                        img={double_check}
                        className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                </div>

                {isSplit && splitData && splitData.length > 0 && splitData?.map(e => {
                    return (
                        <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>{rentDate(e)}</label>
                                <InputField
                                    placeholder=""
                                    type='settle_due'
                                    icons={rupees_icon}
                                    className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
                                    name='settle_due'
                                    value={e?.amount_to_pay}
                                />
                            </div>
                        </div>

                    )
                })}

                {isSplit &&
                    <div className='flex justify-end pt-6'>
                        <ContinueButton
                            onClick={() => {
                                handleSettleDuesNow.handleSubmit();
                            }}
                            loading={isSettleAllDue}
                            type='button'
                            label="Settle Dues Now"
                            img={double_check}
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                    </div>}

            </form>
        </ModalLayout>
    )
}

export default SettleAllDues