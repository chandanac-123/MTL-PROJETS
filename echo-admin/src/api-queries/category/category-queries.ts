import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryAdd,
  categoryList,
  categoryEdit,
  categoryActivate,
  categoryDeactivate,
  categoryGetById,
} from "./category-urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useCategoryListQuery = (data: any) => {
  return useQuery({
    queryKey: ["categorylist", data],
    queryFn: () => categoryList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCategoryAddQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string }) => categoryAdd(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["categorylist"] });
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

export const useCategoryEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      categoryEdit(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["categorylist"] });
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

export const useCategoryActivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { categoryIds: string[] }) => categoryActivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["categorylist"] });
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

export const useCategoryDeactivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { categoryIds: string[] }) => categoryDeactivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["categorylist"] });
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

export const useCategoryGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["categoryId", data],
    queryFn: () => categoryGetById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};
