"use client"

import Image from "next/image"
import minilogo from "@public/icons/mini_logo.svg"
import notification from "@public/icons/notification.svg"
import profile from "@public/icons/profile_default.svg"
import { useGetProfiledetailsQuery } from "@/api-queries/settings/queries"
import { useRouter } from "next/navigation"
import { textBreak } from "@/utils/helper"

export default function Header() {
    const router = useRouter()
    const { data: Profiledetails } = useGetProfiledetailsQuery()
    const fullName = `${Profiledetails?.data?.firstName || ''} ${Profiledetails?.data?.surname || ''}`.trim();
    const collapsedName = textBreak(fullName, 30);

    return (
        <div className="flex bg-bg_secondary min-h-24 fixed w-full top-0 rounded-t-lg rounded-b-xl items-center justify-between px-8 z-10">
            <Image src={minilogo} alt="" />
            <div className="flex">
                <button className="flex" onClick={() => router.push('/notifications')}>
                    <Image src={notification} alt="" className="w-11" />
                    <span className="relative flex bg-text_error w-auto h-6 py-1 px-2 text-bg_secondary justify-center items-center rounded-md mt-auto right-3">{Profiledetails?.data?.n_notification}</span>
                </button>
                {/* <div className="flex gap-2 border-[0.5px] border-outline_grey w-44 h-12 rounded-xxxl px-1 items-center">
                    <Image src={profile} alt="" className="rounded-xxxl" />
                    <label className="text-secondary text-sm">{`${Profiledetails?.data?.firstName ? Profiledetails?.data?.firstName : ""}${' '}${Profiledetails?.data?.surname ? Profiledetails?.data?.surname : ""}`}</label>
                </div> */}

                <div className="flex gap-2 border-[0.5px] border-outline_grey h-12 rounded-xxxl items-center">
                    <Image src={profile} width={42} height={42} alt="" className="rounded-xxxl p-0.5" />
                    <label className="text-secondary text-sm min-w-fit pr-4">
                    {collapsedName}
                    </label>
                </div>

            </div>
        </div>
    )
}
