import React, { useEffect, useState } from 'react'
import PageLayout from '../../Common/PageLayout'
import { useBalanceSheetListQuery } from '../../ApiQuery/BalanceSheet/BalancesheetQuery'
import Table from './Table'
import SearchInput from '../../Components/CustomSearch/SearchInput'
import ContinueButton from '../../Components/CustomButtons/ContinueButton'
import download_icon from "../../Static/Images/exit-down.svg";
import print from '../../Static/Images/devices.svg'
import { balanceSheetDownloadApiCall } from '../../Static/Apis'
import { dateTimeConverter, exportToExcel } from '../../Utils/Helper'
import { ErrorToast } from '../../Utils/AlertMessages'
import Datepicker from '../../Components/CustomDate/Datepicker'
import BalanceSheetPrint from './BalanceSheetPrint'
import { debounce } from '../../Utils/utils'

const BalanceSheet = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    createdYear:'',
    createdMonth:'',
  });
  const [showPrint, setShowPrint] = useState(false)
  const { data: list, isFetching } = useBalanceSheetListQuery(tableParams)

  const onChange = (e) => {
    setTableParams({ ...tableParams, pagination: { ...tableParams.pagination, current: e?.current, pageSize: e?.pageSize } })
  };

  const handleSearch = debounce((e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        search: e.target.value,
        current: 1
      },
    });
  })

  const handleSelect = (value, name) => {
    let newVal=new Date(value ||'')
    let month = tableParams.createdMonth
    if(name === "month"){
      month = newVal?.getMonth()+1
    }else {}
    setTableParams((prevState) => {
      return {
        ...prevState,
        createdYear: newVal?.getFullYear(),
        createdMonth: month,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  const downloadExcel = async () => {
    try {
      const fetchAPI = await balanceSheetDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `balancesheet_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      ErrorToast({ message: "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      <div className="flex sm:flex-row flex-col gap-4 items-center justify-between pb-6">
        <div className="w-full sm:w-auto">
          <SearchInput placeholder="Building Name" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto">
          <div className=' w-full sm:w-auto'>
          <Datepicker onChange={handleSelect} picker='month' name='month' format='MMMM'/>
          </div>
          <div className='w-full sm:w-auto'>
            <ContinueButton label='Download' img={download_icon} onClick={downloadExcel}
              className='bg-primary text-color-white px-6 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
          </div>
          <div className=' w-full sm:w-auto'>
          <ContinueButton label='Print' img={print} type='button' onClick={()=> setShowPrint(true)}
                    className='bg-button-secondary text-primary px-4 py-2 min-w-1/6 rounded-lg flex items-center gap-2 justify-center' />
          </div>
        </div>
      </div>
      <Table tableParams={{ ...tableParams.pagination, total: list?.count }} data={list?.results} loading={isFetching} onChange={onChange}/>
      {showPrint &&
      <BalanceSheetPrint setShowPrint={setShowPrint} showPrint={showPrint} tableParams={tableParams} />
      }
    </PageLayout>
  )
}

export default BalanceSheet