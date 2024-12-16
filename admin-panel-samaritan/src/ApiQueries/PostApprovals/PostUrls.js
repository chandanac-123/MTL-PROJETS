import { postApproveApiCall, postListApiCall, postRejectApiCall, postDetailsApiCall } from '../../Axios/apis';
import { dummyData } from '../../Utiles/Constants';

export const getAllPost = async (data) => {
  try {
    const response = await postListApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const approvePost = async (data) => {
  try {
    const response = await postApproveApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const rejectPost = async (data) => {
  try {
    const response = await postRejectApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const postDetails = async (data) => {
  try {
    const response = await postDetailsApiCall(data);
    const userData = response?.data?.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
