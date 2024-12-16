import { notificationListApiCall } from "../../Static/Apis";


const getNotifications = async (data) => {
    try {
        const response = await notificationListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export {getNotifications}