import {
  activateCategoryApi,
  addCategoryApi,
  deactivateCategoryApi,
  editCategoryApi,
  listCategoryApi,
  getCategoryByIdApi,
} from "@/lib/apis";

export const categoryList = async (data: any) => {
  try {
    const response = await listCategoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const categoryAdd = async (data: any) => {
  try {
    const response = await addCategoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const categoryEdit = async (data: any, id: string) => {
  try {
    const response = await editCategoryApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const categoryActivate = async (data: any) => {
  try {
    const response = await activateCategoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const categoryDeactivate = async (data: any) => {
  try {
    const response = await deactivateCategoryApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const categoryGetById = async (data: any) => {
  try {
    const response = await getCategoryByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
