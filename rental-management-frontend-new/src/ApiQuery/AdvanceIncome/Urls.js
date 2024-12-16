import {advanceIncomeListApiCall,advanceIncomeGetbyIdApiCall,advanceIncomeCreateApiCall,advancePropertyListApiCall,advancePropertyByIdApiCall, advanceIncomeUpdateApiCall, advanceIncomeDeleteApiCall, advanceIncomeDownloadApiCall} from '../../Static/Apis'

export const getAdvanceIncome = async (data) => {
    try {
        const response = await advanceIncomeListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getAdvanceIncomeId = async (data) => {
    try {
        const response = await advanceIncomeGetbyIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export const createAdvanceIncome = async (data) => {
    try {
        const response = await advanceIncomeCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getAdvancePropert = async (data) => {
    try {
        const response = await advancePropertyListApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export const getAdvancePropertyById = async (data) => {
    try {
        const response = await advancePropertyByIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export const updateAdvanceIncome = async (data) => {
    try {
        const response = await advanceIncomeUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export const deleteAdvanceIncome = async (data) => {
    try {
        const response = await advanceIncomeDeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}