import {
  reportOccupiedVsVacantApiCall,
  reportsListExpense,
  reportsListIncome,
  reportsListTarget,
} from "../../Static/Apis";

export const getReportListingTarget = async (data) => {
  try {
    const response = await reportsListTarget(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getReportListingOccupency = async (data) => {
  try {
    const response = await reportOccupiedVsVacantApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getReportListingIncome = async (data) => {
  try {
    const response = await reportsListIncome(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};


export const getReportListingExpense = async (data) => {
  try {
    const response = await reportsListExpense(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
