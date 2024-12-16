import { useMutation, useQuery } from "@tanstack/react-query";
import { login, forget_pasword, reset_pasword, change_password ,check_validity} from "./AuthUrl";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from '../../Utils/AlertMessages';

const useLoginQuery = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) => login(data),
        onSuccess: async (data) => {
            if (data?.data?.tokens !== undefined) {
                const Token = {
                    ACCESS_TOKEN: data?.data?.tokens?.access,
                    REFRESH_TOKEN: data?.data?.tokens?.refresh,
                };
                localStorage.setItem('Token', JSON.stringify(Token))
                localStorage.setItem('user', JSON.stringify(data))
                SuccessToast({ message: "Login successfully" })
                // navigate('/dashboard')
            }
        },
        onError: (err) => {
            return err
        },


    })
}

const useForgetPasswordQuery = () => {
    return useMutation({
        mutationFn: (data) => forget_pasword(data),
        onSuccess: async (data) => {
        },
        onError: (err) => {
            return err
        },


    })
}

const useResetPasswordQuery = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (data) => reset_pasword(data),
        onSuccess: async (data) => {
            navigate('/reset-success')
        },
        onError: (err) => {
            return err
        },


    })
}

const useChangePasswordQuery = () => {
    return useMutation({
        mutationFn: (data) => change_password(data),
        onSuccess: async (data) => {
            SuccessToast({ message: "Your password has been updated successfully" })
        },
        onError: (err) => {
            console.log('err: ', err);
            ErrorToast({message:err?.response?.data?.detail?.data?.[0]})
            return err;
        }
    })
}

const useCheckValidity = (data) => {
    return useQuery({
        queryKey: ['getValidity', data],
        queryFn: () => check_validity(data),
        refetchOnWindowFocus: false,
        refetchOnMount: false

    })
}

export { useLoginQuery, useForgetPasswordQuery, useResetPasswordQuery, useChangePasswordQuery,useCheckValidity }









