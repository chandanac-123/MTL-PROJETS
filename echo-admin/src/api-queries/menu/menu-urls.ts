import {
  activateMenuApi,
  addMenuApi,
  deactivateMenuApi,
  editMenuApi,
  getMenuByIdApi,
  listMenuApi,
} from "@/lib/apis";

export const menuList = async (data: any) => {
  try {
    const response = await listMenuApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const menuAdd = async (data: any) => {
  try {
    const response = await addMenuApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const menuEdit = async (data: any, id: any) => {
  try {
    const response = await editMenuApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const menuById = async (data: any) => {
  try {
    const response = await getMenuByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const menuActivate = async (data: any) => {
  try {
    const response = await activateMenuApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const menuDeactivate = async (data: any) => {
  try {
    const response = await deactivateMenuApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
