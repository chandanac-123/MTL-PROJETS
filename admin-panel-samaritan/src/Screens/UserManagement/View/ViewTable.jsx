import TableComponet from '../../../Components/Table';
import { dateConversion, indianNumFormat } from '../../../Utiles/Helper';

const ViewTable = ({ tableData, onChange, loading, tableParams ,setTableParams}) => {
  const columns = [
    {
      title: 'NGO NAME',
      dataIndex: 'ngoName',
      className: 'text-[#66727E]  text-base font-semibold',
      render: (_, record) => {
        return <div className="text-sm font-normal">{record?.ngoName}</div>;
      }
    },
    {
      title: 'AMOUNT DONATED',
      dataIndex: 'amount',
      className: 'text-[#C99055] font-semibold text-base',
      render: (_, record) => {
        return <div className="text-sm font-normal whitespace-nowrap">₹ {indianNumFormat(record?.amount)}</div>;
      }
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      align: 'right',
      className: 'text-[#66727E] font-semibold text-base',
      render: (_, record) => {
        return <div className="text-sm font-normal whitespace-nowrap">{dateConversion(record?.date)}</div>;
      }
    }
  ];

  return (
    <div className="mt-4">
      <TableComponet columns={columns} data={tableData} onChange={onChange} loading={loading} tableParams={tableParams} setTableParams={setTableParams} />
    </div>
  );
};

export default ViewTable;
