import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createExpense,
  deleteExpense,
  editExpense,
  getExpenseDetails,
  getExpenseListing,
  deleteFileExpense,
  getReceiptData,
  getExpenseBuildingList
} from "./ExpenseUrls";
import { ErrorToast ,SuccessToast} from "../../Utils/AlertMessages"
import { useNavigate } from "react-router-dom";


export const useExpenseListQuery = (data) => {
  return useQuery({
    queryKey: ["getExpense", data],
    queryFn: () => getExpenseListing(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useExpenseDetailsQuery = (id) => {
  return useQuery({
    queryKey: ["getExpenseDetails", id],
    queryFn: () => getExpenseDetails(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useExpenseCreateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => createExpense(data),
    onSuccess: async (data) => {
      query.invalidateQueries("getExpense");
      SuccessToast({ message: "Expense created successfully" });
    },
    onError: (err) => {
      ErrorToast({ message: "Somthing went wrong !" });
      return err;
    },
  });
};

export const useExpenseEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => editExpense(data),
    onSuccess: async (data) => {
      query.invalidateQueries("getExpense");
      SuccessToast({ message: "Expense updated successfully" });
    },
    onError: (err) => {
      ErrorToast({ message: "Somthing went wrong !" });
      return err;
    },
  });
};

export const useExpenseDeleteQuery = () => {
  const navigate=useNavigate()
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteExpense(id),
    onSuccess: () => {
      query.invalidateQueries("getExpense");
      SuccessToast({ message: "Deleted successfully" });
      navigate('/expense/expenses')
    },
    onError: async (err) => {
      return err;
    },
  });
};

export const useExpenseFileDeleteQuery = () => {
  const query = useQueryClient()
  return useMutation({
      mutationFn: (data) => deleteFileExpense(data),
      onSuccess: () => {
          query.invalidateQueries('getExpense')
      },
      onError: async (err) => {
          return err
      },
  })
}

export const useReceiptDownloadQuery=(data)=>{
  return useQuery({
      queryKey:['getReceiptd',data],
      queryFn:()=>getReceiptData(data),
      refetchOnWindowFocus:false,
      refetchOnMount:false,
      enabled: data?.enabled
  })
}

export const useExpenseBuildingListQuery = (data) => {
  return useQuery({
    queryKey: ["getBUildingList", data],
    queryFn: () => getExpenseBuildingList(data),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
