'use client'

import { debounce } from '@/utils/helper'
import React, { useState } from 'react'
import OffersCouponTable from './table'
import { Button } from '@/components/ui/button'
import CustomeSelect from '@/components/ui/select'
import { useCouponListQuery } from '@/api-queries/offers-coupons/queries'
import { useRouter } from 'next/navigation'
import { ProductStatus } from '@/constants/status'

export default function OffersAndCoupons() {
  const router = useRouter()
  const [activemodal, setActivemodal] = useState<boolean>(false)
  const [deactivemodal, setDeactivemodal] = useState<boolean>(false)
  const [deletemodal, setDeletemodal] = useState<boolean>(false)
  const [tableParams, setTableParams] = useState({
    page: 1,
    status: '',
    search: '',
  })
  const { data, isFetching } = useCouponListQuery(tableParams)

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  const handleSelect = (value: any) => {
    setTableParams((prevState) => {
        return {
            ...prevState,
            status: value,
            page: 1
        }
    })
}

  function handleOnClick(e: any) {
    e.preventDefault();
    router.push("/offers-coupons/create");
  }

  return (
    <div className=' flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
      <OffersCouponTable
        data={data?.data?.records}
        search={true}
        onSearch={handleSearch}
        actionButtons={[
          <CustomeSelect
            key="select"
            placeholder='Status'
            options={ProductStatus}
            onSelect={handleSelect}
          />,
          <Button
            key="button"
            variant="add_button"
            size="add"
            label="Create New Offer/Coupon"
            onClick={handleOnClick}
          />]}
        pagination={data?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams}
        activemodal={activemodal}
        setActivemodal={setActivemodal}
        deactivemodal={deactivemodal}
        setDeactivemodal={setDeactivemodal}
        deletemodal={deletemodal}
        setDeletemodal={setDeletemodal}
      />
    </div>
  )
}
