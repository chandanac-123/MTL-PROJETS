import { useQuery } from "@tanstack/react-query";
import { brandDropdown, categoryDropdown, IssueTypeDropdown, menuDropdown ,productDropdown} from "./urls";

export const useListCategoryQuery = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: () => categoryDropdown(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useListMenuQuery = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: () => menuDropdown(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useListBrandQuery = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => brandDropdown(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useListProductQuery = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => productDropdown(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useListIssueTypeQuery = () => {
  return useQuery({
    queryKey: ["Ticketissuetype"],
    queryFn: () => IssueTypeDropdown(),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
