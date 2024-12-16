import { useQuery } from '@tanstack/react-query';
import { getReport } from './ReportUrl';

export const useReportListQuery = (data) => {
  return useQuery({
    queryKey: ['reportlist', data],
    queryFn: () => getReport(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
