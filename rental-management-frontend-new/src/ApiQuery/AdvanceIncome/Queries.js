import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"
import { getAdvanceIncome,getAdvanceIncomeId ,createAdvanceIncome,getAdvancePropert, getAdvancePropertyById, updateAdvanceIncome, deleteAdvanceIncome, advanceExcel} from "./Urls"

export const useAdvanceIncomeListQuery = (data) => {
    return useQuery({
        queryKey: ['getAdvanceIncome', data],
        queryFn: () => getAdvanceIncome(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

export const useAdvanceIncomeIdQuery = (data) => {
    return useQuery({
        queryKey: ['getAdvanceIncome', data],
        queryFn: () => getAdvanceIncomeId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

export const useAdvanceIncomeCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createAdvanceIncome(data),
        onSuccess: async (data) => {
            query.invalidateQueries({
                queryKey: ['getAdvanceIncome'],
                refetchType: 'all'
            })
            SuccessToast({message:"Advance Income created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.data?.[0]|| "Somthing went wrong !"})
            return err
        },
    })
}

export const useAdvancePropertyQuery = (data) => {
    return useQuery({
        queryKey: ['getAdvanceIncome', data],
        queryFn: () => getAdvancePropert(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

export const useAdvancePropertyIdQuery = (data) => {
    return useQuery({
        queryKey: ['getAdvanceIncome', data],
        queryFn: () => getAdvancePropertyById(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

export const useAdvanceIncomeUpdateQuery = (data) => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateAdvanceIncome(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getAdvanceIncome')
            SuccessToast({message:"Advance income updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.data|| "Somthing went wrong !"})
            return err
        },
    })
}

export const useAdvanceIncomeDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteAdvanceIncome(data),
        onSuccess: () => {
            query.invalidateQueries('getAdvanceIncome')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}