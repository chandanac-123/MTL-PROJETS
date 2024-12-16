import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUserList, createUser, statusChangeUser, deleteUser } from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";
import { UserFormType } from "@/screens/user-management/add-user";

export const useGetUserQuery = (data: any) => {
  return useQuery({
    queryKey: ["userlist", data],
    queryFn: () => GetUserList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useUserCreateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: UserFormType) => createUser(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["userlist"] });
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

export const useUserStatusChangeQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => statusChangeUser(id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["userlist"] });
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

export const useUserDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["userlist"] });
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