import {
  addBrandApi,
  editBrandApi,
  getByIdBrandApi,
  listBrandApi,
  deactivateBrandApi,
} from "@/lib/apis";

export const brandList = async (data: any) => {
  try {
    const response = await listBrandApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const brandAdd = async (data: any) => {
  try {
    const response = await addBrandApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const brandEdit = async (data: any, id: any) => {
  try {
    const response = await editBrandApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const brandById = async (data: any) => {
  try {
    const response = await getByIdBrandApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const deleteBrand= async (data: any) => {
  try {
    const response = await deactivateBrandApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

