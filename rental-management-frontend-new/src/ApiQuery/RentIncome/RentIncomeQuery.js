import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ErrorToast, SuccessToast } from "../../Utils/AlertMessages"
import { createRentIncome, deleteRentIncome, getRentCollected, getRentIncome, getRentIncomeId, getRentPropertyId, updateRentIncome } from "./RentIncomeUrls"

export const useRentIncomeListQuery = (data) => {
    return useQuery({
        queryKey: ['getRentIncome', data],
        queryFn: () => getRentIncome(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}

export const useRentIncomeIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleRentIncome', data],
        queryFn: () => getRentIncomeId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false

    })
}

export const useRentPropertyIdQuery = (data) => {
    return useQuery({
        queryKey: ['getSingleRentProperty', data],
        queryFn: () => getRentPropertyId(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: data ? true : false
    })
}

export const useRentIncomeCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createRentIncome(data),
        onSuccess: async (data) => {
            // query.invalidateQueries('getRentIncome')
            query.invalidateQueries({
                queryKey: ['getRentIncome'],
                refetchType: 'all'
            })
            // SuccessToast({message:"Rent Income created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:"Somthing went wrong !"})
            return err
        },
    })
}

export const useRentIncomeUpdateQuery = (data) => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateRentIncome(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getRentIncome')
            SuccessToast({message:"Rent income updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:err?.response?.data?.detail?.data|| "Somthing went wrong !"})
            return err
        },
    })
}

export const useRentIncomeDeleteQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => deleteRentIncome(data),
        onSuccess: () => {
            query.invalidateQueries('getRentIncome')
            SuccessToast({ message: "Deleted successfully" })
        },
        onError: async (err) => {
            return err
        },
    })
}

export const useRentCollectedListQuery = (data) => {
    return useQuery({
        queryKey: ['getRentIncome', data],
        queryFn: () => getRentCollected(data),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })
}