'use client'
import { useBannerListQuery } from '@/api-queries/banners/queries'
import AddEditHeader from '@/common/add-edit-header'
import BannerCard from '@/components/banner-card/view-card'
import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function Banners() {
  const { data, isFetching } = useBannerListQuery()

  return (
    <>
      <AddEditHeader
        head="Banners"
        backwardIcon={false}
      />
      <div className='flex w-full gap-6'>
        {data?.data?.slice(0, 3).map((item: any, index: number) => {
          return (
            <div key={index} className='bg-bg_secondary p-4 rounded-md'>
              <div className="flex justify-between py-3">
                <p className='font-medium text-md'>{item?.name}</p>
                <Badge variant={item?.isPublished ? "active" : "inactive"} >{item?.isPublished ? "Published" : "Unpublished"}</Badge>
              </div>
              <BannerCard key={index} data={item} />
            </div>
          )
        })}
      </div >
    </>
  )
}
