import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, userProfile, changePassword, forgotPassword, resetPassword } from './AuthUrls';
import { ErrorToast, SuccessToast } from '../../Utiles/Helper';
import { useNavigate } from 'react-router-dom';

export const useLoginQuery = () => {
  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: async (data) => {
      if (data) {
        const token = {
          ACCESS_TOKEN: data?.data?.access_token
        };
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(data));
      }
    },
    onError: (error) => {
      console.log('error: ', error);
      return error;
    }
  });
};

export const useUserProfileQuery = (data) => {
  return useQuery({
    queryKey: ['user', data],
    queryFn: () => userProfile(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval:30000
  });
};

export const useChangePasswordQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => changePassword(data),
    onSuccess: async (data) => {
      query.invalidateQueries('change');
      SuccessToast({ message: 'Password has been changed successfully' });
    },
    onError: (error) => {
      ErrorToast({ message: error?.response?.data?.message })
      return error;
    }
  });
};

export const useForgotPasswordQuery = () => {
  return useMutation({
    mutationFn: (data) => forgotPassword(data),
    onSuccess: async (data) => {
      SuccessToast({ message: 'Sent a password reset link. Please check your Email' });
    },
    onError: (error) => {
      ErrorToast({ message: error?.response?.data?.message })
      return error;
    }
  });
};

export const useResetPasswordQuery = () => {
  const navigate=useNavigate()
  return useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: async (data) => {
      console.log('data: ', data);
      SuccessToast({ message: 'Password has been reset successfully' });
      navigate('/reset-success')
    },
    onError: (error) => {
      ErrorToast({ message: error?.response?.data?.message })
      return error;
    }
  });
};