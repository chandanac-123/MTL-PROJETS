import React, { useState } from "react";
import CustomTable from "../../../Components/CustomeTable";
import { useExpenseDeleteQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import Delete from "../../../Common/Delete";
import { ErrorToast } from "../../../Utils/AlertMessages";

const Table = ({ data, tableParams, onChange, loading, id ,setOpenEdit,setOpenDelete}) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteExpense, isPending } = useExpenseDeleteQuery()

  const columns = [
    {
      title: "BUILDING NAME",
      dataIndex: "property_id__property_name",
      className: "text-[#071437] font-bold",
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="mobile:whitespace-nowrap">
            {record?.property_id?.property_name||record?.property_id?.parent_id?.property_name}
          </span>
        </div>
      ),
      sorter: true,
    },
    {
      title: "EXPENSE TYPE",
      dataIndex: "expense_type_id__name",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
            <span className="mobile:whitespace-nowrap">
          {record?.expense_type.name}
          </span>
        </div>
      ),
      sorter: true,

    },
    {
      title: "DATE",
      dataIndex: "created_at",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
            <span className="mobile:whitespace-nowrap">
          {record?.created_at.split(" ")[0]}
          </span>
        </div>
      ),
      sorter: true,

    },
    {
      title: "REMARKS",
      dataIndex: "created_at",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
          {record?.remarks || '--'}
          </span>
        </div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "expense_amount",
      className: "text-[#5F9EA0] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
          ₹{record?.expense_amount}
          </span>
        </div>
      ),
      sorter: true,
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
