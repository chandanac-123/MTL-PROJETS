import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  couponList,
  couponAdd,
  getCouponById,
  activateCoupon,
  deactivateCoupon,
  deleteCoupon,
  editCoupon,
  couponTransaction
} from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useCouponListQuery = (data: any) => {
  return useQuery({
    queryKey: ["couponlist", data],
    queryFn: () => couponList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCouponAddQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => couponAdd(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["couponlist"] });
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

export const useCouponEditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: any }) => editCoupon(data,id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["couponlist"] });
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

export const useCouponActivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => activateCoupon(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["couponlist"] });
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

export const useCouponDeactivateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => deactivateCoupon(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["couponlist"] });
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

export const useCouponGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["couponlist", data],
    queryFn: () => getCouponById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useCouponDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteCoupon(data),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["couponlist"] });
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

export const useCouponHistortQuery = (data: any) => {
  return useQuery({
    queryKey: ["couponlist", data],
    queryFn: () => couponTransaction(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};