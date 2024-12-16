import { Divider, Image, Tooltip } from 'antd'
import React, { useState } from 'react'
import edit_pencil from '../../../Static/Images/edit_pencil.svg'
import AuthButton from '../../../Components/CustomButtons/AuthButton'
import EditTBankDetails from '../TenantEdit/TBankDetails'
import EditTBasicDetails from '../TenantEdit/TBasicDetails'
import EditTDocuments from '../TenantEdit/TDocuments'
import EditTRentDetails from '../TenantEdit/TRentDetails'
import pdf_icon from '../../../Static/Images/pdf.png'
import Confirmation from '../../../Common/Confirmation'
import delete_icon from '../../../Static/Images/delete.svg'
import success_icon from '../../../Static/Images/Success.svg'
import move_icon from '../../../Static/Images/move_out.svg'
import { getTenantSettleDueFile } from '../../../ApiQuery/Tenant/TenantUrls'
import { ErrorToast } from '../../../Utils/AlertMessages'
import { useTenantDeleteQuery } from '../../../ApiQuery/Tenant/TenantQuery'
import SettleAllDues from './SettleAllDues'
import { getUserType } from '../../../Utils/utils'
import info_icon from '../../../Static/Images/information-line.svg'
import { capitalizeNames, getDate } from '../../../Utils/Helper'

const TenantDetailView = ({ data, setActive, refetch }) => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeductModalOpen, setDeductIsModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isSettleDueOpen, setIsSettleDueOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoad, setIsLoaded] = useState(false);
  const [isVacateLoad, setIsVactedLoaded] = useState(false);
  const [ids, setIds] = useState({ tenantId: data?.property_history?.[0]?.tenant_id?.id, propId: data?.id });
  const { mutateAsync: deleteTenant, isPending } = useTenantDeleteQuery()

  const handleFirstModalButtonClick = () => {
    const settleDue = getTenantSettleDueFile(ids)
    setIsVactedLoaded(true)
    settleDue.then((res) => {
      setIsVactedLoaded(false)
      setIsModalOpen(false)
      setDeductIsModalOpen(true)
      refetch()
    }).catch((err) => {
      setIsVactedLoaded(false)
      ErrorToast({ message: err?.response?.data?.detail?.data })
    })
  };

  const handleVacate = () => {
    const vacate = deleteTenant(ids)
    setIsLoaded(true)
    vacate.then(res => {
      setIsLoaded(false)
      setIsMoveModalOpen(false)
      setActive('1')
    }).catch(err => {
      setIsLoaded(false)
      ErrorToast({ message: err?.response?.data?.message })
    })
  }

  return (
    <>
      <div className='mobile:flex gap-5 w-full h-3/5'>
        <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-1/2 w-full mt-11 bg-color-white p-4'>
          <div className='flex justify-between'>
            <label className='font-medium'>Basic Details</label>
            {getUserType() === 'admin' &&
              <button onClick={() => setIsBasicModalOpen(!isBasicModalOpen)}><img src={edit_pencil} /></button>}
          </div>
          <Divider />
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Tenant Name</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{capitalizeNames(data?.property_history?.[0]?.tenant_id?.tenant_name)}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Phone Number</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.phone_number}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Email Address </label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.tenant_email}</label>
          </div>
        </div>
        <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-1/2 w-full mt-11 bg-color-white p-4'>
          <div className='flex justify-between'>
            <label className='font-medium'>Bank Details</label>
            {getUserType() === 'admin' &&
              <button onClick={() => setIsBankModalOpen(!isBankModalOpen)}><img src={edit_pencil} /></button>}
          </div>
          <Divider />
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Account Name</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.bank_account_name}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Account Number</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.bank_account_number}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Bank</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.bank_id?.bank_name}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>IFS Code</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.bank_ifsc_code}</label>
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Branch Name</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.bank_branch_name}</label>
          </div>
        </div>
      </div>

      <div className='mobile:flex gap-5 w-full h-3/5'>
        <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-1/2 w-full mt-11 bg-color-white p-4'>
          <div className='flex justify-between'>
            <label className='font-medium'>Documents </label>
            {getUserType() === 'admin' &&
              <button onClick={() => setIsDocModalOpen(!isDocModalOpen)}><img src={edit_pencil} /></button>}
          </div>
          <Divider />
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-8'>
            <label className='w-48 text-secondary'>Property Occupied On</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.occupied_on}</label>
          </div>

          <div>
            <label className='w-48 text-secondary'>Documents</label>
            <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-4 mt-4 justify-end flex-wrap'>
              {data?.property_history?.[0]?.tenant_id?.tenant_document?.length == 0 && <div className='flex justify-center  items-center font-medium'>No data</div>}
              {data?.property_history?.[0]?.tenant_id?.tenant_document?.map((i) =>
                <div className='mobile:flex-col w-28  rounded-lg outline-dashed outline-1 outline-slate-200'>
                  {i?.file.endsWith('.pdf') ?
                    <img onClick={() => window.open(i.file)} src={pdf_icon} alt='' className='flex w-28 h-28 p-2' /> :
                    <Image src={i?.file + "?" + new Date()} alt='' className='flex w-28 h-28 p-2' />}
                  <p className='break-all whitespace-normal	 items-center '>{i?.name}</p>
                </div>
              )}
            </div>
          </div>

        </div>
        <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-1/2 w-full mt-11 bg-color-white p-4'>
          <div className='flex justify-between'>
            <label className='font-medium'>Rent Details</label>
            {getUserType() === 'admin' &&
              <button onClick={() => setIsRentModalOpen(!isRentModalOpen)}><img src={edit_pencil} /></button>}
          </div>
          <Divider />
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Tenant Added On</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.created_at ? getDate(data?.property_history?.[0]?.tenant_id?.created_at) : ""}</label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Tenant Occupied On</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.occupied_on}</label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Original Advance</label>
            <label className='w-48 text-text-color-secondary font-semibold'>₹ {data?.property_history?.[0]?.tenant_id?.advance_amount || '0'} </label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Advance after deduction</label>
            <label className='w-48 text-text-color-secondary font-semibold'>₹ {(data?.property_history?.[0]?.tenant_id?.advance_amount) - (data?.property_history?.[0]?.tenant_id?.advance_to_give) || '0'} </label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Rent Amount</label>
            <label className='w-48 text-text-color-secondary font-semibold'> ₹ {data?.property_history?.[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount || '0'}</label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-44 text-secondary flex'>Maintenance Cost <Tooltip title="This expense is paid by the owner and will be retrieved from the advance paid by the customer.">
              <img src={info_icon} alt='' className='w-5 ml-2' />
            </Tooltip></label>
            <label className='w-48 text-text-color-secondary font-semibold mobile:ml-4 ml-0'>₹ {data?.property_history?.[0]?.tenant_id?.security_deposit || "0"} </label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-monthly-red font-semibold'>Net Due</label>
            <label className='w-48 text-monthly-red font-semibold'>₹ {data?.tenant_due} </label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Increment in Rent</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.increment_percentage} %</label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary'>Increment Effective from</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.increment_from_month ? <>{data?.property_history?.[0]?.tenant_id?.increment_from_month} / {data?.property_history?.[0]?.tenant_id?.increment_from_year}</> : ""}</label>
          </div><div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-2'>
            <label className='w-48 text-secondary font-medium'>Rent Due Day</label>
            <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.rent_due_day}</label>
          </div>
          <div className='flex gap-2 sm:flex-row mobile:w-full mb-2 mt-4'>
            <input type='checkbox' disabled={data?.property_history?.[0]?.tenant_id?.advance_amount == 0} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            <label className='w-48 text-secondary font-semibold whitespace-nowrap'>Deduct due from the Advance Amount.</label>
          </div>
          <div className='flex gap-4 w-full justify-center items-center mt-4'>
            <AuthButton
              disabled={data?.tenant_due == 0 ? false : true}
              onClick={() => setIsMoveModalOpen(true)}
              label="Vacate Tenant"
              className='w-full mobile:w-1/4 mb-8 bg-primary rounded-md h-10 flex items-center justify-center text-color-white' />
            <AuthButton
              disabled={data?.tenant_due == 0 ? true : false}
              onClick={isChecked ? () => setIsModalOpen(true) : () => setIsSettleDueOpen(true)}
              label="Settle All Dues"
              className='w-full mobile:w-1/4  mb-8 bg-color-green rounded-md h-10 flex items-center justify-center text-color-white' />
          </div>
        </div>
      </div>
      <EditTBasicDetails isBasicModalOpen={isBasicModalOpen} setIsBasicModalOpen={setIsBasicModalOpen} data={data} />
      <EditTBankDetails isBankModalOpen={isBankModalOpen} setIsBankModalOpen={setIsBankModalOpen} data={data} />
      <EditTDocuments isDocModalOpen={isDocModalOpen} setIsDocModalOpen={setIsDocModalOpen} data={data} />
      <EditTRentDetails isRentModalOpen={isRentModalOpen} setIsRentModalOpen={setIsRentModalOpen} data={data} />
      <Confirmation setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} onClick={() => handleFirstModalButtonClick()} loading={isVacateLoad} titleHead="Confirmation" buttonText="Yes Deduct Now" icons={delete_icon} message="The Net Due amount will be deducted from his Advance  Amount. Are you sure to continue ?" />
      <Confirmation setIsModalOpen={setDeductIsModalOpen} isModalOpen={isDeductModalOpen} onClick={() => setDeductIsModalOpen(false)} titleHead="Success" buttonText="Okay" icons={success_icon} message="Your Net Due has been deducted from your Advance Amount.Thank you." />
      <Confirmation setIsModalOpen={setIsMoveModalOpen} isModalOpen={isMoveModalOpen} onClick={handleVacate} loading={isLoad} titleHead="Move-Out Confirmation" buttonText="Yes Vacate Now" icons={move_icon} message={`Are you sure you want to vacate ${data?.property_history?.[0]?.tenant_id?.tenant_name} ? `} />
      <SettleAllDues isSettleDueOpen={isSettleDueOpen} setIsSettleDueOpen={setIsSettleDueOpen} data={data} />
    </>
  )
}

export default TenantDetailView