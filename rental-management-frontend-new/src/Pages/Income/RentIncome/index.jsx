import React, { useState } from 'react'
import PageLayout from '../../../Common/PageLayout'
import SearchInput from '../../../Components/CustomSearch/SearchInput'
import Datepicker from '../../../Components/CustomDate/Datepicker'
import { paid_status_list } from '../../../Utils/Constants'
import SelectField from '../../../Components/CustomSelect/SelectField'
import plus from '../../../Static/Images/plus.svg'
import AddButton from '../../../Components/CustomButtons/AddButton'
import download from '../../../Static/Images/exit-down.svg'
import DownloadButton from '../../../Components/CustomButtons/DownloadButton'
import RentIncomeTable from '../RentIncome/RentIncomeTable'
import { useRentIncomeListQuery } from '../../../ApiQuery/RentIncome/RentIncomeQuery'
import { dateTimeConverter, exportToExcel } from '../../../Utils/Helper'
import { rentIncomeDownloadApiCall } from '../../../Static/Apis'
import { ErrorToast } from '../../../Utils/AlertMessages'
import AddProperty from './AddProperty'
import { debounce } from '../../../Utils/utils'

const RentIncome = () => {
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    month: "",
    year: "",
    paid_status: ""
  });
  const { data, isLoading, isFetching } = useRentIncomeListQuery(tableParams)

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
    let paid_status = tableParams.paid_status
    let month = tableParams.month
    let year = tableParams.year
    const newVal = new Date(value)
    if (name === "month") {
      month = newVal?.getMonth() + 1
      year = newVal?.getFullYear()
    } else {
      paid_status = value?.value
    }
    setTableParams((prevState) => {
      return {
        ...prevState,
        month: month,
        year: year,
        paid_status: paid_status,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  const handleDownload = async () => {
    try {
      const fetchAPI = await rentIncomeDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `rent_income_${dateTimeConverter(new Date())}`)
    } catch (error) {
      console.log(error)
      ErrorToast({ message: "Somthing went wrong !" })
    }
  };
  return (
    <PageLayout>
      <div className='flex xl:flex-row  flex-col gap-4 items-center justify-between pb-6'>
        <div className='w-full xl:w-auto'>
          <SearchInput
            placeholder="Building name"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className='w-full gap-2  flex sm:flex-row flex-col sm:w-auto'>
          <Datepicker onChange={handleSelect} picker='month' name="month" format="MMMM" />
          <SelectField placeholder="Paid Status" options={paid_status_list} constant={true} onChange={handleSelect} name="paid_status" />
          <DownloadButton label='Download' img={download} onClick={handleDownload} />
          <AddButton img={plus} label="Add Rent Income"
            onClick={() => {
              setId(false)
              setIsPropertyOpen(!isPropertyOpen)
            }} />
          <AddProperty isPropertyOpen={isPropertyOpen} setIsPropertyOpen={setIsPropertyOpen} />
        </div>
      </div>
      <RentIncomeTable tableParams={{ ...tableParams.pagination, total: data?.count }} data={data?.results} onChange={onChange}
        loading={isLoading || isFetching} setId={setId} id={id} />
    </PageLayout>
  )
}

export default RentIncome