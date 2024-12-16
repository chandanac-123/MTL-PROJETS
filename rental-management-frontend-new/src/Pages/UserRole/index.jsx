import React, { useState } from 'react';
import PageLayout from '../../Common/PageLayout';
import { useUserRoleListQuery } from '../../ApiQuery/UserRole/UserRoleQuery';
import SearchInput from '../../Components/CustomSearch/SearchInput';
import AddButton from '../../Components/CustomButtons/AddButton';
import plus from '../../Static/Images/plus.svg'
import AddEdit from './AddEdit';
import UserRoleTable from './UserRoleTable';
import { debounce } from '../../Utils/utils';

const UserRole = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
  });

  const { data: listApi, isLoading, isFetching } = useUserRoleListQuery(tableParams.pagination)

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
          <div className='w-full sm:w-auto'>
            <AddButton img={plus} label="Add New Role" onClick={() => {
              setId(false)
              setIsModalOpen(!isModalOpen)
            }} />
            <AddEdit id={id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      </div>
      <UserRoleTable tableParams={{ ...tableParams.pagination, total: listApi?.count }} data={listApi?.results} onChange={onChange}
        loading={isLoading || isFetching} setIsModalOpen={setIsModalOpen} setId={setId} id={id} />
    </PageLayout>
  );
};

export default UserRole;
