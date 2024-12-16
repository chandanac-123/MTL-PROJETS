"use client"

import React, { useState } from 'react'
import CustomeSelect from '@/components/ui/select';
import Tickettable from './table';
import { useTicketListQuery } from '@/api-queries/customer-support/queries';
import { dateConversion } from '@/utils/helper';
import ReactDatepicker from '@/components/ui/Reactdatepicker';
import { useListIssueTypeQuery } from '@/api-queries/dropdown/queries';
import { ticketStatus } from '@/constants/status';

export const Ticketlist = ({ customer_id }: any) => {
    const [tableParams, setTableParams] = useState({
        page: 1,
        search: '',
        status: '',
        fromDate: '',
        toDate: '',
        issueType: '',
        pageSize: 10,
        user_id: customer_id
    });
    const { data: TicketList } = useTicketListQuery(tableParams)
    const { data: Tickeissuetype } = useListIssueTypeQuery()
    const [id, setId] = useState(false);

    const handleSelect = (value: any) => {
        setTableParams((prevState) => {
            return {
                ...prevState,
                status: value
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

    const handleSearch = (e: any) => {
        setTableParams((prevState) => ({
            ...prevState,
            search: e.target.value
        }));
    }

    const handleDateChange = (date: Date | [Date | null, Date | null] | null) => {
        const [startDate, endDate] = Array.isArray(date) ? date : [null, null]
        setTableParams((prev: any) => ({
            ...prev,
            fromDate: startDate ? dateConversion(startDate, "YYYY-MM-DD") : "",
            toDate: endDate ? dateConversion(endDate, "YYYY-MM-DD") : "",
        }));
    };

    const IssueTypes = Tickeissuetype?.data?.length != 0 && Tickeissuetype?.data?.map((type: Record<string, any>, i: number) => ({
        id: type?.name,
        label: `${type?.name?.replace(/ /g, '\u00A0')}`
    }))

    return (
        <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
            <Tickettable
                data={TicketList?.data?.tickets}
                setId={setId}
                setIsModalOpen={false}
                search={true}
                onSearch={handleSearch}
                actionButtons={[
                    <CustomeSelect
                        key="select"
                        placeholder='Status'
                        onSelect={handleSelect}
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
                        placeholder={`Issue\u00A0Type`}
                        onSelect={handleIssuetypeSelect}
                        options={IssueTypes}
                    />,
                ]}
                pagination={TicketList?.data?.pagination}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}