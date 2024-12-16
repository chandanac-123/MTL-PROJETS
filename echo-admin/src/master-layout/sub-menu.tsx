import { Collapsible, Content, Trigger } from '@radix-ui/react-collapsible'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import dot from "@public/icons/menu-dot.svg"
import right_arrow from "@public/icons/arrow-right.svg"
import top_arrow from "@public/icons/arrow-top.svg"

export default function SidebarSubMenu({ open, setOpen, icon, label, subItem, pathName }: any) {

    const isActive = subItem?.some((item: any) => pathName.startsWith(item?.path))

    return (
        <div>
            <Collapsible open={open} onOpenChange={setOpen} >
                <Trigger className={`flex items-center text-left p-2 gap-4 rounded-xl bg-gray-800 text-white cursor-pointer transition-colors  ${isActive ? 'bg-bg_select font-semibold text-sidebartext text-bg_secondary py-3 pr-2' : 'text-light_pink font-thin text-sidebartext'} pl-5`}>
                    <Image src={icon} alt="" className="inline-block " />
                    {label}
                    {open ? <Image src={top_arrow} alt="" /> : <Image src={right_arrow} alt="" />}
                </Trigger>
                {subItem?.map((item: any,index:number) => {
                    return (
                        <Content key={index}>
                            <Link href={item?.path} >
                                <div className={`gap-4 flex px-12 py-2 `}>
                                    <Image src={dot} alt="" className="inline-block" />
                                    <label className={`cursor-pointer ${pathName.startsWith(item?.path) ? 'font-semibold text-sidebartext text-bg_secondary' : 'font-thin text-sidebartext text-light_pink'}`}>{item?.label}</label>
                                </div>
                            </Link>
                        </Content>
                    )
                })}
            </Collapsible>
        </div>
    )
}
