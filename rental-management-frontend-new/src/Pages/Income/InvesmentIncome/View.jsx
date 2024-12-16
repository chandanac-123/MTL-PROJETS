import React, { useRef, useState } from 'react'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import { Divider } from 'antd'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import download_icon from '../../../Static/Images/file-down.svg'
import { useParams } from 'react-router-dom'
import { useInvestIncomeDeleteQuery, useInvestIncomeGetByIdQuery, useReceiptDownloadQuery } from '../../../ApiQuery/InvestmentIncome/InvestIncomeQuery'
import { dateFormatConvert } from '../../../Utils/Helper'
import InvestmentReceipt from './InvestmentReceipt'
import Delete from '../../../Common/Delete'
import { ErrorToast } from '../../../Utils/AlertMessages'
import prop_icon from '../../../Static/Images/property.jpg'
import general_icon from "../../../Static/Images/general.svg";

const InvestmentIncomeView = () => {
    const params = useParams()
    const componentRef = useRef(null);
    const [receipt, setReceipt] = useState(false)
    const { data, isFetching } = useInvestIncomeGetByIdQuery(params?.id)
    const { mutateAsync: deleteIncome, isPending } = useInvestIncomeDeleteQuery()
    const { data: receiptData, isFetching: isReceipt } = useReceiptDownloadQuery({ id: params?.id, enabled: true })
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    return (
        <>
            <div className='outline outline-1 rounded-lg outline-slate-200 px-8 py-4 mt-11 bg-color-white'>
                <div className='flex justify-end gap-1 mobile:mb-0 mb-4 flex-wrap-reverse'>
                    <ContinueButton label='Download Receipt' type='button' img={download_icon} onClick={() => setReceipt(true)} />
                </div>

                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8'>

                    <img src={data?.property_id?.property_image ? data?.property_id?.property_image + "?" + new Date() : prop_icon} alt='' className='flex w-48 h-48' />
                    <div className='flex  flex-col w-full gap-4'>
                        <label className='font-semibold text-lg'>{data?.property_id?.property_name || data?.property_id?.parent_id?.property_name}</label>
                        <div className='flex items-start gap-2 mobile:items-center'>
                            <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{data?.property_id?.flat_number || data?.property_id?.house_number}</label>
                            <img src={finance_icon} alt='' /><label className='text-text-color-secondary'>{data?.property_id?.property_type_id?.name}</label>
                        </div>
                        <div className='flex items-start gap-2 mobile:items-center'>
                            <img src={location_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>{data?.property_id?.address || data?.property_id?.parent_id?.address},{data?.property_id?.town || data?.property_id?.parent_id?.town},{data?.property_id?.state_id?.state_name || data?.property_id?.parent_id?.state_id?.state_name},{data?.property_id?.pincode || data?.property_id?.parent_id?.pincode}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mobile:flex gap-4 w-full'>
                <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-4/12 w-full mt-11 bg-color-white p-4'>
                    <labe className='font-medium'>Investor Details</labe>
                    <Divider />
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
                        <label className='w-48 text-secondary'>Investor Name</label>
                        <label className='w-48 text-text-color-secondary font-semibold'>{data?.investor_id?.investor_name}</label>
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
                        <label className='w-48 text-secondary'>Phone Number</label>
                        <label className='w-48 text-text-color-secondary font-semibold'>{data?.investor_id?.phone_number}</label>
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
                        <label className='w-48 text-secondary'>Email Address</label>
                        <label className='w-48 text-text-color-secondary font-semibold'>{data?.investor_id?.email}</label>
                    </div>
                </div>
                <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-2/3 w-full mt-11 bg-color-white p-4'>
                    <div className='flex justify-between'>
                        <labe className='font-medium'>Payment Details</labe>
                        <button ><img src='' /></button>
                    </div>
                    <Divider />
                    <div className='mobile:flex mobile:gap-40'>
                        <div className='flex gap-1 flex-col'>
                            <label className='w-40 text-color-green text-2xl font-semibold'>₹{data?.amount_recieved}</label>
                            <label className='w-36 text-text-extra-light'>Invested</label>
                        </div>

                        <div className='flex gap-1 flex-col'>
                            <label className='w-40 font-semibold text-2xl'>{dateFormatConvert(data?.collected_on)}</label>
                            <label className='w-36 text-text-extra-light'>Invested On</label>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={componentRef}>
                <InvestmentReceipt receiptData={receiptData} setReceipt={setReceipt} receipt={receipt} />
            </div>
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteIncome(data?.id).then(res => { setOpen(false) }).catch(err => {
                ErrorToast({ message: "Something went wrong !" })
            })} />
        </>
    )
}

export default InvestmentIncomeView