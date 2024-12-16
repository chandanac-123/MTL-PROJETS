import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getInvestIncome ,createInvestIncome,updateInvestIncome,deleteInvestIncome,getSingleInvestIncome,getReceiptData} from "./InvestIncomeUrls"
import { ErrorToast ,SuccessToast} from "../../Utils/AlertMessages"
import { useNavigate } from "react-router-dom"

const useInvestIncomeListQuery=(data)=>{
    return useQuery({
        queryKey:['getInvestIncome',data],
        queryFn:()=>getInvestIncome(data),
        refetchOnWindowFocus:true,
        refetchOnMount:true,
    })
}

const useInvestIncomeCreateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => createInvestIncome(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getInvestIncome')
            SuccessToast({message:"Investment income created successfully"})
        },
        onError: (err) => {
            ErrorToast({message:"Somthing went wrong !"})
            return err
        },
    })
}

const useInvestIncomeUpdateQuery = () => {
    const query = useQueryClient()
    return useMutation({
        mutationFn: (data) => updateInvestIncome(data),
        onSuccess: async (data) => {
            query.invalidateQueries('getInvestIncome')
            SuccessToast({message:"Investment income updated successfully"})
        },
        onError: (err) => {
            ErrorToast({message:"Somthing went wrong !"})
            return err
        },
    })
}

const useInvestIncomeDeleteQuery = () => {
    const navigate=useNavigate()
    const query = useQueryClient()
    return useMutation({
        mutationFn: (id) => deleteInvestIncome(id),
        onSuccess: () => {
            query.invalidateQueries('getInvestIncome')
            SuccessToast({ message: "Deleted successfully" })
            navigate('/income/investment-income')
        },
        onError: async (err) => {
            return err
        },
    })
}

const useInvestIncomeGetByIdQuery=(data)=>{
    return useQuery({
        queryKey:['getInvestIncome',data],
        queryFn:()=>getSingleInvestIncome(data),
        refetchOnWindowFocus:false,
        refetchOnMount:false,
    })
}

const useReceiptDownloadQuery=(data)=>{
    return useQuery({
        queryKey:['getReceipt',data],
        queryFn:()=>getReceiptData(data?.id),
        refetchOnWindowFocus:false,
        refetchOnMount:false,
        enabled: data?.enabled
    })
}

export {useInvestIncomeListQuery,useInvestIncomeCreateQuery,useInvestIncomeUpdateQuery,useInvestIncomeDeleteQuery,useInvestIncomeGetByIdQuery,useReceiptDownloadQuery}