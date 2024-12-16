import { uploadApi } from "@/lib/apis";

export const imgaeUpload = async (data: any) => {
  try {
    const response = await uploadApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
