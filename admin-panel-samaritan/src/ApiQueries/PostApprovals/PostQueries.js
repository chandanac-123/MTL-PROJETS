import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllPost, approvePost, rejectPost, postDetails } from './PostUrls';
import { ErrorToast, SuccessToast } from '../../Utiles/Helper';

export const usePostListQuery = (data) => {
  return useQuery({
    queryKey: ['postlist', data],
    queryFn: () => getAllPost(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const usePostApproveQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => approvePost(data),
    onSuccess: async (data) => {
      query.invalidateQueries('postlist');
      SuccessToast({ message: 'Post approved successfully' });
    },
    onError: (err) => {
      ErrorToast({ message: err?.response?.data?.message });
      return err;
    }
  });
};

export const usePostRejectQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => rejectPost(data),
    onSuccess: async (data) => {
      query.invalidateQueries('postlist');
      ErrorToast({ message: 'Post rejected' });
    },
    onError: (err) => {
      ErrorToast({ message: err?.response?.data?.message });
      return err;
    }
  });
};

export const usePostDetailsQuery = (data) => {
  return useQuery({
    queryKey: ['postlist', data],
    queryFn: () => postDetails(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
