import { ToastMessages } from "@/constants/toast-messages";
import { showToast } from "@/components/custome-toast";
import {
  Addcredit,
  Closeticket,
  getChatByConversationId,
  getTicketById,
  sentMSG,
  TicketList,
} from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cusotmerTicketsTableAPI } from "@/screens/customer-support";
import { getTicketByIdApi } from "@/lib/apis";
import {
  addcreditsForm,
  ChatByConversationAPI,
  closeTicketAPI,
  SendMsgAPI,
  TicketByAPI,
} from "@/screens/customer-support/ticket";

export const useTicketListQuery = (data: cusotmerTicketsTableAPI) => {
  return useQuery({
    queryKey: ["ticketlist", data],
    queryFn: () => TicketList(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useTickeByIdQuery = (data: TicketByAPI) => {
  return useQuery({
    queryKey: ["ticketId", data],
    queryFn: () => getTicketById(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
  });
};

export const useCloseticketQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, id }: { data: closeTicketAPI; id: string }) =>
      Closeticket(data, id),
    onSuccess: async (data) => {
      await query.invalidateQueries({ queryKey: ["ticketId"] });
      await query.invalidateQueries({ queryKey: ["profileDetails"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};

export const useAddcreditQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ details, id }: { details: addcreditsForm; id: string }) =>
      Addcredit(details, id),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["ticketId"] });
      showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};

export const useChatByConversationIdQuery = (data: ChatByConversationAPI) => {
  return useQuery({
    queryKey: ["chatcontainer", data],
    queryFn: () => getChatByConversationId(data),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: data?.id ? true : false,
    refetchInterval: 500,
  });
};

export const useChatboxQuery = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ details }: { details: SendMsgAPI }) => sentMSG(details),
    onSuccess: async (data) => {
      query.invalidateQueries({ queryKey: ["chatcontainer"] });
      // showToast("success", data?.message);
    },
    onError: (error) => {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || ToastMessages.UNEXCEPTED_ERROR
      );
    },
  });
};
