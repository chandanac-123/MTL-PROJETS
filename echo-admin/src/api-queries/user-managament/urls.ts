import {
  listUserApi,
  userCreateApi,
  userStatusChangeApi,
  userDeleteApi,
} from "@/lib/apis";

export const GetUserList = async (data: any) => {
  try {
    const response = await listUserApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const response = await userCreateApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const statusChangeUser = async (data: any) => {
  try {
    const response = await userStatusChangeApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (data: any) => {
  try {
    const response = await userDeleteApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};