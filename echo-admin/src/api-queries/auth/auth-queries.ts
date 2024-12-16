import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  login,
  resetPassword,
  firebaseTokenUpdate,
  verifyLink,
} from "./auth-urls";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/custome-toast";
import { ToastMessages } from "@/constants/toast-messages";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess(data) {
      if (data) {
        const token = JSON.stringify(data?.data); // Assuming `data` is an object you want to store
        const accessToken = data?.data?.accessToken; // Assuming `data.accessToken` is the token you need
        localStorage.setItem("token", token);
        localStorage.setItem("access_token", accessToken); // No need to stringify
        document.cookie = `access_token=${accessToken}; path=/;`;
      }
      showToast("success", ToastMessages.SUCCESS_LOGIN);
    },
    onError(error) {
      const err = error as { response?: { data?: { message?: string } } };
      if (
        err.response?.data?.message !== ToastMessages.INVALIED_CREDENTIAL &&
        err.response?.data?.message !== ToastMessages.ENTRED_EMAIL_INCORRECT
      ) {
        showToast(
          "error",
          err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
        );
      }
    },
  });
};

export const useForgotPasswordQuery = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
    onSuccess: async (data) => {
      showToast("success", ToastMessages.RESET_LINK);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      console.log("err: ", err);
      if (err.response?.data?.message ==ToastMessages.EMAIL_SEND_MESSAGE) {
        showToast("success",err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR );
      } else
        showToast("error",err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR);
    },
  });
};

export const useResetPasswordQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: {
      password: string;
      confirmPassword: string;
      token: string | null;
    }) => resetPassword(data),
    onSuccess: async (data) => {
      router.push("/reset-success");
      // showToast("success", ToastMessages.RESET_SUCCESSFULL);
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useFirebaseUpdateQuery = () => {
  return useMutation({
    mutationFn: (data: any) => firebaseTokenUpdate(data),
    onSuccess: async (data) => {},
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};

export const useResetVerifyQuery = () => {
  return useMutation({
    mutationFn: (data: any) => verifyLink(data),
    onSuccess: async () => {},
    onError: () => {},
  });
};
