import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReportListingExpense,
  getReportListingIncome,
  getReportListingOccupency,
  getReportListingTarget,
} from "./ReportUrls";

export const useReportListTargetQuery = (data) => {
  return useQuery({
    queryKey: ["getTargets", data],
    queryFn: () => getReportListingTarget(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useReportListOccupied = (data) => {
  return useQuery({
    queryKey: ["getOccupied", data],
    queryFn: () => getReportListingOccupency(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useReportListIncome = (data) => {
  return useQuery({
    queryKey: ["getincomeRep", data],
    queryFn: () => getReportListingIncome(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useReportListExpense = (data) => {
  return useQuery({
    queryKey: ["getexpenseRep", data],
    queryFn: () => getReportListingExpense(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
