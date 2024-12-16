import { Dropdown, Space } from 'antd';
import TableComponet from '../../../Components/Table';
import action_icon from '../../../assets/action.svg';
import { useState } from 'react';
import Delete from '../../../Common/Delete';
import AssignAndDelete from '../../../Common/AssignAndDelete';
import { useCategoryDeleteQuery } from '../../../ApiQueries/EventCategory/EventCategoryQueries';

const Table = ({ data, loading, setId, setOpen, id, onChange ,setTableParams}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [assignDelete, setAssignDelete] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(data?.length).fill(false));
  const { mutateAsync: assigndelete, isPending } = useCategoryDeleteQuery();

  const closeAllDropdowns = () => {
    setOpenDropdowns(Array(data?.length).fill(false));
  };

  const handleDeleteClick = () => {
    closeAllDropdowns();
    setAssignDelete(!assignDelete);
  };

  const handleEditClick = () => {
    closeAllDropdowns();
    setOpen(true);
  };

  const columns = [
    {
      title: 'CATEGORY NAME',
      dataIndex: 'name',
      render: (_, record) => {
        return <p className="text-text_grey text-base ">{record?.display_name}</p>;
      }
    },
    {
      title: 'EVENTS COUNT',
      dataIndex: 'username',
      render: (_, record) => {
        return <p className="text-text_grey text-base">{record?.n_events}</p>;
      }
    },
    {
      title: 'ACTION',
      align: 'right',
      render: (_, record, index) => (
        <Space size="middle">
          <Dropdown
            trigger="click"
            open={openDropdowns[index]}
            onOpenChange={(visible) => setOpenDropdowns((prevState) => prevState.map((value, i) => (i === index ? visible : false)))}
            dropdownRender={() => (
              <div className="flex w-full flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start">
                <button
                  className="hover:bg-light_green transition-all  hover:text-green items-start "
                  onClick={() => {
                    setId(record);
                    handleEditClick();
                  }}
                >
                  Edit
                </button>
                <button
                  className="hover:bg-light_green hover:text-green transition-all w-full text-secondary"
                  onClick={() => {
                    setId(record?.id);
                    handleDeleteClick();
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          >
            <button>
              <img loading="lazy" src={action_icon} alt="" />
            </button>
          </Dropdown>
        </Space>
      )
    }
  ];
  return (
    <div>
      <TableComponet columns={columns} data={data} loading={loading} onChange={onChange} setTableParams={setTableParams}/>
      <Delete
        id={id}
        isDeleteOpen={deleteModal}
        setIsDeleteOpen={setDeleteModal}
        name="category"
        onClick={() => {
          let data = {
            initialCategoryId: id,
            newAssignedCategoryId: assignDelete
          };
          assigndelete({ data })
            .then((res) => {
              setDeleteModal(false);
              setAssignDelete(false);
            })
            .catch((err) => err);
        }}
      />
      <AssignAndDelete id={id} isOpen={assignDelete} setIsOpen={setAssignDelete} setIsDeleteOpen={setDeleteModal} />
    </div>
  );
};

export default Table;
