import React, { useState } from "react";
import CustomTable from "../../../Components/CustomeTable";
import { Dropdown, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import view_icon from "../../../Static/Images/view_icon.svg";
import action_icon from "../../../Static/Images/arrows.svg";
import { useExpenseDeleteQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import Delete from "../../../Common/Delete";
import { ErrorToast } from "../../../Utils/AlertMessages";
import { getUserType } from "../../../Utils/utils";

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
            {record?.property_id?.property_name ||record?.property_id?.parent_id?.property_name}
          </span>
        </div>
      ),
    },
    {
      title: "EXPENSE TYPE",
      dataIndex: "expense_type",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            {record?.expense_type?.name}
          </span>
        </div>
      ),
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
    },
    {
      title: "AMOUNT",
      dataIndex: "expense_amount",
      className: "text-[#EC305E] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="flex mobile:whitespace-nowrap w-36">
          ₹ {record?.expense_amount}
          </span>
        </div>
      ),
    },
    {
      title: "MANAGER NAME",
      dataIndex: "name",
      className: "text-[#666666] uppercase",
      render: (text, record) => (
        <div className="">
          <span className="mobile:whitespace-nowrap">
            {record?.uploaded_by?.full_name}
          </span>
        </div>
      ),
    },

    {
      title: "ACTION",
      dataIndex: "operation",
      key: "operation",
      align: "right",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              setViewOpen(!viewOpen);
              navigate(`view/${record.id}`);
            }}
          >
            <img src={view_icon} alt="" />
          </button>
          { getUserType()==='admin' &&
          <Dropdown
            dropdownRender={() => {
              return (
                <div className="flex flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setId(record?.id);
                    }}
                    className="hover:bg-color-light-gray transition-all w-full text-secondary items-start"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setId(record?.id);
                    }}
                    className="hover:bg-color-light-gray transition-all w-full text-secondary"
                  >
                    Delete
                  </button>
                </div>
              );
            }}
          >
            <button>
              <img src={action_icon} alt="" />
            </button>
          </Dropdown>}
        </Space>
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
