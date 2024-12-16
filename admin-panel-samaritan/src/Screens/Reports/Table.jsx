import TableComponet from '../../Components/Table';
import { dateConversion } from '../../Utiles/Helper';

const Table = ({ data, onChange, loading, tableParams, setTableParams }) => {

  const columns = [
    {
      title: 'USER DETAILS',
      dataIndex: 'name',
      className: 'whitespace-nowrap',
      render: (_, record) => {
        return (
          <div className="flex w-full gap-2 mr-8">
            <img loading="lazy" src={record?.profile_pic} alt="" className="w-12 h-12 rounded-3xl" />
            <div className="flex flex-col">
              <p className="text-table_text font-semibold text-base">{record?.full_name}</p>
              <p className="text-table_text_grey font-medium">{record?.user_name}</p>
            </div>
          </div>
        );
      }
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      className: 'text-[#66727E]',
      className: 'whitespace-nowrap'
    },
    {
      title: 'PHONE NO',
      dataIndex: 'mobile',
      className: 'text-[#66727E]',
      className: 'whitespace-nowrap'
    },
    {
      title: 'BADGE',
      dataIndex: 'name',
      className: 'text-[#66727E]',
      render: (_, record) => (
        <div className="flex w-60">
          <div className="flex flex-wrap rounded-2xl pr-4 justify-center items-center outline outline-1 outline-badge-grey bg-btn_grey gap-1 font-semibold text-badge_text w-auto">
            <img loading="lazy" src={record?.Badge?.image_url} alt="" className="w-[26px] h-[26px]" />
            {record?.Badge?.display_name}
          </div>
        </div>
      )
    },
    {
      title: 'CREATED ON',
      dataIndex: 'createdAt',
      align: 'right',
      className: 'text-[#66727E] whitespace-nowrap',
      render: (_,record) => (
        <div>{dateConversion(record?.createdAt)}</div>
      )
    }
  ];

  return (
    <div>
      <TableComponet setTableParams={setTableParams} tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
    </div>
  );
};

export default Table;
