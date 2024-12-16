import React, { useState } from 'react'
import SearchInput from '../../Components/CustomSearch/SearchInput';
import PageLayout from '../../Common/PageLayout';
import Table from './Table';
import { useTargetListQuery } from '../../ApiQuery/ListBuilding/BuildingQuery';
import { debounce } from '../../Utils/utils';

const TargetBuilding = () => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            search: ''
        },
    });
    const { data: listData, isLoading, isFetching } = useTargetListQuery(tableParams?.pagination)

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
            <div className='w-full flex flex-col justify-start bg-color-white rounded-3xl pb-6'>
                <div className='w-full sm:w-80'>
                    <SearchInput
                        placeholder="Building Name"
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            </div>
            <Table tableParams={{ ...tableParams.pagination, total: listData?.count }} data={listData?.results} onChange={onChange}
                loading={isLoading || isFetching} />
        </PageLayout>
    )
}

export default TargetBuilding