import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  brandAdd,
  brandList,
  brandEdit,
  brandById,
  deleteBrand,
} from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useBrandListQuery = (data: any) => {
  return useQuery({
    queryKey: ["brandlist", data],
    queryFn: () => brandList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useBrandAddQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => brandAdd(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["brandlist"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      // showToast(
      //   "error",
      //   err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      // );
    },
  });
};

export const useBrandEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: any }) => brandEdit(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["brandlist"] });
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

export const useBrandGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["brandlist", data],
    queryFn: () => brandById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};

export const useBrandDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteBrand(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["brandlist"] });
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

