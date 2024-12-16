import { editStockApi, getStockByIdApi, listStockApi ,stockHistoryApi} from "@/lib/apis";

export const stockList = async (data: any) => {
  try {
    const response = await listStockApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const getStockById = async (data: any) => {
  try {
    const response = await getStockByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const stockUpdate = async (data: any, id: any) => {
  try {
    const response = await editStockApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const stockHistory = async (data: any) => {
  try {
    const response = await stockHistoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};