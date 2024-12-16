import React, {  useState } from 'react'
import PageLayout from '../../Common/PageLayout'
import PropertyTable from './PropertyTable'
import AddButton from '../../Components/CustomButtons/AddButton'
import SearchInput from '../../Components/CustomSearch/SearchInput'
import plus from '../../Static/Images/plus.svg'
import SelectField from '../../Components/CustomSelect/SelectField'
import { useNavigate } from 'react-router-dom'
import { usePropertyListQuery } from '../../ApiQuery/Property/PropertyQuery'
import Datepicker from '../../Components/CustomDate/Datepicker'
import { occupancy } from '../../Utils/Constants'
import { debounce, getUrlParam } from '../../Utils/utils'

const Properties = () => {
  const navigate = useNavigate()
  const occupancyValue = getUrlParam('occupancy');
  const [id, setId] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
    occupancyFilter: occupancyValue ? occupancyValue : '',
    createdYear: '',
    createdMonth: ''
  });
  const { data, isLoading, isFetching } = usePropertyListQuery(tableParams)

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
    let newVal = new Date(value || '')
    let occupancyFilter = tableParams.occupancyFilter
    let month = tableParams.createdMonth
    let year = tableParams.createdYear
    if (name === "month") {
      month = newVal?.getMonth() + 1
      year = newVal?.getFullYear()
    } else {
      occupancyFilter = value?.value
    }
    setTableParams((prevState) => {
      return {
        ...prevState,
        occupancyFilter: occupancyFilter,
        createdYear: year,
        createdMonth: month,
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
            placeholder="Property name,Tenant,Location"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className='w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto'>
          <Datepicker onChange={handleSelect} picker='month' name='month' format='MMMM' />
          <SelectField placeholder="Occupancy" options={occupancy} constant={true} onChange={handleSelect} name='occupancyFilter' value={tableParams?.occupancyFilter == 'true' ? { value: 'true', label: 'Occupied' } : tableParams?.occupancyFilter == 'false' ? { value: 'false', label: 'Vacant' } : ''} />
          <AddButton img={plus} label="Add Property"
            onClick={() => {
              navigate('add')
            }} />
        </div>
      </div>
      <PropertyTable tableParams={{ ...tableParams.pagination, total: data?.count }} data={data?.results} onChange={onChange}
        loading={isLoading || isFetching} setId={setId} id={id} />
    </PageLayout>
  )
}


export default Properties