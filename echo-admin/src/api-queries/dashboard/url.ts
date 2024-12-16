import { dashboardgetApi, salessummaryChartApi } from "@/lib/apis";

export const dashboardDetails = async () => {
  try {
    const response = await dashboardgetApi();
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const SaleschartDetails = async () => {
  try {
    const response = await salessummaryChartApi();
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};