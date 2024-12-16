import { brandDropdownApi, categoryDropdownApi, issueTypeDropdownApi, menuDropdownApi,productDropdownApi } from "@/lib/apis";

export const categoryDropdown = async () => {
    try {
      const response = await categoryDropdownApi();
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const menuDropdown = async () => {
    try {
      const response = await menuDropdownApi();
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const brandDropdown = async () => {
    try {
      const response = await brandDropdownApi();
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const productDropdown = async () => {
    try {
      const response = await productDropdownApi();
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };

  export const IssueTypeDropdown = async () => {
    try {
      const response = await issueTypeDropdownApi();
      const userDate = response.data;
      return userDate;
    } catch (error) {
      throw error;
    }
  };