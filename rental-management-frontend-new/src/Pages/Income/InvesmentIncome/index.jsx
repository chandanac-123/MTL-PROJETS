import React, { useEffect, useState } from 'react'
import PageLayout from '../../../Common/PageLayout'
import Table from './Table'
import SearchInput from '../../../Components/CustomSearch/SearchInput'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import Datepicker from '../../../Components/CustomDate/Datepicker'
import download_icon from '../../../Static/Images/exit-down.svg'
import { useInvestIncomeListQuery } from '../../../ApiQuery/InvestmentIncome/InvestIncomeQuery'
import AddButton from '../../../Components/CustomButtons/AddButton'
import plus from '../../../Static/Images/plus.svg'
import AddEdit from './AddEdit'
import AddProperty from './AddProperty'
import { ErrorToast } from '../../../Utils/AlertMessages'
import { dateTimeConverter, exportToExcel } from '../../../Utils/Helper'
import { investIncomeDownloadApiCall } from '../../../Static/Apis'
import { debounce } from '../../../Utils/utils'

const InvestmentIncome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPropertyOpen, setIsPropertyOpen] = useState(false);
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    createdYear: '',
    createdMonth: ''
  });
  const { data: list, isLoading, isFetching } = useInvestIncomeListQuery(tableParams)

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
    const newVal = new Date(value)
    let month = tableParams.createdMonth
    if (name === "month") {
      month = newVal?.getMonth() + 1
    } else { }
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

  const downloadApi = async () => {
    try {
      const fetchAPI = await investIncomeDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `invest_income_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      console.log(error)
      ErrorToast({ message: "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      <div className='flex sm:flex-row flex-col gap-4 items-center justify-between pb-6'>

        <div className='w-full sm:w-auto'>
          <SearchInput
            placeholder="Building name"
            onChange={(e) => handleSearch(e)}
          />
        </div>

        <div className='w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto'>
          <Datepicker onChange={handleSelect} picker='month' name='month' format='MMMM' />
          <div className='w-full sm:w-auto'>
            <ContinueButton label='Download' img={download_icon} onClick={downloadApi}
              className='bg-primary text-color-white px-10 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
          </div>
          <AddButton img={plus} label="Add Investment Income" onClick={() => {
            setId(false)
            setIsPropertyOpen(!isPropertyOpen)
          }}
            className='bg-button-secondary text-primary px-8 py-2 w-full rounded-lg flex items-center gap-2'
          />
        </div>

        <AddProperty isPropertyOpen={isPropertyOpen} setIsPropertyOpen={setIsPropertyOpen} />
        <AddEdit id={id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>

      <Table tableParams={{ ...tableParams.pagination, total: list?.count }} data={list?.results} onChange={onChange}
        loading={isLoading || isFetching} setIsModalOpen={setIsModalOpen} setId={setId} id={id} />
    </PageLayout>
  )
}

export default InvestmentIncome