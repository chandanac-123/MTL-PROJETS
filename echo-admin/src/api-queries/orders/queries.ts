import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OrderById,
  OrdersList,
  OrderstatusUpdate,
  OrderHistory,
  OrdersInvoice,
} from "./url";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useOrdersListQuery = (data: any, enabled: boolean) => {
  return useQuery({
    queryKey: ["ordersList", data],
    queryFn: () => OrdersList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: enabled,
  });
};

export const useOrderGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["orderId", data],
    queryFn: () => OrderById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};

export const useOrderStatusUpdateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      OrderstatusUpdate(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["orderId"] });
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

export const useOrdersHistoryQuery = (data: any, enabled: boolean) => {
  return useQuery({
    queryKey: ["ordersList", data],
    queryFn: () => OrderHistory(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: enabled,
  });
};

export const useOrdersInvoiceQuery = (data: any, enabled: any) => {
  return useQuery({
    queryKey: ["ordersInvoice", data],
    queryFn: () => OrdersInvoice(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: enabled,
  });
};
