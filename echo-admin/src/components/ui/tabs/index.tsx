"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs"
import { Tabstitle } from '@/constants/customer-tabs-title';
import slidearrow from '@public/icons/slidearrow.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TabslayoutProps {
    title: Tabstitle[];
    content: React.ReactNode;
    expandIcon: boolean;
    route: string;
}

export const Tabslayout: React.FC<TabslayoutProps> = ({ title, content, expandIcon, route }) => {
    const router = useRouter()
    return (
        <Tabs defaultValue={title?.[0]?.id} className="w-full text-base">
            <TabsList className="flex items-center w-full">
                <div className="flex flex-grow">
                    {title.map(tab => (
                        <TabsTrigger key={tab.id} value={tab.id}>
                            {tab.label}
                            {tab?.count && <span className='ms-2'>{`(${tab?.count})`}</span>}
                        </TabsTrigger>
                    ))}
                </div>
                {expandIcon && (
                    <div className='flex-shrink-0'>
                        <Image className='cursor-pointer' src={slidearrow} alt="" onClick={() => router.push(route)} />
                    </div>
                )}
            </TabsList>
            {Array.isArray(content) && content.map((tabscontent: React.ReactNode, i: number) => (
                <TabsContent key={i} value={title?.[i]?.id}>
                    {tabscontent}
                </TabsContent>
            ))}
        </Tabs>

    )
}
