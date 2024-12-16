import React, { useState } from "react";
import CustomTable from "../../../Components/CustomeTable";
import { Dropdown, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import view_icon from "../../../Static/Images/view_icon.svg";
import action_icon from "../../../Static/Images/arrows.svg";
import { useExpenseDeleteQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import Delete from "../../../Common/Delete";
import { ErrorToast } from "../../../Utils/AlertMessages";

const Table = ({ data, tableParams, setId, onChange, loading, id ,setOpenEdit,setOpenDelete}) => {
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
            {record?.property_name||record?.parent_id?.property_name}
          </span>
          <p className="text-text-color-secondary font-light">
            {record?.property_type} {record?.flat_number ? <> |  {record?.flat_number}</> : <>| {record?.house_number}</>}
          </p>
        </div>
      ),
      sorter: true,
    },
    {
      title: "LOCATION",
      dataIndex: "expense_type",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
            <span className="mobile:whitespace-nowrap">
          {record?.town||record?.parent_id?.town}
          </span>
        </div>
      ),
    },
    {
      title: "TENANT NAME",
      dataIndex: "property_history__tenant_id__tenant_name",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
          {record?.property_history[0]?.tenant_id?.tenant_name || '--'}
          </span>
        </div>
      ),
      sorter: false,
    },
    {
      title: "OCCUPANCY",
      dataIndex: "expense_amount",
      className: "text-[#EC305E] ",
      render: (text, record) => (
        <div className="">
          <span className={`mobile:whitespace-nowrap ${record?.is_occupied?"text-green-500":"text-[#EC305E]"}`}>
            {record?.is_occupied?"Occupied":"Vacant"}
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
