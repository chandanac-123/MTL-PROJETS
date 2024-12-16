import { Search } from '@/components/ui/search'
import React from 'react'

export default function Header({ title, subTitle, total }: any) {
    return (
        <div className="flex flex-col gap-1 text-secondary text-md font-medium">
            {title}
            <div className="text-extra_light_grey text-xs">{total} {subTitle}</div>
        </div>
    )
}
