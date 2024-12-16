import { Table } from 'antd';
import './style.css';
import SelectComponent from '../Inputs/Select';
import { rowsperpage } from '../../Utiles/Constants';

const TableComponent = ({ columns, data, loading, tableParams, onChange, setTableParams }) => {

  const handleSelect = (value) => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          pageSize: value?.value,
          current: 1
        }
      };
    });
  };

  return (
    <div style={{ overflow: 'auto' }}>
      <Table
        rowKey={(record) => record.id}
        className="custom-table"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...tableParams,
          showSizeChanger: false,
          responsive: true,
          pageSizeOptions: [15, 20, 30, 40, 50]
        }}
        onChange={onChange}
      />
      <div className='w-[78px] h-[36px] relative bottom-12 left-3'>
        <SelectComponent options={rowsperpage} placeholder={10} constant={true} isClearable={false} onChange={handleSelect} menuPlacement="top" />
      </div>
    </div>
  );
};

export default TableComponent;
