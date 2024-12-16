import { balanceSheetDownloadApiCall, balanceSheetGetbyIdApiCall, balanceSheetListApiCall } from "../../Static/Apis";

const getBalanceSheet = async (data) => {
    try {
        const response = await balanceSheetListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getBalanceSheetById = async (data) => {
    try {
        const response = await balanceSheetGetbyIdApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const downloadBalanceSheet = async (data) => {
    try {
        const response = await balanceSheetDownloadApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

 export {getBalanceSheet,getBalanceSheetById,downloadBalanceSheet}