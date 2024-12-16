'use client'
import { useNotificationListQuery, useNotificationReadQuery } from "@/api-queries/notification/queries";
import { useGetProfiledetailsQuery } from "@/api-queries/settings/queries";
import AddEditHeader from "@/common/add-edit-header";
import { checkIfTodayTime, checkTodayReturnDate } from "@/utils/helper";
import { useRouter } from "next/navigation";

interface ReadNotificationType {
    id: string;
    referenceId: string;
    type: string;
}

export default function Notifications() {
    const router = useRouter();
    let previousDate: string | null = null;
    const { data, isFetching } = useNotificationListQuery();
    const { mutateAsync: readNotification, isPending } = useNotificationReadQuery();
    const { data: Profiledetails, refetch } = useGetProfiledetailsQuery()

    const handleReadNotification = async ({ id, referenceId, type }: ReadNotificationType) => {
        try {
            await readNotification(id);
            if (type === 'order_created') {
                router.push(`/orders/order-details/${referenceId}`);
            } else if (type === 'new_ticket') {
                router.push(`/customer-support/ticket/${referenceId}`);
            } else if (type === 'coupon_expiry') {
                router.push(`/offers-coupons/details/${referenceId}`)
            }
            else {
                router.push(`/stock-management`);
            }
            refetch()
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="flex flex-col gap-2 h-full w-full">
            <AddEditHeader
                head="Notifications"
                backwardIcon={false}
            />
            {data?.data?.map((item: any, index: number) => {
                // Get the date label for the current item
                const currentDate = checkTodayReturnDate(item?.createdAt);

                // Only show the date if it's different from the previous one
                const showDate = currentDate !== previousDate;
                previousDate = currentDate; // Update the previous date

                return (
                    <div key={index} className="flex flex-col w-full py-0.5">
                        {showDate && (
                            <p className="text-sm text-primary py-4">{currentDate}</p>
                        )}
                        <button className="text-left"
                            onClick={() => handleReadNotification({
                                id: item?.id,
                                referenceId: item?.referenceId,
                                type: item?.type
                            })}>
                            <div className={`flex-col w-full gap-2 p-6 ${item?.isRead ? 'bg-bg_secondary' : 'bg-notification_bg'} text-sm rounded-md`}>
                                <div className="mb-2 text-md">
                                    {item?.content?.split(' ').map((word: any, index: any) => {

                                        return (
                                            word.startsWith('(#') ? (
                                                <span key={index} className="text-primary"> {word} </span>
                                            ) : (
                                                <span key={index}>{word} </span>
                                            )
                                        )
                                    })}
                                </div>

                                <p className="text-xs text-primary">{checkIfTodayTime(item?.createdAt)}</p>
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
