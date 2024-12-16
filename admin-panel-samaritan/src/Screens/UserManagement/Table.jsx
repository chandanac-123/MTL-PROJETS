import TableComponet from '../../Components/Table';
import view from '../../assets/view.svg';
import block_icon from '../../assets/block.svg';
import unblockuser from '../../assets/unblockUser.svg';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import reject_icon from '../../assets/reject.svg';
import unblock_icon from '../../assets/unblock.svg';
import Confirmation from '../../Common/BlockUnblock';
import { useState } from 'react';
import profile from '../../assets/profile.png';

const Table = ({ data, id, setId, onChange, loading, tableParams, setTableParams }) => {
  const navigate = useNavigate();
  const [block, setBlock] = useState(false);
  const [unblock, setUnblock] = useState(false);

  const columns = [
    {
      title: 'IMAGE',
      dataIndex: 'image',
      render: (_, record) => (
        <div className="flex">
          <img loading="lazy" src={record?.profile_pic || profile} alt="" className="w-16 h-16 rounded-lg" />
        </div>
      )
    },
    {
      title: 'NAME',
      dataIndex: 'full_name',
      render: (_, record) => <div className="flex text-text_grey font-semibold text-base">{record?.full_name}</div>
    },
    {
      title: 'USERNAME',
      dataIndex: 'username',
      render: (_, record) => <div className="flex text-text_grey text-base">{record?.user_name}</div>
    },
    {
      title: 'BADGE',
      dataIndex: 'badge',
      render: (_, record) => (
        <div className="flex w-60">
          <div className="flex flex-wrap rounded-2xl pr-4 justify-center items-center outline outline-1 outline-badge-grey bg-btn_grey gap-1 font-semibold text-xs font-inter text-badge_text w-auto">
            <img loading="lazy" src={record?.Badge?.image_url} alt="" className="w-[26px] h-[26px]" />
            {record?.Badge?.display_name}
          </div>
        </div>
      )
    },
    {
      title: 'STATUS',
      dataIndex: 'badge',
      render: (_, record) => {
        let colors = record?.is_active ? 'green' : record?.is_blocked ? "red" : record?.is_deleted ? "grey" : !record?.is_active && !record?.is_blocked && !record?.is_deleted ? "orange" : ""
        let text = record?.is_active ? 'Active' : record?.is_blocked ? "Blocked" : record?.is_deleted ? "Deleted" : !record?.is_active && !record?.is_blocked && !record?.is_deleted ? "Inactive" : ""
        return (
          <div className='flex w-28 font-semibold' style={{ color: colors }}>
            {text}
          </div>
        )
      },
    },
    {
      title: 'KUDOS RECEIVED',
      dataIndex: 'kudosReceived',
      render: (_, record) => <div className="flex text-text_grey text-base">{record?.awardedTo?.length}</div>
    },
    {
      title: 'ACTION',
      dataIndex: 'name',
      align: 'right',
      render: (_, record) => (
        <Space size="middle" >
          <button onClick={() => navigate(`view/${record?.id}`)}>
            {' '}
            <img loading="lazy" src={view} alt="" />
          </button>
          {!record?.is_blocked && (
            <button
              disabled={record?.is_deleted}
              onClick={() => {
                setUnblock(false);
                setBlock(!block);
                setId(record?.id);
              }}
            >
              <img loading="lazy" src={unblockuser} alt="" />
            </button>
          )}
          {record?.is_blocked && (
            <button
              disabled={record?.is_deleted}
              onClick={() => {
                setBlock(false);
                setUnblock(!unblock);
                setId(record?.id);
              }}
            >
              <img loading="lazy" src={block_icon} alt="" />
            </button>
          )}
        </Space>
      )
    }
  ];

  return (
    <div>
      <TableComponet setTableParams={setTableParams} tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
      <Confirmation
        block={block}
        unblock={unblock}
        setBlock={setBlock}
        setUnblock={setUnblock}
        label={block ? 'Block' : 'Unblock'}
        icon={block ? unblock_icon : reject_icon}
        actionType={id}
        message={block ? 'Are you sure you wish to restrict / block this individual?' : 'Are you certain you wish to unblock this individual?'}
      />
    </div>
  );
};

export default Table;
