import React, { useState } from 'react'
import PageLayout from '../../../Common/PageLayout'
import SearchInput from '../../../Components/CustomSearch/SearchInput'
import Datepicker from '../../../Components/CustomDate/Datepicker'
import { useRentCollectedListQuery } from '../../../ApiQuery/RentIncome/RentIncomeQuery'
import RentCollectedTable from './RentCollectedTable'
import { debounce } from '../../../Utils/utils'

const RentCollected = () => {
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    month: "",
    year: "",
  });
  const { data, isLoading, isFetching } = useRentCollectedListQuery(tableParams)

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
    let month = tableParams.month
    const newVal = new Date(value)
    if (name === "month") {
      month = newVal?.getMonth() + 1
    }
    setTableParams((prevState) => {
      return {
        ...prevState,
        month: month,
        year: newVal.getFullYear(),
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  return (
    <PageLayout>
      <div className='flex sm:flex-row flex-col gap-4 items-center justify-between pb-6'>
        <div className='w-full sm:w-auto'>
          <SearchInput
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className='w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto'>
          <Datepicker onChange={handleSelect} picker='month' name="month" format="MMMM" />
        </div>
      </div>
      <RentCollectedTable tableParams={{ ...tableParams.pagination, total: data?.count }} data={data?.results} onChange={onChange}
        loading={isLoading || isFetching} setId={setId} id={id} />
    </PageLayout>
  )
}

export default RentCollected