import {
  listProductApi,
  addProductApi,
  editProductApi,
  activateProductApi,
  deactivateProductApi,
  getProductByIdApi,
  deleteProductApi,
  listTopProductApi
} from "@/lib/apis";

export const productList = async (data: any) => {
  try {
    const response = await listProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productAdd = async (data: any) => {
  try {
    const response = await addProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productEdit = async (data: any, id: string) => {
  try {
    const response = await editProductApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productActivate = async (data: any) => {
  try {
    const response = await activateProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productDeactivate = async (data: any) => {
  try {
    const response = await deactivateProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productGetById = async (data: any) => {
  try {
    const response = await getProductByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const productDelete = async (data: any) => {
  try {
    const response = await deleteProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};


export const topProductList = async (data: any) => {
  try {
    const response = await listTopProductApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};