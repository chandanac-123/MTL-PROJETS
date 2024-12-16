import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  productList,
  productAdd,
  productEdit,
  productActivate,
  productDeactivate,
  productGetById,
  productDelete,
  topProductList
} from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useProductListQuery = (data: any) => {
  return useQuery({
    queryKey: ["productlist", data],
    queryFn: () => productList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useProductAddQuery = () => {
  return useMutation({
    mutationFn: (data: any) => productAdd(data),
    onSuccess: async (data) => {
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR, 
        "translate-x-[200px] translate-y-[50px]"
      );
    },
  });
};

export const useProductEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: any }) => productEdit(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["productlist"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR, "translate-x-[200px] translate-y-[70px]"
      );
    },
  });
};

export const useProductActivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { productIds: string[] }) => productActivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["productlist"] });
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

export const useProductDeactivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: { productIds: string[] }) => productDeactivate(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["productlist"] });
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

export const useProductGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["productlist", data],
    queryFn: () => productGetById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};

export const useProductDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => productDelete(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["productlist"] });
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

export const useTopProductListQuery = (data: any) => {
  return useQuery({
    queryKey: ["topproductlist", data],
    queryFn: () => topProductList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};