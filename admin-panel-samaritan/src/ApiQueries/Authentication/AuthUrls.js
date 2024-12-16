import { loginApiCall, userGetApiCall, changePasswordApiCall, forgotPasswordApiCall, resetPasswordApiCall } from '../../Axios/apis';

export const login = async (data) => {
  try {
    const response = await loginApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const userProfile = async (data) => {
  try {
    const response = await userGetApiCall(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await changePasswordApiCall(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await forgotPasswordApiCall(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await resetPasswordApiCall(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

