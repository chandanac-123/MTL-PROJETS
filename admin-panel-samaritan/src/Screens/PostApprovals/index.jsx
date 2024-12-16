import PageLayout from '../../Common/PageLayout';
import Search from '../../Components/Inputs/Search';
import SelectComponent from '../../Components/Inputs/Select';
import Table from './Table';
import { usePostListQuery } from '../../ApiQueries/PostApprovals/PostQueries';
import { useState } from 'react';
import { debounce } from '../../Utiles/Helper';
import { useCategoryQuery } from '../../ApiQueries/Dropdown/DropdownQueries';

const PostApprovals = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    filterVal: ''
  });
  const { data, isFetching } = usePostListQuery(tableParams);
  const { data: categoryList, isFetching: dropdown } = useCategoryQuery();

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

  const handleSelect = (value) => {
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
          <Search placeholder="User Name" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="flex md:flex-row flex-col gap-4 md:w-auto">
          <SelectComponent placeholder="All Categories" options={categoryList?.data} constant={false} onChange={handleSelect} />
        </div>
      </div>
      <Table
        tableParams={{
          ...tableParams.pagination,
          total: data?.data?.totalCount
        }}
        data={data?.data?.posts}
        loading={isFetching}
        onChange={onChange}
        setTableParams={setTableParams}
      />
    </PageLayout>
  );
};

export default PostApprovals;
