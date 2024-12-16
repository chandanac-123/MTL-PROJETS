import { useGetProfiledetailsQuery } from '@/api-queries/settings/queries'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SidebarMenu({ icon, path, setOpen, label, pathName }: any) {

  const { data: Profiledetails } = useGetProfiledetailsQuery()

  return (
    <Link href={path} onClick={() => setOpen(false)}>
      <div className={`flex items-center gap-4 p-2 rounded-xl pl-5 ${pathName.startsWith(path) ? 'bg-bg_select font-semibold py-3 text-sidebartext text-bg_secondary' : 'text-light_pink font-thin text-sidebartext'}`}>
        <Image src={icon} alt="" className="inline-block" />
        <div className='flex  gap-3'>
          {label}
          {path === '/customer-support' && Profiledetails?.data?.n_open_ticket > 0 && <div className='rounded-xxl w-6 border-text_label bg-count_bg text-center text-base font-light'>{Profiledetails?.data?.n_open_ticket}</div>}
        </div>
      </div >
    </Link >
  )
}
