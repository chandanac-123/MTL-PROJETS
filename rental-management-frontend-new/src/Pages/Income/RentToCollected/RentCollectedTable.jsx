import CustomTable from '../../../Components/CustomeTable'
import { Space } from 'antd';
import view_icon from "../../../Static/Images/view_icon.svg"
import { useNavigate } from 'react-router-dom';
import { getMonthName } from '../../../Utils/utils';
import { capitalizeNames } from '../../../Utils/Helper';

const RentCollectedTable = ({ data, tableParams, onChange, loading}) => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'BUILDING NAME',
            dataIndex: 'building_name',
            className: 'text-[#071437] font-bold',
            width: 300,
            render: (text, record) => (
                <div className='flex flex-col'>
                    <span className='mobile:whitespace-nowrap'>{record?.property_id?.parent_id?.property_name || record?.property_id?.property_name}</span>
                    <p className="text-text-color-secondary font-light">
                        {record?.property_id?.property_type_id?.name} {record?.property_id?.flat_number ? <> |  {record?.property_id?.flat_number}</> : <>|  {record?.property_id?.house_number}</>}
                    </p>
                </div>
            ),

        },
        {
            title: 'TENANT NAME',
            dataIndex: 'town',
            className: 'text-[#666666]',
            render: (text, record) => (
                <div className=''>
                    <span className='mobile:whitespace-nowrap'>{capitalizeNames(record?.tenant_id?.tenant_name)}</span>
                </div>
            ),
        },
        {
            title: 'RENT AMOUNT',
            dataIndex: 'month_collected',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <div className=''>
                        <span className='text-[16px] font-normal text-[#F1416C] whitespace-nowrap'>₹ {record?.rent_id?.rent_amount}</span>
                    </div>
                )
            }
        },
        {
            title: 'DUE DATE',
            dataIndex: 'month_collected',
            className: 'text-[#666666]',
            render: (_, record) => {
                return (
                    <div className=''>
                        <span className='text-[16px] font-normal whitespace-nowrap'>{getMonthName(record?.rent_month)} {record?.rent_year}</span>
                    </div>
                )
            }
        },

        {
            title: 'ACTION',
            dataIndex: 'operation',
            key: 'operation',
            align: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <button onClick={() => {
                        navigate(`view/${record.id}`)
                    }}><img src={view_icon} alt='' />
                    </button>
                </Space>
            ),
        },

    ];

    return (
        <>
            <CustomTable tableParams={tableParams} columns={columns} data={data} onChange={onChange} loading={loading} />
        </>
    )
}

export default RentCollectedTable