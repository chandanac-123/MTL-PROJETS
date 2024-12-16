'use client'
import { debounce } from '@/utils/helper'
import React, { useState } from 'react'
import ReferralsTable from './table'
import { useReferralQuery } from '@/api-queries/referrals/queries'

export default function Referrals() {
  const [tableParams, setTableParams] = useState({
    page: 1,
    search: ''
  })
  const { data, isFetching } = useReferralQuery(tableParams)

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  return (
    <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
      <ReferralsTable
        data={data?.data?.records}
        search={true}
        onSearch={handleSearch}
        actionButtons={[]}
        pagination={data?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams} />
    </div>
  )
}
