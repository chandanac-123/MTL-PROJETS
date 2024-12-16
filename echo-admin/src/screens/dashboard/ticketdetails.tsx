import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { checkIfTodayTime, textBreak } from '@/utils/helper';
import React from 'react';

export const Ticketdetails = ({ opentickets, closedtickets, loading }: any) => {
    return (
        <div className='flex flex-col'>
            {loading && <Spinner />}

            {/* Open Tickets Section */}
            <>
                {opentickets?.length === 0 ? (
                    <p className="text-xs mt-3 justify-center flex font-semibold text-primary">No Data</p>
                ) : (
                    opentickets?.map((ticket: any, i: string) => {
                        const fullName = `${ticket?.user?.firstName || ''} ${ticket?.user?.surname || ''}`.trim();
                        return (
                            <div className='flex flex-row items-center justify-between mb-3' key={i}>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-normal text-secondary mb-1.5'>{ticket?.issueType?.name}</label>
                                    <div className='flex flex-row'>
                                        <p className='flex whitespace-nowrap text-xs font-normal text-badge_grey me-2'>#{ticket?.orderId}</p>
                                        <p className='flex whitespace-nowrap text-xs font-normal text-badge_grey me-2'>| {textBreak(fullName, 30)}</p>
                                        <p className='whitespace-nowrap text-xs font-normal text-badge_grey'>{`|${' '}${checkIfTodayTime(ticket?.createdAt)}`}</p>
                                    </div>
                                </div>
                                <Badge variant={ticket?.status === 'OPEN' ? "confirmed" : "active"}>
                                    {ticket?.status === 'OPEN' ? "Open" : "Closed"}
                                </Badge>
                            </div>
                        );
                    })
                )}
            </>

            {/* Closed Tickets Section */}
            <>
                {closedtickets?.length === 0 ? (
                    <p className="text-xs mt-3 justify-center flex font-semibold text-primary">No Data</p>
                ) : (
                    closedtickets?.map((ticket: any, i: string) => {
                        const fullName = `${ticket?.user?.firstName || ''} ${ticket?.user?.surname || ''}`.trim();
                        return (
                            <div className='flex flex-row items-center justify-between mb-3' key={i}>
                                <div className='flex flex-col'>
                                    <label className='text-sm font-normal text-secondary mb-1.5'>{ticket?.issueType?.name}</label>
                                    <div className='flex flex-row'>
                                        <p className='text-xs font-normal text-badge_grey me-2'>#{ticket?.orderId}</p>
                                        <p className='text-xs font-normal text-badge_grey me-2'>| {textBreak(fullName, 30)}</p>
                                        <p className='text-xs font-normal text-badge_grey'>{`|${' '}${checkIfTodayTime(ticket?.createdAt)}`}</p>
                                    </div>
                                </div>
                                <Badge variant={ticket?.status === 'OPEN' ? "confirmed" : "active"}>
                                    {ticket?.status === 'OPEN' ? "Open" : "Closed"}
                                </Badge>
                            </div>
                        )
                    })
                )}
            </>
        </div>
    );
};
