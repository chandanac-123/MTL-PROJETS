import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, blockUser, unblockUser, getDetailUser, getUserAchievements, getUserPosts, getUserKudos, getUserDonations } from './UserUrls';
import { SuccessToast } from '../../Utiles/Helper';

export const useUserListQuery = (data) => {
  return useQuery({
    queryKey: ['userlist', data],
    queryFn: () => getUser(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useUserBlockQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => blockUser(data),
    onSuccess: async (data) => {
      query.invalidateQueries('userlist');
      SuccessToast({ message: 'User blocked successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useUserUnblockQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => unblockUser(data),
    onSuccess: async (data) => {
      query.invalidateQueries('userlist');
      SuccessToast({ message: 'User unblocked successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useUserDetailQuery = (data) => {
  return useQuery({
    queryKey: ['userdetails', data],
    queryFn: () => getDetailUser(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useUserAchievementQuery = (data) => {
  return useQuery({
    queryKey: ['userachievements', data],
    queryFn: () => getUserAchievements(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useUserPostsQuery = (data) => {
  return useQuery({
    queryKey: ['userpost', data],
    queryFn: () => getUserPosts(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useUserKudosQuery = (data) => {
  return useQuery({
    queryKey: ['userkudos', data],
    queryFn: () => getUserKudos(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useUserDonationsQuery = (data) => {
  return useQuery({
    queryKey: ['userdonation', data],
    queryFn: () => getUserDonations(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
