import { Divider, Image } from "antd";
import React, { useRef, useState } from "react";
import general_icon from "../../../../Static/Images/general.svg";
import pdf_icon from "../../../../Static/Images/pdf.png";
import { useExpenseDeleteQuery, useExpenseDetailsQuery, useReceiptDownloadQuery } from "../../../../ApiQuery/Expenses/ExpenseQuery";
import { useParams } from 'react-router-dom'
import location_icon from '../../../../Static/Images/geolocation.svg'
import finance_icon from '../../../../Static/Images/finance.svg'
import download_icon from '../../../../Static/Images/file-down.svg'
import ContinueButton from "../../../../Components/CustomButtons/ContinueButton";
import AddButton from "../../../../Components/CustomButtons/AddButton";
import plus from '../../../../Static/Images/light-plus.svg'
import RemarkAddEdit from "./RemarkAddEdit";
import edit_pencil from '../../../../Static/Images/edit_pencil.svg'
import Delete from "../../../../Common/Delete";
import { ErrorToast } from "../../../../Utils/AlertMessages";
import ExpenseReciept from "./ExpenseRecept";
import prop_icon from '../../../../Static/Images/property.jpg'


const ExpenseView = () => {
  const params = useParams()
  const componentRef = useRef(null);
  const [remark, setRemark] = useState(false)
  const [open, setOpen] = useState(false);
  const [receipt, setReceipt] = useState(false)

  const { mutateAsync: deleteExpense, isPending } = useExpenseDeleteQuery()
  const { data, isFetching } = useExpenseDetailsQuery(params?.id)
  const { data: receiptData, isFetching: isReceipt } = useReceiptDownloadQuery(params?.id)

  return (
    <>
      <div className='outline outline-1 rounded-lg outline-slate-200 px-8 py-4 mt-11 bg-color-white'>
        <div className='flex justify-end gap-1 mobile:mb-0 mb-4 flex-wrap-reverse'>
          <ContinueButton label='Download Receipt' type='button' img={download_icon} onClick={() => setReceipt(true)} />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8'>
          <img src={data?.property_id?.property_image ? data?.property_id?.property_image : prop_icon} alt='' className='flex w-24 h-24' />
          <div className='flex  flex-col w-full gap-4'>
            <label className="font-semibold text-lg">{data?.property_id?.property_name || data?.property_id?.parent_id?.property_name}</label>
            {/* <div className='flex items-start gap-2 mobile:items-center'>
              <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{data?.property_id?.flat_number || data?.property_id?.house_number}</label>
              <img src={finance_icon} alt='' /><label className='text-text-color-secondary'>{data?.property_id?.property_type_id?.name}</label>
            </div> */}
            <div className='flex items-start gap-2 mobile:items-center'>
              <img src={location_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>
                {data?.property_id?.address || data?.property_id?.parent_id?.address},{data?.property_id?.town || data?.property_id?.parent_id?.town},{data?.property_id?.state_id?.state_name || data?.property_id?.parent_id?.state_id?.state_name},  {data?.property_id?.pincode || data?.property_id?.parent_id?.pincode}</label>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile:flex block mt-5 w-full gap-4">
        <div className="shadow border color-gray bg-color-white rounded-xl mobile:w-[40%] w-full">
          <div className="p-5">
            <span className="color-black text-[18px] font-semibold">
              Manager Details
            </span>
          </div>

          <Divider className="my-0" />

          <div className="p-5">
            <div className="flex items-center">
              <span className="text-text-extra-light text-[16px] font-semibold w-[40%]">
                Manager Name
              </span>
              <span className="text-text-color-secondary text-[16px] font-semibold">
                {data?.uploaded_by?.full_name}
              </span>
            </div>
            <div className="flex items-center mt-3">
              <span className="text-text-extra-light text-[16px] font-semibold w-[40%]">
                Phone Number
              </span>
              <span className="text-text-color-secondary text-[16px] font-semibold">
                {data?.uploaded_by?.phone_number}
              </span>
            </div>
          </div>
        </div>
        <div className="shadow border color-gray bg-color-white rounded-xl mobile:w-[60%] w-full mobile:mt-0 mt-4">
          <div className="p-5">
            <span className="color-black text-[18px] font-semibold">
              Payment Details
            </span>
          </div>

          <Divider className="my-0" />

          <div className="p-5 flex items-center justify-around flex-wrap gap-2">
            <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2">
              <p className="text-dark-shade-grey text-[22px] font-semibold">
                {data?.expense_type?.name}
              </p>
              <p className="text-text-extra-light text-[16px] font-semibold">
                Type of Expense
              </p>
            </div>
            <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2">
              <p className="text-dark-shade-grey text-[22px] font-semibold">
                {data?.created_at}
              </p>
              <p className="text-text-extra-light text-[16px] font-semibold">
                Date of Receipt Received
              </p>
            </div>
            <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2">
              <p className="text-[22px] font-semibold text-color-orange">
               <>₹ {data?.expense_amount||'0'}</> 
              </p>
              <p className="text-text-extra-light text-[16px] font-semibold">
                Expense
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="outline outline-1 rounded-lg outline-slate-200 mobile:w-full w-full mt-11 bg-color-white p-4 pb-10">
        <div className="flex justify-between">
          <label className="color-black text-[18px] font-semibold">Documents</label>
        </div>

        <Divider />

        <div>

          <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-6 mobile:flex-row gap-2 pb-5">
            <p className="text-text-extra-light text-[16px] font-semibold ">
              Receipts
            </p>
            <div className="flex flex-col lg:flex-row justify-start gap-2">
              {data?.expense_document?.map((i) =>
                <div className='mobile:flex-col w-40  rounded-lg outline-dashed outline-1 outline-slate-200'>
                  {i?.file.endsWith('.pdf') ?
                    <img onClick={() => window.open(i.file)} src={pdf_icon} alt='' className='flex w-36 h-36 p-2' /> :
                    <Image src={i?.file} alt='' className='flex w-36 h-36 p-2' />}
                  <label className='flex justify-center items-center whitespace-nowrap '>{i?.name}</label>
                </div>
              )}
            </div>
          </div>

          <div className="sm:flex sm:flex-row items-start">
            <p className="text-text-extra-light text-[16px] font-semibold pr-10 pb-2">
              Remarks
            </p>
            {data?.remarks ?
              <div className="flex justify-between w-full">
                <label className="text-text-extra-light text-[16px] font-semibold pr-10 pb-2">{data?.remarks}</label>
                <button onClick={() => setRemark(data?.id)}><img src={edit_pencil} /></button>
              </div>
              :
              <div className=' w-full sm:w-auto'>
                <AddButton label="Add Remarks"
                  onClick={() => setRemark(true)}
                  img={plus}
                  className='bg-primary text-button-secondary px-4 py-2 w-full rounded-lg flex items-center gap-2'
                />
              </div>}
          </div>

        </div>
      </div>
      <RemarkAddEdit remark={remark} setRemark={setRemark} id={data?.id} data={data} />
      <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteExpense(data?.id).then(res => { setOpen(false) }).catch(err => {
        ErrorToast({ message: "Something went wrong !" })
      })} />
      <div ref={componentRef}>
        <ExpenseReciept receiptData={receiptData} setReceipt={setReceipt} receipt={receipt} />
      </div>
    </>
  );
}

export default ExpenseView;