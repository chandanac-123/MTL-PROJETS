import {rentCollectedListApiCall, rentIncomeCreateApiCall, rentIncomeDeleteApiCall, rentIncomeGetbyIdApiCall, rentIncomeListApiCall, rentIncomeUpdateApiCall, rentPropertyGetbyIdApiCall} from '../../Static/Apis'

export const getRentIncome = async (data) => {
    try {
        const response = await rentIncomeListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getRentIncomeId = async (data) => {
    try {
        const response = await rentIncomeGetbyIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getRentPropertyId = async (data) => {
    try {
        const response = await rentPropertyGetbyIdApiCall(data?.id)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export const createRentIncome = async (data) => {
    try {
        const response = await rentIncomeCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const updateRentIncome = async (data) => {
    try {
        const response = await rentIncomeUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const deleteRentIncome = async (data) => {
    try {
        const response = await rentIncomeDeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getRentCollected = async (data) => {
    try {
        const response = await rentCollectedListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}