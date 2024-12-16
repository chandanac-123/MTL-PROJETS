import { userListApiCall, userBlockApiCall, userUnblockApiCall, userDetailApiCall, userAchievementsApiCall, userPostsApiCall, userKudosApiCall, userDonationsApiCall } from '../../Axios/apis';

export const getUser = async (data) => {
  try {
    const response = await userListApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (data) => {
  try {
    const response = await userBlockApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (data) => {
  try {
    const response = await userUnblockApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getDetailUser = async (data) => {
  try {
    const response = await userDetailApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getUserAchievements = async (data) => {
  try {
    const response = await userAchievementsApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (data) => {
  try {
    const response = await userPostsApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getUserKudos = async (data) => {
  try {
    const response = await userKudosApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getUserDonations = async (data) => {
  try {
    const response = await userDonationsApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};
