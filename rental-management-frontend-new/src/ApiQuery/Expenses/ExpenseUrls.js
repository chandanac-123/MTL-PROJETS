import {
  expenseCreateApiCall,
  expenseDeleteApiCall,
  expenseDetailsGetApiCall,
  expenseEditApiCall,
  expenseListGetApiCall, expenseFileDeleteApiCall, ReceiptDownloadApiCallexpense,expenseTypeListBuildingApiCall
} from "../../Static/Apis";

export const getExpenseListing = async (data) => {
  try {
    const response = await expenseListGetApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getExpenseDetails = async (id) => {
  try {
    const response = await expenseDetailsGetApiCall(id);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const createExpense = async (data) => {
  try {
    const response = await expenseCreateApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const editExpense = async (data) => {
  try {
    const response = await expenseEditApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};


export const deleteExpense = async (id) => {
  try {
    const response = await expenseDeleteApiCall(id);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
}

export const deleteFileExpense = async (id) => {
  try {
    const response = await expenseFileDeleteApiCall(id);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
}

export const getReceiptData = async (data) => {
  try {
      const response = await ReceiptDownloadApiCallexpense(data);
      const userData = response.data;
      return userData;
  } catch (error) {
      throw error;
  }
}

export const getExpenseBuildingList = async (data) => {
  try {
    const response = await expenseTypeListBuildingApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};