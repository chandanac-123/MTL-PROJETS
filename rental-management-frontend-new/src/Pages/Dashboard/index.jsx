import LineChart from '../../Components/Charts/LineChart';
import DonutChartCard from '../../Components/Charts/DonutChart';
import PageLayout from '../../Common/PageLayout';
import { Skeleton, Space, Tag } from 'antd';
import CustomTable from './CustomeTable';
import { useNavigate } from 'react-router-dom';
import view_icon from "../../Static/Images/view_icon.svg"
import { useDashboardQuery } from '../../ApiQuery/Dashboard/DashboardQuery';
import prop_icon from '../../Static/Images/property.jpg'
import IncomeDonutChartCard from '../../Components/Charts/IncomeDonutChart';
import { capitalizeNames } from '../../Utils/Helper';

const Dashborad = () => {
  const navigate = useNavigate()
  const { data, isLoading, isFetching } = useDashboardQuery()
  const occupied_columns = [
    {
      title: 'PROPERTY',
      dataIndex: 'property_name',
      className: 'text-[#999999] font-semibold',
      width: 260,
      render: (text, record) => (
        <div className='flex gap-4'>
          <div className='w-[50px] h-[50px] min-w-[50px]'>
            <img
              className='w-full h-full'
              src={record?.property_image ? record?.property_image + "?" + new Date() : prop_icon}
              alt=''
            />
          </div>
          <div className='flex-col'>
            <span className='mobile:whitespace-nowrap text-color-black text-[14px] font-semibold'>{record?.property_name || record?.parent_id?.property_name}</span>
            <p className='text-Gray60-color text-[13px]' >{record?.property_type} {record?.flat_number ? <> |  {record?.flat_number}</> : <>|  {record?.house_number}</>}</p>
          </div>
        </div>
      ),

    },
    {
      title: 'LOCATION',
      dataIndex: 'town',
      className: 'text-[#999999] hidden sm:table-cell',
      width: 150,
      render: (text, record) => {
        return (
          <p className='text-Gray60-color text-[13px]' >{record?.town || record?.parent_id?.town}</p>
        )
      }
    },
    {
      title: 'TENANT NAME',
      dataIndex: 'tenant_name',
      className: 'text-[#999999] hidden sm:table-cell',
      width: 300,
      render: (_, record) => {
        return (
          capitalizeNames(record?.property_history[0]?.tenant_id?.tenant_name) || 'N/A'
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
            navigate(`/properties/view/${record.id}`)
          }}><img src={view_icon} alt='' />
          </button>
        </Space>
      ),
    },

  ];

  const vacant_columns = [
    {
      title: 'PROPERTY',
      dataIndex: 'property_name',
      className: 'text-[#999999] font-semibold',
      width: 300,
      render: (text, record) => {
        return (
          <div className='flex gap-4'>
            <div className='w-[50px] h-[50px] min-w-[50px]'>
              <img
                className='w-full h-full'
                src={record?.property_image ? record?.property_image + "?" + new Date() : prop_icon}
                alt=''
              />
            </div>
            <div className='flex-col'>
              <span className='mobile:whitespace-nowrap text-color-black text-[14px] font-semibold'>{record?.property_name || record?.parent_id?.property_name}</span>
              <p className='text-Gray60-color text-[13px]' >{record?.property_type} {record?.flat_number ? <> |  {record?.flat_number}</> : <>|  {record?.house_number}</>}</p>
            </div>
          </div>
        )

      }




    },
    {
      title: 'LOCATION',
      dataIndex: 'town',
      className: 'text-[#999999] hidden sm:table-cell',
      width: 150,
      render: (text, record) => {
        return (
          <p className='text-Gray60-color text-[13px]' >{record?.town || record?.parent_id?.town}</p>
        )
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'is_occupied',
      className: 'text-[#666666] hidden sm:table-cell',
      width: 150,
      render: (item) => {
        let color = item ? 'green' : 'red'
        return (
          <Tag color={color}>{item ? "Occupied" : "Vacant"}</Tag>
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
            navigate(`/properties/view/${record.id}`)
          }}><img src={view_icon} alt='' />
          </button>
        </Space>
      ),
    },

  ];
  return (
    <PageLayout>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
        {isLoading || isFetching ?
          <>
            {["bg-income-card-bg", "bg-expense-card-bg", "bg-onhand-card-bg", "bg-monthly-card-bg"].map((sk, index) =>
              <div key={index} className={`w-full p-4  h-full  rounded-2xl ${sk}`}>
                <Skeleton
                  paragraph={{
                    rows: 4,
                  }}
                />
              </div>
            )}

          </>
          :
          <>
            <IncomeDonutChartCard bgColor={'bg-income-card-bg'} cardHead={'Income'} amount={data?.income} todays={`${data?.income?.today_percentage ? data?.income?.today_percentage : '0'}% today`} />
            <LineChart lineColor={'#7239EA'} bgColor={'bg-expense-card-bg'} cardHead={'Expenses'} amount={data?.expense?.total_expense ? data?.expense?.total_expense : '0'} todays={`${data?.expense?.today_percentage ? data?.expense?.today_percentage : '0'}% today`} />
            <LineChart lineColor={'#009EF7'} bgColor={'bg-onhand-card-bg'} cardHead={'On-hand Balance'} amount={data?.balance?.total_balance ? data?.balance?.total_balance : "0"} todays={`${data?.balance?.today_percentage ? data?.balance?.today_percentage : '0'}% today`} />
            <DonutChartCard bgColor={'bg-monthly-card-bg'} cardHead={'Monthly Income'} amount={data?.month_income} />
          </>
        }
      </div>
      <div className='flex 2xl:flex-row flex-col justify-between gap-4 2xl:w-full mt-8'>
        <div className='border border-color-gray p-6 rounded-2xl 2xl:w-1/2 w-full'>
          <h2 className='text-color-black text-[17.6px] font-semibold'>Properties Occupied</h2>
          <p className='text-Gray60-color text-[12.4px] font-medium'>{data?.occupied_property?.count} Properties</p>
          <div style={{ overflowX: 'auto' }}>
            <CustomTable columns={occupied_columns} data={data?.occupied_property?.data} loading={isLoading} />
            {data?.occupied_property?.count > 6 ?
              <div className='flex items-center gap-2 justify-center mt-2 cursor-pointer' onClick={() => navigate("/properties?occupancy=true")}>
                <span className='text-dodger-blue text-[14px]'>View All Properties Occupied</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00062 12.6265C7.86821 12.6273 7.73856 12.5886 7.62821 12.5154C7.51787 12.4422 7.43182 12.3378 7.38104 12.2155C7.33026 12.0932 7.31706 11.9586 7.3431 11.8287C7.36915 11.6989 7.43327 11.5798 7.52729 11.4865L11.014 7.99984L7.52729 4.51318C7.40312 4.38827 7.33343 4.2193 7.33343 4.04318C7.33343 3.86705 7.40312 3.69808 7.52729 3.57318C7.58926 3.51069 7.663 3.46109 7.74424 3.42725C7.82548 3.3934 7.91261 3.37598 8.00062 3.37598C8.08863 3.37598 8.17577 3.3934 8.25701 3.42725C8.33825 3.46109 8.41198 3.51069 8.47396 3.57318L12.4273 7.52651C12.4903 7.58825 12.5404 7.66188 12.5747 7.74313C12.6091 7.82438 12.6269 7.91164 12.6273 7.99984C12.6269 8.08805 12.6091 8.1753 12.5747 8.25655C12.5404 8.3378 12.4903 8.41143 12.4273 8.47318L8.47396 12.4265C8.41221 12.4895 8.33858 12.5396 8.25733 12.5739C8.17608 12.6083 8.08883 12.6261 8.00062 12.6265Z" fill="#3E97FF" />
                  <path opacity="0.3" d="M11.9597 8.66634H4.03971C3.8629 8.66634 3.69333 8.5961 3.56831 8.47108C3.44328 8.34605 3.37305 8.17649 3.37305 7.99967C3.37305 7.82286 3.44328 7.65329 3.56831 7.52827C3.69333 7.40325 3.8629 7.33301 4.03971 7.33301H11.9597C12.1365 7.33301 12.3061 7.40325 12.4311 7.52827C12.5561 7.65329 12.6264 7.82286 12.6264 7.99967C12.6264 8.17649 12.5561 8.34605 12.4311 8.47108C12.3061 8.5961 12.1365 8.66634 11.9597 8.66634Z" fill="#3E97FF" />
                </svg>
              </div>
              : null}
          </div>
        </div>
        <div className='border border-color-gray p-6 rounded-2xl 2xl:w-1/2 w-full'>
          <h2 className='text-color-black text-[17.6px] font-semibold'>Properties Vacant</h2>
          <p className='text-Gray60-color text-[12.4px] font-medium'>{data?.vacant_properties?.count} Properties</p>
          <div style={{ overflowX: 'auto' }}>
            <CustomTable columns={vacant_columns} data={data?.vacant_properties?.data} loading={isLoading} />
            {data?.vacant_properties?.count > 6 ?
              <div className='flex items-center gap-2 justify-center mt-2 cursor-pointer' onClick={() => navigate("/properties?occupancy=false")}>
                <span className='text-dodger-blue text-[14px]'>View All Properties Vacant</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00062 12.6265C7.86821 12.6273 7.73856 12.5886 7.62821 12.5154C7.51787 12.4422 7.43182 12.3378 7.38104 12.2155C7.33026 12.0932 7.31706 11.9586 7.3431 11.8287C7.36915 11.6989 7.43327 11.5798 7.52729 11.4865L11.014 7.99984L7.52729 4.51318C7.40312 4.38827 7.33343 4.2193 7.33343 4.04318C7.33343 3.86705 7.40312 3.69808 7.52729 3.57318C7.58926 3.51069 7.663 3.46109 7.74424 3.42725C7.82548 3.3934 7.91261 3.37598 8.00062 3.37598C8.08863 3.37598 8.17577 3.3934 8.25701 3.42725C8.33825 3.46109 8.41198 3.51069 8.47396 3.57318L12.4273 7.52651C12.4903 7.58825 12.5404 7.66188 12.5747 7.74313C12.6091 7.82438 12.6269 7.91164 12.6273 7.99984C12.6269 8.08805 12.6091 8.1753 12.5747 8.25655C12.5404 8.3378 12.4903 8.41143 12.4273 8.47318L8.47396 12.4265C8.41221 12.4895 8.33858 12.5396 8.25733 12.5739C8.17608 12.6083 8.08883 12.6261 8.00062 12.6265Z" fill="#3E97FF" />
                  <path opacity="0.3" d="M11.9597 8.66634H4.03971C3.8629 8.66634 3.69333 8.5961 3.56831 8.47108C3.44328 8.34605 3.37305 8.17649 3.37305 7.99967C3.37305 7.82286 3.44328 7.65329 3.56831 7.52827C3.69333 7.40325 3.8629 7.33301 4.03971 7.33301H11.9597C12.1365 7.33301 12.3061 7.40325 12.4311 7.52827C12.5561 7.65329 12.6264 7.82286 12.6264 7.99967C12.6264 8.17649 12.5561 8.34605 12.4311 8.47108C12.3061 8.5961 12.1365 8.66634 11.9597 8.66634Z" fill="#3E97FF" />
                </svg>
              </div>
              : null}
          </div>
        </div>
      </div>
    </PageLayout>



  )
}

export default Dashborad





// <div className="w-full p-4  h-full bg-income-card-bg rounded-2xl">
//           <div className="bg-white border-none rounded-lg  p-4 h-full">
//             <div className='flex justify-between'>
//             <h2 className="text-xl font-semibold">Income</h2>
//             <h4 className="text-md font-semibold">+ 28% today</h4> 
//             </div>
//           <LineChart lineColor={'#F6C000'}/>
//           <h2 className="text-2xl font-semibold pt-4">₹ 245878</h2>
//           </div>
//         </div>
//         <div className="w-full p-4  h-full">
//           <div className="bg-white border rounded-lg shadow-md p-4 h-full">
//             <h2 className="text-2xl font-semibold">Card title</h2>
//             <p className="text-sm text-secondary">Card content</p>
//           </div>
//         </div>