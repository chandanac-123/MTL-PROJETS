import { useQuery } from "@tanstack/react-query";
import { referralsList } from "./urls";

export const useReferralQuery = (data: any) => {
  return useQuery({
    queryKey: ["referralslist", data],
    queryFn: () => referralsList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
