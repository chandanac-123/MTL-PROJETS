import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllEvent, createEvent, updateEvent, getEventById, deleteEvent,getCities } from './EventUrls';
import { SuccessToast } from '../../Utiles/Helper';
import { useNavigate } from 'react-router-dom';

export const useAllEventListQuery = (data) => {
  return useQuery({
    queryKey: ['eventlist', data],
    queryFn: () => getAllEvent(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};

export const useCreateEventQuery = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => createEvent(data),
    onSuccess: async (data) => {
      query.invalidateQueries('eventlist');
      SuccessToast({ message: 'Event created successfully' });
      navigate('/event-management/all');
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useEditEventQuery = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data) => updateEvent(data),
    onSuccess: async (data) => {
      query.invalidateQueries('eventlist');
      SuccessToast({ message: 'Event updated successfully' });
      navigate('/event-management/all');
    },
    onError: (err) => {
      return err;
    }
  });
};

export const useEventGetByIdQuery = (data) => {
  return useQuery({
    queryKey: ['eventlist', data],
    queryFn: () => getEventById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: true
  });
};

export const useEventDeleteQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteEvent(data),
    onSuccess: () => {
      query.invalidateQueries('eventlist');
      SuccessToast({ message: 'Deleted successfully' });
    },
    onError: async (err) => {
      return err;
    }
  });
};

export const useCitiesListQuery = (data) => {
  return useQuery({
    queryKey: ['citylist', data],
    queryFn: () => getCities(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};