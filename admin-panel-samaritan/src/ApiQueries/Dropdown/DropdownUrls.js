import { categoryDropdownApiCall, userDropdownApiCall } from '../../Axios/apis';

export const getAllCategory = async (data) => {
  try {
    const response = await categoryDropdownApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (data) => {
  try {
    const response = await userDropdownApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
