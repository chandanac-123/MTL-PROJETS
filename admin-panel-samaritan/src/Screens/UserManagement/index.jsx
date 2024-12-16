import { useState } from 'react';
import { useUserListQuery } from '../../ApiQueries/UserManagement/UserQueries';
import PageLayout from '../../Common/PageLayout';
import Search from '../../Components/Inputs/Search';
import SelectComponent from '../../Components/Inputs/Select';
import { userList } from '../../Utiles/Constants';
import Table from './Table';
import { debounce } from '../../Utiles/Helper';

const UserManagement = () => {
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    filterVal: ''
  });
  const { data: list, isFetching } = useUserListQuery(tableParams);

  const onChange = (e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: e?.current,
        pageSize: e?.pageSize
      }
    });
  };

  const handleSearch = debounce((e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        search: e.target.value,
        current: 1
      }
    });
  });

  const handleSelect = (value, name) => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        filterVal: value?.value,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      };
    });
  };

  return (
    <PageLayout>
      <div className="flex md:flex-row flex-col gap-4 md:w-auto mb-4 justify-between">
        <div className="w-full sm:w-auto">
          <Search placeholder="Name , Username" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="w-full sm:w-auto">
          <SelectComponent placeholder="All Users" options={userList} constant={true} onChange={handleSelect} />
        </div>
      </div>

      <Table setTableParams={setTableParams} tableParams={{ ...tableParams.pagination, total: list?.data?.n_user }} data={list?.data?.users} id={id} setId={setId} onChange={onChange} loading={isFetching} />
    </PageLayout>
  );
};

export default UserManagement;
