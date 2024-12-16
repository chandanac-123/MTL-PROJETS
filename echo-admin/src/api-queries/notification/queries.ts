import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationList, notificationRead } from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useNotificationListQuery = () => {
  return useQuery({
    queryKey: ["notification"],
    queryFn: () => notificationList(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useNotificationReadQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: string) => notificationRead(data),
    onSuccess: async (data) => {
      await query.invalidateQueries({ queryKey: ["notification"] });
      await query.invalidateQueries({ queryKey: ["profileDetails"]});
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
