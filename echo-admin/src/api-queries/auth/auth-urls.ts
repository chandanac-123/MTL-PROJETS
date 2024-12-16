import {
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
  firebaseUpdateApi,
  resetVerifyApi,
} from "@/lib/apis";

export const login = async (data: any) => {
  try {
    const response = await loginApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (data: any) => {
  try {
    const response = await forgotPasswordApi(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: any) => {
  try {
    const response = await resetPasswordApi(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const firebaseTokenUpdate = async (data: { fcmToken: string }) => {
  try {
    const response = await firebaseUpdateApi(data);
    const userData = response.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const verifyLink = async (data: any) => {
  try {
    const response = await resetVerifyApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
