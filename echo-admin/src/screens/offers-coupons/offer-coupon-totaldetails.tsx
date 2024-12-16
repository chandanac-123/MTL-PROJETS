import { Badge } from '@/components/ui/badge';
import React from 'react'

const Offercoupontotaldetails = (couponData: any) => {
    return (
        <div className='flex flex-col lg:flex-row md:flex-col gap-5'>
            <div className='flex flex-row gap-1'>
                <span className='text-sm text-secondary'>Customers Redeemed</span>
                <Badge variant="new">{couponData?.couponData?.data?.n_customersRedeemed}</Badge>
            </div>
            <div className='flex flex-row gap-1'>
                <p className='text-sm text-secondary'>Coupons Redeemed</p>
                <Badge variant="new">{couponData?.couponData?.data?.n_redeemed}</Badge>
            </div>
            <div className='flex flex-row gap-1'>
                <p className='text-sm'>Coupons Left</p>
                <Badge variant="coupon_bg">{couponData?.couponData?.data?.n_balance}</Badge>
            </div>
        </div>
    )
}

export default Offercoupontotaldetails;