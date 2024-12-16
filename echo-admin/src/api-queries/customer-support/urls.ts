import { AddcreditAPi, ChatByConversationIdApi, ChatsentMSGApi, CloseTicketApi, getTicketByIdApi, listTicketApi } from "@/lib/apis";
import { cusotmerTicketsTableAPI } from "@/screens/customer-support";
import { addcreditsForm, ChatByConversationAPI, closeTicketAPI, SendMsgAPI, TicketByAPI } from "@/screens/customer-support/ticket";

export const TicketList = async (data: cusotmerTicketsTableAPI) => {
  try {
    const response = await listTicketApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async (data: TicketByAPI) => {
  try {
    const response = await getTicketByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const Closeticket = async (data: closeTicketAPI, id: string) => {
  try {
    const response = await CloseTicketApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const Addcredit = async (details: addcreditsForm, id: string) => {
  try {
    const response = await AddcreditAPi(details, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const getChatByConversationId = async (data: ChatByConversationAPI) => {
  try {
    const response = await ChatByConversationIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const sentMSG = async (details: SendMsgAPI) => {
  try {
    const response = await ChatsentMSGApi(details);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};