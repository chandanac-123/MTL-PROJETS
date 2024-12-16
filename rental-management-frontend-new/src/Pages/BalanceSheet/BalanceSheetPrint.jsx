import React, { useRef } from "react";
import rentEase from "../../Static/Images/RentEase..svg";
import { Divider } from "antd";
import ModalLayout from "../../Common/ModalLayout";
import { useReactToPrint } from "react-to-print";
import printIcon from "../../Static/Images/print-icon.svg";
import PrintButton from "../../Components/CustomButtons/PrintButton";
import { useBalanceSheetListQuery } from "../../ApiQuery/BalanceSheet/BalancesheetQuery";
import CustomTable from "../Dashboard/CustomeTable";

const BalanceSheetPrint = ({ tableParams, setShowPrint, showPrint }) => {
  const { data: list, isLoading, isFetching } = useBalanceSheetListQuery({ ...tableParams, is_print: true })
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns = [
    {
      title: 'BUILDING NAME',
      dataIndex: 'property_name',
      className: 'text-[#071437] font-bold',
      render: (text, record) => (
        <div className='flex'>
          <div className='flex-col'>
            <span className='ml-4 mobile:whitespace-nowrap'>{text}</span>
            <p className='ml-4 text-text-color-secondary font-light' >{record?.property_type}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'INCOME',
      dataIndex: 'income_recieved',
      className: 'text-[#00C47D] uppercase',
      render: (_, record) => {
        return (
          <>₹ {record?.income_recieved}</>
        )
      }
    },
    {
      title: 'EXPENSES',
      dataIndex: 'expense_recieved',
      className: 'text-[#EC305E] uppercase',
      render: (_, record) => {
        return (
          <>₹ {record?.expense_recieved}</>
        )
      }
    },
    {
      title: 'BALANCE',
      dataIndex: 'balance_amount',
      className: 'text-[#FC3C00] uppercase',
      render: (_, record) => {
        return (
          <>₹ {record?.balance_amount}</>
        )
      }
    },
    {
      title: 'TARGET',
      dataIndex: 'target_amount',
      className: 'text-[#7239EA] uppercase',
      render: (_, record) => {
        return (
          <>₹ {record?.target_amount}</>
        )
      }
    },
  ]

  return (
    <ModalLayout isModalOpen={showPrint} setIsModalOpen={setShowPrint} width={900}>
      <div style={{ overflowY: "auto", maxHeight: "75vh" }} className="mt-8">
        <div ref={componentRef} >
          <CustomTable columns={columns} data={list} loading={isLoading} />
        </div>
        <div className="flex justify-end pt-6 gap-4">
          <div className="mr-3">
            <PrintButton
              type="button"
              onClick={handlePrint}
              label="Print"
              img={printIcon}
            />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default BalanceSheetPrint;
