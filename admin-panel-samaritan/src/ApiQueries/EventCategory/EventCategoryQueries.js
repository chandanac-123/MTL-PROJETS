import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCategory, createCategory, updateCategory, checkCategory, deleteCategory, getCategoryById } from './EventCategoryUrls';
import { SuccessToast } from '../../Utiles/Helper';

export const useEventCategoryListQuery = (data) => {
  return useQuery({
    queryKey: ['categorylist', data],
    queryFn: () => getCategory(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useCreateCategoryQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: async (data) => {
      query.invalidateQueries('categorylist');
      SuccessToast({ message: 'Category created successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useUpdateCategoryQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateCategory(data),
    onSuccess: async (data) => {
      query.invalidateQueries('categorylist');
      SuccessToast({ message: 'Category updated successfully' });
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useEventCategoryCheckQuery = (data) => {
  return useQuery({
    queryKey: ['categorylist', data],
    queryFn: () => checkCategory(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.enabled ? true : false
  });
};

export const useCategoryDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteCategory(data),
    onSuccess: () => {
      query.invalidateQueries('categorylist');
      SuccessToast({ message: 'Deleted successfully' });
    },
    onError: async (err) => {
      return err;
    }
  });
};

export const useCategoryGetByIdQuery = (data) => {
  return useQuery({
    queryKey: ['categorylist', data],
    queryFn: () => getCategoryById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
