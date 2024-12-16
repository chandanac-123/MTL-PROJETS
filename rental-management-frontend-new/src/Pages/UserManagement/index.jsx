import React, { useState } from 'react'
import PageLayout from '../../Common/PageLayout'
import UserManagementTable from './UserManagementTable'
import { useUserListQuery } from '../../ApiQuery/UserManagement/UserQuery'
import SearchInput from '../../Components/CustomSearch/SearchInput'
import AddButton from '../../Components/CustomButtons/AddButton'
import plus from '../../Static/Images/plus.svg'
import AddEdit from './AddEdit'
import SelectField from '../../Components/CustomSelect/SelectField'
import { useUserRole } from '../../ApiQuery/Dropdown/ListQuery'
import { debounce } from '../../Utils/utils'

const UserMangenment = () => {
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

  const { data: userList, isLoading, isFetching } = useUserListQuery(tableParams)
  const { data: all_user, isPending: rolePending } = useUserRole()

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
              <SelectField options={all_user} placeholder="All Roles" onChange={handleSelect} />
            </div>
            <div className=' w-full sm:w-auto'>
              <AddButton img={plus} label="Add User" onClick={() => {
                setId(false)
                setIsModalOpen(!isModalOpen)
              }} />
            </div>
            <AddEdit id={id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      </div>
      <UserManagementTable tableParams={{ ...tableParams.pagination, total: userList?.count }} data={userList?.results}
        loading={isFetching || isLoading} onChange={onChange} setIsModalOpen={setIsModalOpen} setId={setId} id={id} />
    </PageLayout>
  )
}

export default UserMangenment