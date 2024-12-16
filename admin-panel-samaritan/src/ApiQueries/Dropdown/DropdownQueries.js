import { useQuery } from '@tanstack/react-query';
import { getAllCategory, getAllUsers } from './DropdownUrls';

export const useCategoryQuery = (data) => {
  return useQuery({
    queryKey: ['category', data],
    queryFn: () => getAllCategory(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.enabled
  });
};

export const useUsersQuery = (data) => {
  return useQuery({
    queryKey: ['users', data],
    queryFn: () => getAllUsers(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
