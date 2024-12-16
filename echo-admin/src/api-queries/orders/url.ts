import {
  getOrderdetailsByIdApi,
  ordersListApi,
  OrderstatusUpdateApi,
  orderHistoryApi,
  getOrderInvoiceApi,
} from "@/lib/apis";

export const OrdersList = async (data: any) => {
  try {
    const response = await ordersListApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const OrderById = async (data: any) => {
  try {
    const response = await getOrderdetailsByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const OrderstatusUpdate = async (data: any, id: any) => {
  try {
    const response = await OrderstatusUpdateApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const OrderHistory = async (data: any) => {
  try {
    const response = await orderHistoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const OrdersInvoice = async (data: any) => {
  try {
    const response = await getOrderInvoiceApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
