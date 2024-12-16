import { listreferralApi } from "@/lib/apis";

export const referralsList = async (data:any) => {
  try {
    const response = await listreferralApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
