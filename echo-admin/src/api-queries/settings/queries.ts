import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";
import { Getprofiledetails, Passwordupdate, Profileupdate } from "./url";
import { Updatepasswordtype, Updateprofiletype } from "@/screens/settings";

export const useGetProfiledetailsQuery = () => {
  return useQuery({
    queryKey: ["profileDetails"],
    queryFn: () => Getprofiledetails(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useProfileDetailsQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (details: Updateprofiletype) => Profileupdate(details),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["profileId"] });
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

export const usePasswordupdateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (details: Updatepasswordtype) => Passwordupdate(details),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["profileDetails"] });
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




