import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";
import { ActivateDeactivateUser, UserById, UsersList } from "./url";

export const useCustomerListQuery = (data: any) => {
  return useQuery({
    queryKey: ["customerlist", data],
    queryFn: () => UsersList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};


export const useCustomerGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["customerId", data],
    queryFn: () => UserById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};

export const useCustomeractive_deactiveQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, status }: { userId: any, status: any }) =>
      ActivateDeactivateUser(userId, status),
    onSuccess: async (data) => {
      await query.invalidateQueries({ queryKey: ["customerlist"] });
      await query.invalidateQueries({ queryKey: ["customerId"] });
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
}


