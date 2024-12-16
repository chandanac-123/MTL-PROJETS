import { Customer_sample_address } from '@/data/dummy'
import React from 'react'
import { Customeraddresslist } from './customer-details'
import { CollapsibleLayout } from './collapseLayout'

export const Customeraddress: React.FC<Customeraddresslist> = ({ Address }) => {
    return (
        <>
            {Address?.length != 0 ?
                <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
                    <CollapsibleLayout Address={Address} />
                </div> :
                <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
                    No Addresses found
                </div>
            }
        </>
    )
}
