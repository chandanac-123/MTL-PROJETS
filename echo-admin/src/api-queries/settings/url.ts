import { basicProfileUpdateApi, getprofileDetailsApi, passwordUpdateApi } from "@/lib/apis";
import { Updatepasswordtype, Updateprofiletype } from "@/screens/settings";

export const Getprofiledetails = async () => {
  try {
    const response = await getprofileDetailsApi();
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const Profileupdate = async (details: Updateprofiletype) => {
  try {
    const response = await basicProfileUpdateApi(details);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const Passwordupdate = async (details: Updatepasswordtype) => {
  try {
    const response = await passwordUpdateApi(details);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};