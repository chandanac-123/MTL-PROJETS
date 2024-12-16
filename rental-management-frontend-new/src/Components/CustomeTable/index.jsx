import React, { useState } from 'react'
import { Table } from 'antd';
import './table.css'

const CustomTable = ({ columns, data, onChange ,loading,tableParams}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table className='custom-table' columns={columns} dataSource={data} loading={loading}
        pagination={{...tableParams, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] ,responsive:true}}
        onChange={onChange} />
    </div>
  )
}

export default CustomTable