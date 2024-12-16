import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStockById, stockList, stockUpdate, stockHistory } from "./urls";
import { ToastMessages } from "@/constants/toast-messages";
import { showToast } from "@/components/custome-toast";

export const useStockListQuery = (data: any) => {
  return useQuery({
    queryKey: ["stocklist", data],
    queryFn: () => stockList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useStockByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["stocklist", data],
    queryFn: () => getStockById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useStockUpdateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      stockUpdate(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["stocklist"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};

export const useStockHistoryQuery = (data: any) => {
  return useQuery({
    queryKey: ["stocklist", data],
    queryFn: () => stockHistory(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
