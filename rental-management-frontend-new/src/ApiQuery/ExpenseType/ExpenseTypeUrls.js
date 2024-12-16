import { expenseTypeCreateApiCall, expenseTypeDeleteApiCall, expenseTypeGetbyIdApiCall, expenseTypeListApiCall, expenseTypeUpdateApiCall } from "../../Static/Apis";


const getExpenseType = async (data) => {
    try {
        const response = await expenseTypeListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const createExpenseType = async (data) => {
    try {
        const response = await expenseTypeCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getExpenseTypeId = async (data) => {
    try {
        const response = await expenseTypeGetbyIdApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateExpenseType = async (data) => {
    try {
        const response = await expenseTypeUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteExpenseType = async (data) => {
    try {
        const response = await expenseTypeDeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}
export {getExpenseType,createExpenseType,getExpenseTypeId,updateExpenseType,deleteExpenseType}