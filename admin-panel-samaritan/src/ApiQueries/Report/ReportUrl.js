import { reportExcelApiCall } from '../../Axios/apis';

export const getReport = async (data) => {
  try {
    const response = await reportExcelApiCall(data)
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
