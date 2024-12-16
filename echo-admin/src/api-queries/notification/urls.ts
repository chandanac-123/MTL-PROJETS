import { listNotificationsApi, notificationReadApi } from "@/lib/apis";

export const notificationList = async () => {
  try {
    const response = await listNotificationsApi();
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const notificationRead = async (id: string) => {
  try {
    const response = await notificationReadApi(id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
