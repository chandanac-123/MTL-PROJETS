import React, { useState } from "react";
import CustomTable from "../../../Components/CustomeTable";
import { useNavigate } from "react-router-dom";
import credit from "../../../Static/Images/credit.svg";
import debit from "../../../Static/Images/debit.svg";
import upi from "../../../Static/Images/upi.svg";
import cash from "../../../Static/Images/cash.svg";
import { useExpenseDeleteQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import Delete from "../../../Common/Delete";
import { ErrorToast } from "../../../Utils/AlertMessages";
import { formatCurrencyIndianStyle, getMonthName } from "../../../Utils/utils";
import { Tooltip } from "antd";

const Table = ({ data, tableParams, setId, onChange, loading, id, setOpenEdit, setOpenDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const { mutateAsync: deleteExpense, isPending } = useExpenseDeleteQuery()

  const columns = [
    {
      title: "BUILDING NAME",
      dataIndex: "property_name",
      className: "text-[#071437] font-bold",
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="mobile:whitespace-nowrap">
            {record?.property_id?.property_name || record?.property_id?.parent_id?.property_name}
          </span>
          <p className="text-text-color-secondary font-light">
            {record?.property_id?.property_type_id?.name} {record?.property_id?.flat_number ? <> |  {record?.property_id?.flat_number}</> : <>| {record?.property_id?.house_number}</>}
          </p>
        </div>
      ),
      sorter: true
    },
    {
      title: "DATE",
      dataIndex: "collected_on",
      className: "text-[#666666] uppercase",
      sorter: true
    },
    {
      title: "RENT OF MONTH",
      className: "text-[#006400] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="whitespace-nowrap">
            {getMonthName(record?.rent_month)} {record?.rent_year}
          </span>
        </div>
      ),
    },
    {
      title: "TENANT NAME",
      dataIndex: "monthly_income__tenant_id__tenant_name",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <Tooltip title={record?.monthly_income?.tenant_id?.tenant_name?.length > 20 && record?.monthly_income?.tenant_id?.tenant_name}>
          <span className="mobile:whitespace-nowrap">
            {formatCurrencyIndianStyle(record?.monthly_income?.tenant_id?.tenant_name, 20)}
          </span>
        </Tooltip>
      ),
      sorter: true
    },
    {
      title: "AMT.RCVD",
      dataIndex: "amount_recieved",
      className: "text-[#006400] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            ₹{record?.amount_recieved}
          </span>
        </div>
      ),
      sorter: true
    },
    {
      title: "AMT.RENT",
      dataIndex: "monthly_income__rent_id__rent_amount",
      className: "text-[#5F9EA0] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            ₹{record?.monthly_income?.rent_id?.rent_amount}
          </span>
        </div>
      ),
      sorter: true
    },


    {
      title: "OPN.BAL",
      dataIndex: "opening_balance_amount",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            ₹{record?.opening_balance_amount}
          </span>
        </div>
      ),
    },

    {
      title: "NET.BAL",
      dataIndex: "net_due_balance",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            ₹{record?.net_due_balance}
          </span>
        </div>
      ),
    },

    {
      title: "PAYT.MODE",
      dataIndex: "payment_method",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">

            <div className="flex gap-2">
              <img src={record?.payment_method == 'Credit Card' ? credit : record?.payment_method == 'Debit Card' ? debit : record?.payment_method == 'Cash' ? cash : upi} />
              <p>{record?.payment_method == 'Credit Card' ? "Credit Card" : record?.payment_method == 'Debit Card' ? "Debit Card" : record?.payment_method == 'Cash' ? "Cash" : "UPI"}</p>
            </div>

          </span>
        </div>
      ),
    },

  ];
  return (
    <>
      <CustomTable
        tableParams={tableParams}
        columns={columns}
        data={data}
        onChange={onChange}
        loading={loading}
      />
      <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteExpense(id).then(res => { setOpen(false) }).catch(err => {
        ErrorToast({ message: "Something went wrong !" })
      })} />
    </>
  );
};

export default Table;
