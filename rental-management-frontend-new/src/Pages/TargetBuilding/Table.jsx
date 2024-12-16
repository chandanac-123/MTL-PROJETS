import React, { useState } from 'react'
import CustomTable from '../../Components/CustomeTable';
import { Space } from 'antd';
import edit_icon from '../../Static/Images/edit_pencil.svg'
import Edit from './Edit';
import { getUserType } from '../../Utils/utils';

const Table = ({ data, tableParams, onChange, loading, }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: 'BUILDING NAME',
      dataIndex: 'property_name',
      className: 'text-[#071437] font-bold',
      render: (text, record) => {
        const uniquePropertyTypesSet = new Set();

        const filteredPropertyTypes = record?.child_property
          .map((i) => i?.property_type_id?.name)
          .filter((typeName) => {
            if (!uniquePropertyTypesSet.has(typeName)) {
              uniquePropertyTypesSet.add(typeName);
              return true;
            }
            return false;
          });

        return (
          <div className='flex'>
            <div className='flex-col'>
              <span className='mobile:ml-4 ml-0 mobile:whitespace-nowrap'>{text}</span>
              <p className='mobile:ml-4 ml-0 text-text-color-secondary font-light whitespace-nowrap'>
                {filteredPropertyTypes.map((type, index) => (
                  <React.Fragment key={index}>
                    {type}
                    {index < filteredPropertyTypes.length - 1 && '/ '}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        );
      }
    },

    {
      title: 'PROPERTIES ASSOCIATED',
      dataIndex: 'property_associated',
      className: 'text-[#071437] font-semibold uppercase',
    },
    {
      title: 'INCOME',
      dataIndex: 'rent_income',
      className: 'text-[#00C47D] uppercase',
      render: (_, record) => {
        return (
          <span className='flex whitespace-nowrap'>₹ {record?.rent_recieved}</span>
        )
      }
    },
    {
      title: 'TARGET',
      dataIndex: 'target',
      className: 'text-[#7239EA] uppercase',
      render: (_, record) => {
        return (
          <span className='flex whitespace-nowrap'>₹ {record?.property_target_amount?.[0]?.target_amount || record?.target}</span>
        )
      }
    },
    {
      title: getUserType() === 'admin' && 'ACTION',
      dataIndex: 'operation',
      key: 'operation',
      align: 'right',
      render: (_, record) => (
        getUserType() === 'admin' &&
        <Space size="middle">
          <button onClick={() => setIsModalOpen(record)}><img src={edit_icon} alt='' />
          </button>
        </Space>
      ),
    },

  ];
  return (
    <>
      <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
    </>
  )
}

export default Table