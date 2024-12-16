import { useQuery } from "@tanstack/react-query"
import { downloadBalanceSheet, getBalanceSheet, getBalanceSheetById } from "./BalancesheetUrls"

 const useBalanceSheetListQuery = (data) => {
    return useQuery({
        queryKey: ['getSheet', data],
        queryFn: () => getBalanceSheet(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

const useBalanceSheetGetByIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleSheet', data],
        queryFn: () => getBalanceSheetById(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useBalanceSheetDownloadQuery = (data) => {
    return useQuery({
        queryKey: ['getSheet', data],
        queryFn: () => downloadBalanceSheet(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

export {useBalanceSheetListQuery,useBalanceSheetGetByIdQuery,useBalanceSheetDownloadQuery}