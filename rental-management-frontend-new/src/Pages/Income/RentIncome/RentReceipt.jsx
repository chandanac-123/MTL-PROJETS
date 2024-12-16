import React, { useRef } from "react";
import rentEase from "../../../Static/Images/RentEase..svg";
import { Divider } from "antd";
import { currentDate, handlePdf, handlePdf1 } from "../../../Utils/Helper";
import ModalLayout from "../../../Common/ModalLayout";
import ContinueButton from "../../../Components/CustomButtons/ContinueButton";
import download_icon from "../../../Static/Images/file-down.svg";
import { useReactToPrint } from 'react-to-print';
import printIcon from "../../../Static/Images/print-icon.svg";
import PrintButton from "../../../Components/CustomButtons/PrintButton";
import logo from '../../../Static/Images/logo-dark.svg'

const RentReceipt = ({ receiptData, setReceipt, receipt }) => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
  return (
    <ModalLayout isModalOpen={receipt} setIsModalOpen={setReceipt}>
      <div style={{ overflowY: "auto", maxHeight: "75vh" }} className="mt-8">
        <div
          id="receipt"
          className="outline outline-1 rounded-lg w-full outline-button-secondary p-4"
          ref={componentRef}
        >
          <div className="sm:flex justify-between w-full">
            {/* <img src={rentEase} alt="" className="mr-4 w-40 h-5 mt-4 sm:mb-0 mb-4" /> */}
            <img src={logo} alt="" className="mr-4 w-32 h-15 sm:mb-0 pb-2" />
            <div className="flex flex-col sm:w-4/5 w-full">
              <div className="sm:block flex items-center justify-between">
                <label className=" text-secondary"> Mob:</label>
                <label className=" text-text-color-secondary font-medium">
                  87457845785
                </label>
              </div>
              <div className="sm:block flex items-center justify-between">
                <label className=" text-secondary"> Email:</label>
                <label className=" text-text-color-secondary font-medium">
                  {" "}
                  raju@1234gmail.com
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:w-[45%] w-full">
              <div className="sm:block flex items-center justify-between">
                <label className="w-24 text-secondary"> Invoice No:</label>
                <label className=" text-text-color-secondary font-medium">
                  {receiptData?.transaction_id}
                </label>
              </div>
              <div className="sm:block flex items-center justify-between">
                <label className=" text-secondary">Date:</label>
                <label className=" text-text-color-secondary font-medium">
                  {currentDate()}
                </label>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex justify-center mb-4 font-semibold text-text-color-secondary">
            Rent Receipt
          </div>
          <div className="text-secondary flex mb-4">
            Rent Received From
            <label className="text-color-black w-2/6 font-semibold ml-4 border-b border-l-secondary">
              {receiptData?.tenant_name}
            </label>
            of{" "}
            <label className="text-color-black font-semibold ml-4 border-b border-l-secondary w-3/12">
              ₹ {receiptData?.amount_recieved}
            </label>
          </div>
          <div className="text-secondary flex mb-4">
            for
            <label className="text-color-black font-semibold ml-4  border-b border-l-secondary w-full">
              {receiptData?.property_id?.parent_id?.property_name || receiptData?.property_id?.property_name},
              {receiptData?.property_id?.parent_id?.town || receiptData?.property_id?.town}
            </label>
          </div>
          <div className="text-secondary flex mb-4">
            on
            <label className="text-color-black font-semibold ml-4  border-b border-l-secondary w-full">
             {receiptData?.created_at}
            </label>
          </div>
          <div className="text-secondary flex mb-4">
            Received By:
            <label className="text-color-black w-2/6 font-semibold ml-4 border-b border-l-secondary">
              {receiptData?.uploaded_by?.full_name}
            </label>
          </div>
          <div className="text-secondary flex justify-between gap-2 mb-12">
            Phone Number:
            <label className="text-color-black w-2/6 font-semibold border-b border-l-secondary">
              {receiptData?.uploaded_by?.phone_number}
            </label>
            Signature:
            <label className="text-color-black w-2/6 font-semibold border-b border-l-secondary"></label>
          </div>
          <Divider />
          <div className="text-secondary  font-semibold">
            Terms and Conditions
          </div>
          <div className="flex p-4 text-secondary ">
            <ul className="list-disc pl-1">
              <li className="mb-2">
                The Tenant is responsible for paying the agreed-upon rent
                amount, as specified in the lease agreement, on or before the
                due date.
              </li>
              <li className="mb-2">
                {" "}
                The Landlord reserves the right to modify these terms and
                conditions with prior written notice to the Tenant.
              </li>
              <li className="mb-2">
                Rent payments must be made in the manner and to the account
                specified by the Landlord.
              </li>
              <li className="mb-2">
                If rent is not received by the due date, the Tenant may be
                subject to late fees as outlined in the lease agreement.
              </li>
              <li className="mb-2">
                The Tenant is responsible for retaining all rent receipts for
                their records and tax purposes.
              </li>
              <li className="mb-2">
                Any disputes regarding rent payments, late fees, or other
                financial matters should be communicated in writing to the
                Landlord for resolution.
              </li>
              <li className="mb-2">
                Rent receipts are non-transferable and are only valid for the
                Tenant named therein.
              </li>
              <li className="mb-2">
                Any refund of a security deposit will be documented on the final
                rent receipt.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end pt-6 gap-4">
          <ContinueButton
            type="button"
            img={download_icon}
            onClick={() => handlePdf1("receipt")}
            label="Download Receipt"
          />
          {/* <button onClick={handlePrint}>Print Receipt</button> */}
          <div className="mr-3">
          <PrintButton type="button" onClick={handlePrint} label="Print" img={printIcon} />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default RentReceipt;
