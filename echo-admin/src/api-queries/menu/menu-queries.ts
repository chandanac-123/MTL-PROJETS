import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  menuActivate,
  menuAdd,
  menuDeactivate,
  menuEdit,
  menuList,
  menuById,
} from "./menu-urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useMenuListQuery = (data: any) => {
  return useQuery({
    queryKey: ["menulist", data],
    queryFn: () => menuList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useMenuAddQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => menuAdd(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["menulist"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      if (err.response?.data?.message != "Product Group exists") {
        showToast(
          "error",
          err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
        );
      }

    },
  });
};

export const useMenuEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: any }) => menuEdit(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["menulist"] });
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

export const useMenuActivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { groupIds: string[] }) => menuActivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["menulist"] });
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

export const useMenuDeactivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { groupIds: string[] }) => menuDeactivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["menulist"] });
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


export const useMenuGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["menuId", data],
    queryFn: () => menuById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};