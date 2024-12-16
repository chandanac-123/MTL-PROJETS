'use client'

import { dateConversion, debounce } from '@/utils/helper'
import React, { useState } from 'react'
import CustomeSelect from '@/components/ui/select'
import CustomerSupportTable from './table'
import { ticketStatus } from '@/constants/status'
import { useTicketListQuery } from '@/api-queries/customer-support/queries'
import ReactDatepicker from '@/components/ui/Reactdatepicker'
import { useListIssueTypeQuery } from '@/api-queries/dropdown/queries'
import { useRouter } from 'next/navigation'


export interface cusotmerTicketsTableAPI {
  page: number;
  status: string;
  fromDate: Date | String | null;
  toDate: Date | String | null;
  issueType: string;
  search: string;
  user_id: string;
}

export default function CustomerSupport() {
  const router = useRouter()

  const [tableParams, setTableParams] = useState({
    page: 1,
    search: '',
    status: '',
    fromDate: '',
    toDate: '',
    issueType: '',
    user_id: '',
    pageSize: 10,
  })

  const { data: TicketList } = useTicketListQuery(tableParams)
  const { data: Tickeissuetype } = useListIssueTypeQuery()

  const handleStatusSelect = (value: any) => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        status: value,
        page: 1
      }
    })
  }

  const handleIssuetypeSelect = (value: any) => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        issueType: value,
        page: 1
      }
    })
  }

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
    const [startDate, endDate] = Array.isArray(date) ? date : [null, null]
    setTableParams((prev: any) => ({
      ...prev,
      fromDate: startDate ? dateConversion(startDate, "YYYY-MM-DD") : "",
      toDate: endDate ? dateConversion(endDate, "YYYY-MM-DD") : "",
    }));
  };

  const handlepush = (id: string) => {
    router.push(`/customer-support/ticket/${id}`)
  }

  const IssueTypes = Tickeissuetype?.data?.length != 0 && Tickeissuetype?.data?.map((type: Record<string, any>, i: number) => ({
    id: type?.name,
    label: `${type?.name?.replace(/ /g, '\u00A0')}`
  }))

  return (
    <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
      <CustomerSupportTable
        data={TicketList?.data?.tickets}
        search={true}
        onSearch={handleSearch}
        actionButtons={[
          <CustomeSelect
            key="select"
            placeholder='Status'
            onSelect={handleStatusSelect}
            options={ticketStatus}
          />,
          <ReactDatepicker
            key='select_2'
            onDateChange={(date) => handleDateChange(date)}
            placeholderText="Select Date Range"
            label=""
            dateRange={true}
            isClearable={true}
            className='w-64 border border-outline_grey bg-bg_secondary placeholder:text-secondary'
          />,
          <CustomeSelect
            key="select"
            placeholder={'Issue\u00A0Type'}
            onSelect={handleIssuetypeSelect}
            options={IssueTypes}
          />,]}
        pagination={TicketList?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams}
        handlepush={handlepush}
      />
    </div>
  )
}
