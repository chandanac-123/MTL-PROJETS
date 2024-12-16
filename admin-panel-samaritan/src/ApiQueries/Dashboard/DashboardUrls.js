import { dashboardApiCall, fileUploadApiCall, profileUpdateApiCall } from '../../Axios/apis';

export const getDashboard = async (data) => {
  try {
    const response = await dashboardApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const fileUpload = async (data) => {
  try {
    const response = await fileUploadApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const profileUpload = async (data) => {
  try {
    const response = await profileUpdateApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
