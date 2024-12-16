import { categoryListApiCall, categoryCheckApiCall, categoryCreateApiCall, categoryUpdateApiCall, categoryDeleteApiCall, categoryGetByIdApiCall } from '../../Axios/apis';

export const getCategory = async (data) => {
  try {
    const response = await categoryListApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await categoryCreateApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (data) => {
  try {
    const response = await categoryUpdateApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const checkCategory = async (data) => {
  try {
    const response = await categoryCheckApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (data) => {
  try {
    const response = await categoryDeleteApiCall(data);
    const userData = response?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (data) => {
  try {
    const response = await categoryGetByIdApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
