import { useQuery } from "@tanstack/react-query";
import { dashboardDetails, SaleschartDetails } from "./url";

export const useDashboardQuery = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => dashboardDetails(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};

export const useSalessummarychartQuery = () => {
    return useQuery({
        queryKey: ["salessummaryChart"],
        queryFn: () => SaleschartDetails(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });
};