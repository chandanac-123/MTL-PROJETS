import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../Common/PageLayout';
import AddButton from '../../../Components/Buttons/AddButton';
import Search from '../../../Components/Inputs/Search';
import SelectComponent from '../../../Components/Inputs/Select';
import Table from './Table';
import { useAllEventListQuery } from '../../../ApiQueries/AllEvent/EventQueries';
import { statusList } from '../../../Utiles/Constants';
import { useState } from 'react';
import { debounce } from '../../../Utiles/Helper';
import { useCategoryQuery } from '../../../ApiQueries/Dropdown/DropdownQueries';

const AllEvents = () => {
  const navigate = useNavigate();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    categoryType: '',
    eventStatus: ''
  });
  const { data, isFetching } = useAllEventListQuery(tableParams);
  const { data: categoryList, isFetching: categoryFetch } = useCategoryQuery();

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
    if (name?.name == 'status') {
      setTableParams((prevState) => {
        return {
          ...prevState,
          eventStatus: value?.value,
          pagination: {
            ...prevState.pagination,
            current: 1
          }
        };
      });
    } else {
      setTableParams((prevState) => {
        return {
          ...prevState,
          categoryType: value?.value,
          pagination: {
            ...prevState.pagination,
            current: 1
          }
        };
      });
    }


  };

  return (
    <PageLayout>
      <div className="flex md:flex-row flex-col gap-4 md:w-auto justify-between mb-4">
        <div className="w-full sm:w-auto">
          <Search placeholder="Event" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="flex md:flex-row flex-col gap-4 md:w-full 2xl:w-1/2 lg:w-full">
          <SelectComponent placeholder="All Categories" options={categoryList?.data} constant={false} onChange={handleSelect} name="category" />
          <SelectComponent placeholder="All Status" options={statusList} constant={true} onChange={handleSelect} name="status" />
          <AddButton label="Add Event" onClick={() => navigate('add')} />
        </div>
      </div>
      <Table data={data?.data?.events} tableParams={{ ...tableParams.pagination, total: data?.data?.totalCount }} loading={isFetching} onChange={onChange} setTableParams={setTableParams} />
    </PageLayout>
  );
};

export default AllEvents;
