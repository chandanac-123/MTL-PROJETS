import {
  activateCouponApi,
  addCouponApi,
  deactivateCouponApi,
  deleteCouponApi,
  editCouponApi,
  getCouponByIdApi,
  listCouponApi,
  couponDetailsApi
} from "@/lib/apis";

export const couponList = async (data: any) => {
  try {
    const response = await listCouponApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const couponAdd = async (data: any) => {
  try {
    const response = await addCouponApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const getCouponById = async (data: any) => {
  try {
    const response = await getCouponByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const activateCoupon = async (data: any) => {
  try {
    const response = await activateCouponApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const deactivateCoupon = async (data: any) => {
  try {
    const response = await deactivateCouponApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const deleteCoupon = async (data: any) => {
  try {
    const response = await deleteCouponApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const editCoupon = async (data: any, id: string) => {
  try {
    const response = await editCouponApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const couponTransaction = async (data: any) => {
  try {
    const response = await couponDetailsApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};