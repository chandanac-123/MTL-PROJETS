import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "./NotificationUrls"


const useNotificationListQuery = (data) => {
    return useQuery({
        queryKey: ['getNotification', data],
        queryFn: () => getNotifications(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

export {useNotificationListQuery}