import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createExpenseType, getExpenseType,updateExpenseType,deleteExpenseType ,getExpenseTypeId} from "./ExpenseTypeUrls"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"

const useExpenseTypeListQuery = (data) => {
    return useQuery({
        queryKey: ['getType', data],
        queryFn: () => getExpenseType(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true

    })
}

const useExpenseTypeCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createExpenseType(data),
        onSuccess: async (data) => {
            // query.invalidateQueries('getType')
            query.invalidateQueries({
                queryKey: ['getType'],
                refetchType: 'all'
            })
            query.invalidateQueries({
                queryKey: ['getExpenseType'],
                refetchType: 'all'
            })
            SuccessToast({message:"Expense type created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.name?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useExpenseTypeUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateExpenseType(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getType')
            SuccessToast({message:"Updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.email?.[0]||err?.response?.data?.detail?.phone_number?.[0]||"Somthing went wrong !"})
            return err
        },
    })
}

const useExpenseTypeIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleExpenseType', data],
        queryFn: () => getExpenseTypeId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

const useExpenseTypeDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteExpenseType(data),
        onSuccess: () => {
            // query.invalidateQueries('getType')
            query.invalidateQueries({
                queryKey: ['getType'],
                refetchType: 'all'
            })
            query.invalidateQueries({
                queryKey: ['getExpenseType'],
                refetchType: 'all'
            })
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

export {useExpenseTypeListQuery,useExpenseTypeCreateQuery,useExpenseTypeUpdateQuery,useExpenseTypeDeleteQuery,useExpenseTypeIdQuery}