import React from 'react'
import ModalLayout from '../../../Common/ModalLayout'
import AuthButton from '../../../Components/CustomButtons/AuthButton'
import InputField from '../../../Components/CustomInput/InputField'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import general_icon from '../../../Static/Images/general.svg'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useInvestIncomeCreateQuery, useInvestIncomeUpdateQuery } from '../../../ApiQuery/InvestmentIncome/InvestIncomeQuery'
import { currentDate } from '../../../Utils/Helper'
import rupees_icon from '../../../Static/Images/rupees.svg'
import prop_icon from '../../../Static/Images/property.jpg'

const AddEdit = ({ isModalOpen, setIsModalOpen, id, isLocalState, setsLocalState, setIsPropertyOpen }) => {
    const { mutateAsync: create, isPending } = useInvestIncomeCreateQuery()
    const { mutateAsync: update, ispending: isUpdatePending } = useInvestIncomeUpdateQuery()

    const initialValues = {
        investorName: isModalOpen?.investor_id?.investor_name || '',
        phoneNumber: isModalOpen?.investor_id?.phone_number || "",
        amount: isModalOpen?.amount_recieved || "",
        email: isModalOpen?.investor_id?.email || '',
    }

    const validationSchema = Yup.object().shape({
        investorName: Yup.string().required('This field is required')
            .max(25, 'Should not exceed 25 characters.'),
        phoneNumber: Yup.string().max(10, 'Phone number is not valid')
            .matches(/^[6789]\d{9,}$/, 'Phone number is not valid')
            .required('This field is required'),
        amount: Yup.string().required('This field is required'),
        email: Yup.string().email('Invalid email address')
            .matches(/^(?!.*@[^,]*,)/).required('Email is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const invest = {
                'investor_name': values?.investorName,
                'phone_number': values?.phoneNumber,
                'email': values?.email,
            }
            const details = {
                investor_id: invest,
                'amount_recieved': values?.amount,
                "property_id": isLocalState?.id,
                'collected_on': currentDate()
            }
            setSubmitting(true)
            try {
                if (id) {
                    const data = await update({ details, id })
                    setIsModalOpen(false)
                } else {
                    const data = await create(details)
                    setsLocalState(false)
                    formik.resetForm()
                    setTimeout(() => {
                        setIsPropertyOpen(false)
                    }, 100)
                }
            } catch (err) {
                console.error(err)
                setStatus("Somthing went wrong !")
            }
        },
    })

    return (
        <ModalLayout isModalOpen={isModalOpen || isLocalState} setIsModalOpen={setIsModalOpen || setsLocalState} title={`${id ? "Edit" : "Add"} Investment Income`}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8 scroll-container'>
                    <img src={isLocalState?.property_image || isModalOpen?.property_id?.property_image || prop_icon} alt='' className='flex w-20 h-20' />
                    <div className='flex  flex-col w-full'>
                        <div className='flex gap-4 items-center'>
                            <label className='font-semibold text-lg'>{isLocalState?.property_name || isModalOpen?.property_id?.property_name}{isLocalState?.parent_id?.property_name || isModalOpen?.property_id?.parent_id?.property_name}</label>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='mt-2 flex flex-wrap gap-4'>
                                <div className='flex items-start gap-1 mobile:items-center'>
                                    <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{isLocalState?.flat_number || isLocalState?.house_number || isModalOpen?.property_id?.flat_number || isModalOpen?.property_id?.house_number}</label>
                                </div>
                                <div className='flex items-start gap-1 mobile:items-center '>
                                    <img src={finance_icon} alt='' /><label className='text-text-color-secondary whitespace-nowrap'>{isLocalState?.property_type_id?.name || isModalOpen?.property_id?.property_type_id?.name}</label>
                                </div>

                            </div>
                            <div className='flex items-start gap-1 mobile:items-center mt-2 '>
                                <img src={location_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>
                                    {isLocalState?.address || isModalOpen?.property_id?.address || isLocalState?.parent_id?.address || isModalOpen?.property_id?.parent_id?.address},
                                    {isLocalState?.town || isModalOpen?.property_id?.town || isLocalState?.parent_id?.town || isModalOpen?.property_id?.parent_id?.town},
                                    {isLocalState?.state_id?.state_name || isModalOpen?.property_id?.state_id?.state_name || isLocalState?.parent_id?.state_id?.state_name || isModalOpen?.property_id?.parent_id?.state_id?.state_name},
                                    {isLocalState?.pincode || isModalOpen?.property_id?.pincode || isLocalState?.parent_id?.pincode || isModalOpen?.property_id?.parent_id?.pincode}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-11'>
                    <h3 className='font-semibold mb-3'>Investment Details</h3>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Investor Name</label>
                        <InputField
                            placeholder="Investor Name"
                            className="bg-search-bg-color border-none"
                            name='investorName'
                            errors={formik.errors.investorName}
                            value={formik.values.investorName}
                            touched={formik.touched.investorName}
                            handleChange={formik.handleChange}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Phone Number</label>
                        <InputField
                            placeholder="Phone Number"
                            className="bg-search-bg-color border-none"
                            name='phoneNumber'
                            errors={formik.errors.phoneNumber}
                            value={formik.values.phoneNumber}
                            touched={formik.touched.phoneNumber}
                            handleChange={formik.handleChange}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'> Email</label>
                        <InputField
                            placeholder="Email"
                            className="bg-search-bg-color border-none"
                            name='email'
                            errors={formik.errors.email}
                            value={formik.values.email}
                            touched={formik.touched.email}
                            handleChange={formik.handleChange}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Amount</label>
                        <InputField
                            icons={rupees_icon}
                            placeholder="Amount"
                            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
                            name='amount'
                            errors={formik.errors.amount}
                            value={formik.values.amount}
                            touched={formik.touched.amount}
                            handleChange={formik.handleChange}
                        />
                    </div>

                    <div className='flex justify-end pt-6'>
                        <AuthButton
                            type='submit'
                            loading={isPending || isUpdatePending}
                            disabled={isPending || isUpdatePending}
                            label={id ? "Save Changes" : 'Add Investment Income'}
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}

export default AddEdit