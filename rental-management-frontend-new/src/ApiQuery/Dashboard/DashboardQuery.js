import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getDashboard } from "./DashboardUrls"

export const useDashboardQuery = (data) => {
    return useQuery({
        queryKey: ['getProp', data],
        queryFn: () => getDashboard(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}