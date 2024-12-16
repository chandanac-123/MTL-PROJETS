import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bannerList,
  getSinglebanner,
  updateBanner,
  publishBanner,
  unpublishBanner,
} from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useBannerListQuery = () => {
  return useQuery({
    queryKey: ["bannerlist"],
    queryFn: () => bannerList(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useBannerGetByIdQuery = (data: any) => {
  return useQuery({
    queryKey: ["bannerlist", data],
    queryFn: () => getSinglebanner(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useBannerUpdateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: any }) =>
      updateBanner(data, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["bannerlist"] });
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

export const useBannerPublishQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: any }) => publishBanner(id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["bannerlist"] });
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

export const useBannerUnpublishQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: any }) => unpublishBanner(id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["bannerlist"] });
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
