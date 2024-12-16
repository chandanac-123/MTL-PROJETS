import React, { useState } from 'react'
import PageLayout from '../../../Common/PageLayout'
import ExpenseTypeTable from './ExpenseTypeTable'
import AddButton from '../../../Components/CustomButtons/AddButton';
import SearchInput from '../../../Components/CustomSearch/SearchInput';
import AddEdit from './AddEdit';
import plus from '../../../Static/Images/plus.svg'
import { useExpenseTypeListQuery } from '../../../ApiQuery/ExpenseType/ExpenseTypeQuery';
import { debounce } from '../../../Utils/utils';

const ExpenseType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: '',
    },
    filterVal: ''
  });

  const {data:expenseList, isLoading, isFetching}=useExpenseTypeListQuery(tableParams)

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
    setTableParams((prevState) => {
      return {
        ...prevState,
        filterVal: value?.value,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }
  return (
   <PageLayout>
      <div className='w-full flex flex-col justify-between bg-color-white rounded-3xl pb-6'>
        <div className='flex sm:flex-row flex-col gap-4 items-center justify-between'>
          <div className='w-full sm:w-auto'>
            <SearchInput
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className='w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto'>
            <div className=' w-full sm:w-auto'>
              <AddButton img={plus} label="Add Expense Type" onClick={() => {
                setId(false)
                setIsModalOpen(!isModalOpen)
              }} />
            </div>

            <AddEdit id={id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      </div>
   <ExpenseTypeTable tableParams={{ ...tableParams.pagination, total: expenseList?.count }} data={expenseList?.results}
        loading={isFetching || isLoading} onChange={onChange} setIsModalOpen={setIsModalOpen} setId={setId} id={id}/>
   </PageLayout>
  )
}

export default ExpenseType