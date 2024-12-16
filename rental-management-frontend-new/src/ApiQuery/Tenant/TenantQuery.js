import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTenant, deleteTenant, deleteTenantFile, getTenantId, getTranHistoryDownloadFile, getTranHistoryFile, updateTenant, getTenantSettleDueFile, splitTenantDue, tenantSettleAllDue } from "./TenantUrls"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"

const useTenantCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createTenant(data),
        onSuccess: async (data) => {
            setTimeout(() => {
                query.invalidateQueries('getProp')
            }, 100)
            SuccessToast({ message: "Tenant created successfully" })
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.property_id?.[0] ||err?.response?.data?.detail?.data?.[0]|| "Somthing went wrong !" })
            return err
        },
    })
}

const useTenantUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateTenant(data),
        onSuccess: async () => {
            query.invalidateQueries('getTenant')
            SuccessToast({ message: "Tenant updated successfully" })
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.data || "Somthing went wrong !" })
            return err
        },
    })
}

const useTenantDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteTenant(data),
        onSuccess: () => {
            query.invalidateQueries('getTenant')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

const useTenantIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleTenant', data],
        queryFn: () => getTenantId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false

    })
}

const useTenantFileDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteTenantFile(data),
        onSuccess: () => {
            query.invalidateQueries('getTenant')
        },
        onError: async (err) => {
            return err
        },
    })
}

const useTranHistoryListQuery = (data) => {
    return useQuery({
        queryFn: () => getTranHistoryFile(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true

    })
}

const useTranHistoryDownloadQuery = (data) => {
    return useQuery({
        queryFn: () => getTranHistoryDownloadFile(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        throwOnError: true
    })
}

const useTenantSettleDueQuery = (data) => {
    return useQuery({
        queryFn: () => getTenantSettleDueFile(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

const useTenantSplitDueQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => splitTenantDue(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getTenant')
            // SuccessToast({ message: "Split Due successfully" })
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.property_id?.[0] || "Somthing went wrong !" })
            return err
        },
    })
}

const useTenantSettleAllDueQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => tenantSettleAllDue(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getTenant')
            SuccessToast({ message: "Settled dues successfully" })
        },
        onError: (err) => {
            ErrorToast({ message: err?.response?.data?.detail?.data?.[0] || "Somthing went wrong !" })
            return err
        },
    })
}


export { useTenantCreateQuery, useTenantUpdateQuery, useTenantDeleteQuery, useTenantIdQuery, useTenantFileDeleteQuery, useTranHistoryListQuery, useTranHistoryDownloadQuery, useTenantSettleDueQuery, useTenantSplitDueQuery, useTenantSettleAllDueQuery }