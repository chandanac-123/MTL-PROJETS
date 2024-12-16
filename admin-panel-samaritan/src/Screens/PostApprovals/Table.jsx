import { useState } from 'react';
import TableComponet from '../../Components/Table';
import action_icon from '../../assets/action.svg';
import view_icon from '../../assets/view.svg';
import { Dropdown, Space, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import dot from '../../assets/dot.svg';
import approve_icon from '../../assets/approve.svg';
import reject_icon from '../../assets/reject.svg';
import ApproveReject from '../../Common/ApproveReject';
import { dateConversion, splitWordFun } from '../../Utiles/Helper';
import dummy from '../../assets/dummy.svg';

const Table = ({ data, loading, onChange, tableParams,setTableParams }) => {
  const navigate = useNavigate();
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [id, setId] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState(Array(data?.length).fill(false));

  const closeAllDropdowns = () => {
    setOpenDropdowns(Array(data?.length).fill(false));
  };

  const handleApprove = (val) => {
    setId(val);
    setApprove(!approve);
    setReject(false);
    closeAllDropdowns();
  };

  const handleReject = (val) => {
    setId(val);
    setReject(!reject);
    setApprove(false);
    closeAllDropdowns();
  };

  const columns = [
    {
      title: 'POST',
      dataIndex: 'name',
      render: (_, record) => {
        return (
          <div className="flex gap-2 whitespace-nowrap mr-8">
            <img loading="lazy" src={record?.PostImages[0]?.image_url || dummy} alt="" className="w-16 h-16 rounded-lg" />
            <div className="flex w-full flex-col">
              <Tooltip title={record?.title?.length > 25 ? record?.title : ''}>
                <span className="text-table_text font-semibold text-base">{splitWordFun(record?.title, 25)}</span>
              </Tooltip>
              <div className="flex flex-wrap gap-2">
                <p className="text-red font-semibold bg-categorybg w-auto pl-2 pr-2  h-auto rounded-xl">{record?.PostCategory?.display_name.toUpperCase()}</p>
                <div className="flex mobile:flex-wrap gap-2">
                  <img loading="lazy" src={dot} alt="" />
                  <p className="text-table_text_grey">{dateConversion(record?.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'USER DETAILS',
      dataIndex: 'name',
      className: 'whitespace-nowrap',
      render: (_, record) => {
        return (
          <div className="flex gap-2 mr-8">
            <img loading="lazy" src={record?.User?.profile_pic || dummy} alt="" className="w-12 h-12 rounded-3xl" />
            <div className="flex flex-col">
              <p className="text-table_text font-semibold text-base">{record?.User?.full_name}</p>
              <p className="text-table_text_grey font-medium">{record?.User?.user_name}</p>
            </div>
          </div>
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
            open={openDropdowns[index]}
            onOpenChange={(visible) => setOpenDropdowns((prevState) => prevState.map((value, i) => (i === index ? visible : false)))}
            dropdownRender={() => {
              return (
                <div className="flex w-full flex-col gap-3 bg-white shadow-md rounded-md px-5 py-2 overflow-hidden justify-start items-start">
                  <button className="hover:bg-light_green transition-all  hover:text-green items-start" onClick={() => handleApprove(record?.id)}>
                    Approve
                  </button>
                  <button className="items-start flex hover:bg-light_green hover:text-green transition-all w-full text-secondary" onClick={() => handleReject(record?.id)}>
                    Reject
                  </button>
                </div>
              );
            }}
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
      <ApproveReject
        id={id}
        approve={approve}
        reject={reject}
        setApprove={setApprove}
        setReject={setReject}
        label={approve ? 'Approve' : 'Reject'}
        icon={approve ? approve_icon : reject_icon}
        message={approve ? 'Are you sure you want to approve this post?' : 'Are you sure you want to reject this post?'}
      />
      <TableComponet columns={columns} data={data} loading={loading} onChange={onChange} tableParams={tableParams} setTableParams={setTableParams}/>
    </div>
  );
};

export default Table;
