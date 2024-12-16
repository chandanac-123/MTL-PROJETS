import React, { useState } from "react";
import CustomTable from "../../../Components/CustomeTable";
import { useExpenseDeleteQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import Delete from "../../../Common/Delete";
import { ErrorToast } from "../../../Utils/AlertMessages";

const Table = ({ data, tableParams, onChange, loading, id }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteExpense, isPending } = useExpenseDeleteQuery()

  const columns = [
    {
      title: "BUILDING NAME",
      dataIndex: "property_name",
      className: "text-[#071437] font-bold",
      sorter:true
    },
    {
      title: "TARGET.AMT",
      dataIndex: "target_amount",
      className: "text-[#5F9EA0] ",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
          ₹ {record?.target_amount}
          </span>
        </div>
      ),
    },
    {
      title: "RECEIVED",
      dataIndex: "amount_recieved",
      className: "text-[#006400] ",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
          ₹ {record?.amount_recieved}
          </span>
        </div>
      ),
    },

    {
        title: "BALANCE",
        dataIndex: "balance_amount",
        className: "text-[#666666] uppercase",
        render: (text, record) => (
          <div className="">
            <span className="mobile:whitespace-nowrap">
            ₹ {record?.balance_amount}
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
