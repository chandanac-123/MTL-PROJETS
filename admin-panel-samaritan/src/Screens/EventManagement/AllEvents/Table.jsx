import { Dropdown, Space, Tag, Tooltip } from 'antd';
import TableComponet from '../../../Components/Table';
import action_icon from '../../../assets/action.svg';
import view_icon from '../../../assets/view.svg';
import { useState } from 'react';
import Delete from '../../../Common/Delete';
import { useNavigate } from 'react-router-dom';
import dot from '../../../assets/dot.svg';
import { combineFun, daysOfWeekConversion, splitWordFun } from '../../../Utiles/Helper';
import { useEventDeleteQuery } from '../../../ApiQueries/AllEvent/EventQueries';

const Table = ({ data, loading, onChange, setTableParams, tableParams }) => {
  const navigate = useNavigate();
  const [id, setId] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(data?.length).fill(false));
  const { mutateAsync: deleteEvent, isPending } = useEventDeleteQuery();

  const closeAllDropdowns = () => {
    setOpenDropdowns(Array(data?.length).fill(false));
  };

  const handleDeleteClick = () => {
    closeAllDropdowns();
    setDeleteModal(!deleteModal);
  };

  function getStatusClassName(status) {
    return `${status === 'expired' ? 'text-status_redtext' : 'text-status_green'} font-medium text-xs font-inter h-6 flex items-center`;
  }

  const columns = [
    {
      title: 'EVENT ITEM',
      dataIndex: 'name',
      render: (_, record, index) => {
        return (
          <div className="flex gap-2 mr-8">
            <img loading="lazy" src={record?.cover_image} alt="" className="w-12 h-12" />
            <div className="flex flex-col">
              <p className="text-table_text font-semibold text-base whitespace-nowrap"> <Tooltip title={record?.name?.length > 40 ? record?.name : ''}>
                <span className="text-table_text font-semibold text-base">{splitWordFun(record?.name, 40)}</span>
              </Tooltip> </p>
              <div className="flex flex-wrap gap-2">
                <p className="text-red font-semibold bg-categorybg w-auto pl-2 pr-2 h-auto rounded-xl">{record?.['PostCategory.display_name']?.toUpperCase()} </p>
                <div className="flex mobile:flex-wrap gap-2">
                  <img loading="lazy" src={dot} alt="" />
                  <p className="text-table_text_grey">
                    {daysOfWeekConversion(record?.start_date)} | {combineFun(record?.start_time, record?.end_time, 'time')}{' '}
                  </p>
                </div>
                <div className="flex mobile:flex-wrap gap-2">
                  <img loading="lazy" src={dot} alt="" />
                  <p className="text-table_text_grey">{combineFun(record?.venue, record?.location)} </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <Tag bordered={false} color={record.event_status === 'expired' ? '#FFF5F8' : '#E8FFF3'}>
            <div className={getStatusClassName(record.event_status)}>{record.event_status === 'expired' ? 'Expired' : 'Upcoming'}</div>
          </Tag>
        );
      }
    },
    {
      title: 'ACTION',
      align: 'right',
      render: (_, record, index) => (
        <Space size="middle">
          <div>
            <button onClick={() => navigate(`view/${record?.id}`)}>
              <img loading="lazy" src={view_icon} alt="" />
            </button>
          </div>
          <Dropdown
            trigger="click"
            disabled={record.event_status === 'expired' && true}
            open={openDropdowns[index]}
            onOpenChange={(visible) => setOpenDropdowns((prevState) => prevState.map((value, i) => (i === index ? visible : false)))}
            dropdownRender={() => (
              <div className="flex w-full flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start">
                <button
                  className="hover:bg-light_green transition-all  hover:text-green items-start "
                  onClick={() => {
                    navigate(`edit/${record?.id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setId(record?.id);
                    handleDeleteClick();
                  }}
                  className="hover:bg-light_green hover:text-green transition-all w-full text-secondary"
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
      <TableComponet columns={columns} data={data} loading={loading} onChange={onChange} tableParams={tableParams} setTableParams={setTableParams} />
      <Delete
        isDeleteOpen={deleteModal}
        setIsDeleteOpen={setDeleteModal}
        name="event"
        onClick={() => {
          let data = { eventId: id };
          deleteEvent({ data })
            .then((res) => {
              setDeleteModal(false);
            })
            .catch((err) => err);
        }}
      />
    </div>
  );
};

export default Table;
