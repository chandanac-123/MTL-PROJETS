import { useMutation } from "@tanstack/react-query";
import { imgaeUpload } from "./urls";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useUploadImageQuery = () => {
  return useMutation({
    mutationFn: (formData: FormData) => imgaeUpload(formData),
    onSuccess: async (formData) => {
      // showToast("success", formData?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { error?: string } } };
      showToast(
        "error",
        err.response?.data?.error || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};
