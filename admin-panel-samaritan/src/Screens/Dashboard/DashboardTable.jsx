import { Table } from 'antd';

const DashboardTable = ({ columns, data, loading }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={data} loading={loading} pagination={false} />
    </div>
  );
};

export default DashboardTable;
