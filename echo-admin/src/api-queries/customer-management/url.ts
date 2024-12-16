import { activateDeactivateUserApi, customerlistApi, getCustomerdetailsByIdApi } from "@/lib/apis";

  export const UsersList = async (data: any) => {
    try {
      const response = await customerlistApi(data);
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const ActivateDeactivateUser = async (userId: any, status: any) => {
    try {
      const response = await activateDeactivateUserApi(userId,status);
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const UserById = async (data: any) => {
    try {
      const response = await getCustomerdetailsByIdApi(data);
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };
  
  