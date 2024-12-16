import { Table } from 'antd';
import '../../Components/CustomeTable/table.css'

const CustomTable = ({ columns, data,loading}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table className='custom-table-dashboard' columns={columns} dataSource={data} loading={loading} pagination={false} />
    </div>
  )
}

export default CustomTable