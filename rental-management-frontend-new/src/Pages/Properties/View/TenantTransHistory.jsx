import React, { useEffect, useState } from 'react'
import CustomTable from '../../../Components/CustomeTable'
import PageLayout from '../../../Common/PageLayout'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import download from '../../../Static/Images/exit-down.svg'
import { dateTimeConverter, exportToExcel } from '../../../Utils/Helper'
import { useTranHistoryListQuery } from '../../../ApiQuery/Tenant/TenantQuery'
import { tranHistoryDownloadApiCall } from '../../../Static/Apis'
import { ErrorToast } from '../../../Utils/AlertMessages'
import { getMonthName } from '../../../Utils/utils'

const TenantTransHistory = ({ data }) => {
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
    search: ''
  });

  const { data: list, isFetching, refetch } = useTranHistoryListQuery(
    {
      tableParams,
      propId: data?.id,
      tenantId: data?.property_history?.[0]?.tenant_id?.id,
      enabled: false,
    }
  )
  
  useEffect(() => {
    refetch()
  },[tableParams.pageSize,tableParams.current])

  const onChange = (e) => {
    setTableParams({ current: e?.current, pageSize: e?.pageSize })
  };


  const downloadApi = async () => {
    try {
      const fetchAPI = await tranHistoryDownloadApiCall({
        'propId': data?.id,
        'tenantId': data?.property_history?.[0]?.tenant_id?.id,
        'enabled': false,
      })
      exportToExcel(fetchAPI?.data, `transaction_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      console.log(error)
      ErrorToast({ message: "Somthing went wrong !" })
    }
  }

  const columns = [
    {
      title: 'TRANSACTION ID',
      dataIndex: 'transaction_id',
      className: 'text-[#666666]',
    },
    {
      title: 'DATE & TIME',
      dataIndex: 'created_at',
      className: 'text-[#666666]',

    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount_recieved',
      className: 'text-[#666666]',
      render: (_, record) => {
        return (
          <span className="whitespace-nowrap">₹ {record?.amount_recieved}</span>
        )
      }
    },
    {
      title: "RENT OF MONTH",
      className: 'text-[#666666] uppercase',
      render: (text, record) => (
        <div className="">
          <span className="whitespace-nowrap">
            {getMonthName(record?.rent_month)}  {record?.rent_year}
          </span>
        </div>
      ),
    },
    {
      title: 'PAYMENT MODE',
      dataIndex: 'payment_method',
      className: 'text-[#666666]',

    },
  ]

  return (
    <PageLayout>
      <div className='flex justify-between'>
        <label className='font-semibold'>Transaction History</label>
        <ContinueButton
          disabled={list?.count == 0 ? true : false}
          label='Download' img={download} onClick={downloadApi} />
      </div>
      <CustomTable tableParams={{ tableParams, total: list?.count }} columns={columns} data={list?.results} onChange={onChange} loading={isFetching} />
    </PageLayout>
  )
}

export default TenantTransHistory