import React, { useRef } from "react";
import rentEase from "../../Static/Images/RentEase..svg";
import { Divider } from "antd";
import { currentDate, handlePdf } from "../../Utils/Helper";
import ModalLayout from "../../Common/ModalLayout";
import ContinueButton from "../../Components/CustomButtons/ContinueButton";
import download_icon from "../../Static/Images/file-down.svg";
import { useReactToPrint } from "react-to-print";
import printIcon from "../../Static/Images/print-icon.svg";
import PrintButton from "../../Components/CustomButtons/PrintButton";
import logo from '../../Static/Images/logo-dark.svg'

const BalanceSheetReceipt = ({ receiptData, setReceipt, receipt }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <ModalLayout isModalOpen={receipt} setIsModalOpen={setReceipt}>
        <div
          id="receipt"
          className="outline outline-1 rounded-lg w-full outline-button-secondary p-4"
          ref={componentRef}
        >
          <div className="sm:flex justify-between w-full">
            {/* <img src={rentEase} alt="" className="mr-4 w-40 h-5 mt-4" /> */}
            <img src={logo} alt="" className="mr-4 w-32 h-15 sm:mb-0 pb-2" />
            <div className='flex flex-col sm:w-4/5 w-full'>
              <div className='sm:block flex items-center justify-between'>
                <label className=" text-secondary"> Mob:</label>
                <label className=" text-text-color-secondary font-medium">
                  87457845785
                </label>
              </div>
              <div className='sm:block flex items-center justify-between'>
                <label className=" text-secondary"> Email:</label>
                <label className=" text-text-color-secondary font-medium">
                  {" "}
                  raju@1234gmail.com
                </label>
              </div>
            </div>
            <div className='flex flex-col sm:w-[28%] w-full'>
              <div className='sm:block flex items-center justify-between'>
                <label className=" text-secondary">Date:</label>
                <label className=" text-text-color-secondary font-medium">
                  {currentDate()}
                </label>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-center mb-4 font-semibold text-text-color-secondary">
            Balance Sheet Receipt
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3 whitespace-nowrap">Property Name</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.property_name}
              </label>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3 whitespace-nowrap">Address</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.address}, {receiptData?.town}, {receiptData?.state_id?.state_name}, {receiptData?.pincode}
              </label>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3">Total Income</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.income_recieved}
              </label>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3">Total Expense</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.expense_recieved}
              </label>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3">Total Net Due</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.balance_amount}
              </label>
            </div>
            <div className="flex items-center gap-5">
              <p className="text-secondary w-1/3">Total Target</p>
              <label className="text-color-black font-semibold border-b border-l-secondary w-full">
                {receiptData?.target_amount}
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-6 gap-4">
          <ContinueButton
            type="button"
            img={download_icon}
            onClick={() => handlePdf("receipt", "balance-sheet")}
            label="Download Receipt"
          />
          <div className="mr-3">
            <PrintButton
              type="button"
              onClick={handlePrint}
              label="Print"
              img={printIcon}
            />
          </div>
        </div>
    </ModalLayout>
  );
};

export default BalanceSheetReceipt;
