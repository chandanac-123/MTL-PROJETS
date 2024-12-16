import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fileUpload, getDashboard, profileUpload } from './DashboardUrls';
import { SuccessToast } from '../../Utiles/Helper';

export const useDashboardQuery = (data) => {
  return useQuery({
    queryKey: ['dashboard', data],
    queryFn: () => getDashboard(data),
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });
};

export const useFileUploadQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => fileUpload(data),
    onSuccess: async (data) => {
      query.invalidateQueries('filelist');
      // SuccessToast({ message: 'File uploaded successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useProfileUpdateQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => profileUpload(data),
    onSuccess: async (data) => {
      query.invalidateQueries('profilelist');
      SuccessToast({ message: 'Profile updated successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};
