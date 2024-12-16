import { Dropdown, Space, Timeline } from "antd";
import React, { useRef, useState } from "react";
import edit_icon from "../../../../Static/Images/arrows.svg";
import yellow_icon from "../../../../Static/Images/yellow_ellipse.svg";
import green_icon from "../../../../Static/Images/green_ellipse.svg";
import cash_icon from "../../../../Static/Images/cash.svg";
import upi_icon from "../../../../Static/Images/upi.svg";
import receipt_icon from "../../../../Static/Images/receipt.svg";
import { getFormattedDate, getUserType } from "../../../../Utils/utils";
import AddEdit from "../AddEdit";
import Delete from '../../../../Common/Delete';
import { ErrorToast } from "../../../../Utils/AlertMessages";
import { useReceiptDownloadQuery } from "../../../../ApiQuery/InvestmentIncome/InvestIncomeQuery";
import AdvanceIncomeReceipt from "../AdvanceReceipt";
import { useAdvanceIncomeDeleteQuery } from "../../../../ApiQuery/AdvanceIncome/Queries";
import { useNavigate } from "react-router-dom";

function CustomeTimeLine({ data, refetch }) {
  const [propertyId, setPropertyId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [instance, setInstance] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(false);
  const componentRef = useRef(null);
  const [receipt, setReceipt] = useState(false)
  const [receiptId, setReceiptId] = useState(null)
  const [isOpen, setIsOpen] = useState("");
  const navigate = useNavigate()

  const { data: receiptData, isFetching: isReceipt } = useReceiptDownloadQuery({ id: receiptId, enabled: receipt })

  const { mutateAsync: deleteRent, isPending } = useAdvanceIncomeDeleteQuery()


  return (
    <div>
      <Timeline mode={"left"}>
        {data?.tenant_advance?.map((i, index) => (
          <Timeline.Item
            label={
              <p className="text-text-dark-secondary text-[14px] font-semibold">
                {getFormattedDate(i?.collected_on)}
              </p>
            }
            dot={
              i?.balance_amount > 0 ?
                <img src={yellow_icon} alt="" />
                :
                <img src={green_icon} alt="" />
            }
          >
            {
              <div className="w-full">
                <div className="flex gap-2 whitespace-nowrap">
                  <p className="text-text-color-secondary text-[14px] font-medium">
                    {i?.balance_amount > 0 ? "Partially Paid" : "Fully Paid."}
                  </p>
                  <p className="font-bold">-</p>
                  {i?.payment_method === "Cash" ? <img src={cash_icon} alt="" className="w-6 h-6" /> : <img src={upi_icon} alt="" className="w-6 h-6" />}
                  <span className="text-text-color-secondary text-[14px] font-normal">
                    {i?.payment_method}
                  </span>
                </div>

                <div className="mobile:flex block justify-between w-full">
                  <div className="flex items-center gap-3 flex-wrap w-auto">
                    <p className="text-text-color-secondary text-[14px] font-semibold">
                      ₹{i?.amount_recieved} Paid
                    </p>
                    <div className={`${i?.balance_amount == 0 ? "bg-bg-color-green" : "bg-light-yellow-bg"} rounded-[4px] flex items-center justify-center w-max px-2 py-1`}>
                      <span className={`${i?.balance_amount == 0 ? "text-paid-green" : "text-color-rellow"} text-[12px] font-semibold inline-block`}>
                        {i?.balance_amount == 0 ?
                          "Fully Paid"
                          :
                          "₹" + i?.balance_amount + " " + "Pending"
                        }
                      </span>
                    </div>
                    <p className="text-[14px] text-text-color-secondary">
                      Collected by:{" "}
                      <span className="font-medium">{i?.uploaded_by?.full_name}</span>
                    </p>
                  </div>
                  <div className="flex mobile:justify-between justify-start gap-2">
                    <button className="bg-[#EEF6FF] text-[#3E97FF] px-4 py-2 min-w-1/6 rounded-lg flex items-center  gap-2 justify-center" onClick={() => { setReceiptId(i?.id); setReceipt(true) }}>
                      <p className="whitespace-nowrap h-6 font-medium">
                        Download Receipt
                      </p>
                      <img src={receipt_icon} />
                    </button>
                    {data?.tenant_id?.is_active && index == 0 && getUserType() === 'admin' &&<div className="flex w-10">
                        <Space wrap className="cursor-pointer">
                          <Dropdown
                            open={isOpen === index} onOpenChange={(open) => setIsOpen(open ? index : "")}
                            trigger="click"
                            dropdownRender={() => {
                              return (
                                <div className='flex flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start'>
                                  <button onClick={() => {
                                    setPropertyId(data?.property_id?.id);
                                    setModalOpen(true)
                                    setModalType("Edit")
                                    setInstance(i)
                                    setIsOpen("")
                                  }} className='hover:bg-color-light-gray transition-all w-full text-secondary items-start'>
                                    Edit
                                  </button>
                                  <button onClick={() => {
                                    setDeleteOpen(true)
                                    setDeleteId(i?.id)
                                  }} className='hover:bg-color-light-gray transition-all w-full text-secondary'>
                                    Delete
                                  </button>
                                </div>
                              )
                            }}
                          >
                            <button><img src={edit_icon} alt='' /></button>
                          </Dropdown>
                        </Space>
                    </div>}
                  </div>
                </div>
              </div>
            }
          </Timeline.Item>
        ))}
      </Timeline>
      {propertyId && modalOpen &&
        <AddEdit id={propertyId} isModalOpen={modalOpen} setIsModalOpen={setModalOpen} type={modalType} instance={instance} rent_month={data?.rent_month} rent_year={data?.rent_year} refetch={refetch} />
      }
      {deleteOpen &&
        <Delete isModalOpen={deleteOpen} setIsModalOpen={setDeleteOpen} onClick={() => deleteRent(deleteId).then(res => {
          setDeleteOpen(false)
          navigate('/income/advance-income')
        }).catch(err => {
          ErrorToast({ message: err?.response?.data?.detail?.data?.[0] || "Something went wrong !" })
        })} />
      }
      <div ref={componentRef}>
        <AdvanceIncomeReceipt receiptData={receiptData} setReceipt={setReceipt} receipt={receipt} />
      </div>
    </div>
  );
}

export default CustomeTimeLine;
