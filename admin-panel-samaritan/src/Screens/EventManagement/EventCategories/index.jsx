import { useState } from 'react';
import PageLayout from '../../../Common/PageLayout';
import AddButton from '../../../Components/Buttons/AddButton';
import Search from '../../../Components/Inputs/Search';
import AddEdit from './AddEdit';
import Table from './Table';
import { useEventCategoryListQuery } from '../../../ApiQueries/EventCategory/EventCategoryQueries';
import { debounce } from '../../../Utiles/Helper';

const EventCategories = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    }
  });
  const { data, isFetching } = useEventCategoryListQuery(tableParams);

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

  return (
    <PageLayout>
      <div className="flex md:flex-row flex-col gap-4 md:w-auto justify-between mb-4">
        <div>
          <Search placeholder="Category name" onChange={(e) => handleSearch(e)} />
        </div>

        <div>
          <AddButton
            label="Add Category"
            onClick={() => {
              setId(false);
              setOpen(!open);
            }}
          />
        </div>
      </div>

      <AddEdit id={id} open={open} setOpen={setOpen} />
      <Table data={data?.data} id={id} loading={isFetching} setId={setId} setOpen={setOpen} onChange={onChange} setTableParams={setTableParams} />
    </PageLayout>
  );
};

export default EventCategories;
