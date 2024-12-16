import { dashboardApiCall } from "../../Static/Apis";

export const getDashboard = async (data) => {
    try {
        const response = await dashboardApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}