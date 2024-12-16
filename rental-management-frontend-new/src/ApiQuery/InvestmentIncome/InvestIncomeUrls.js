import { investIncomeListApiCall ,investIncomeCreateApiCall,investIncomeUpdateApiCall,investIncomeDeleteApiCall,investIncomeGetbyIdApiCall,ReceiptDownloadApiCall} from "../../Static/Apis";

const getInvestIncome = async (data) => {
    try {
        const response = await investIncomeListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const createInvestIncome = async (data) => {
    try {
        const response = await investIncomeCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateInvestIncome = async (data) => {
    try {
        const response = await investIncomeUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteInvestIncome = async (data) => {
    try {
        const response = await investIncomeDeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getSingleInvestIncome = async (data) => {
    try {
        const response = await investIncomeGetbyIdApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getReceiptData = async (data) => {
    try {
        const response = await ReceiptDownloadApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export {getInvestIncome,createInvestIncome,updateInvestIncome,deleteInvestIncome,getSingleInvestIncome,ReceiptDownloadApiCall,getReceiptData}