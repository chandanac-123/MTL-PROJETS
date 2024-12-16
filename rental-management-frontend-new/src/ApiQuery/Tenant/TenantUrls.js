import { tenantCreateApiCall, tenantDeleteApiCall, tenantFileDeleteApiCall, tenantGetbyIdApiCall, tenantUpdateApiCall, tranHistoryDownloadApiCall, tranHistoryGetApiCall ,tenantSettleDueApiCall,tenantSplitDueApiCall,tenantSettleAllDueApiCall} from "../../Static/Apis";
import { ErrorToast } from "../../Utils/AlertMessages";

const createTenant = async (data) => {
    try {
        const response = await tenantCreateApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateTenant = async (data) => {
    try {
        const response = await tenantUpdateApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteTenant = async (data) => {
    try {
        const response = await tenantDeleteApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const getTenantId = async (data) => {
    try {
        const response = await tenantGetbyIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteTenantFile = async (data) => {
    try {
        const response = await tenantFileDeleteApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const getTranHistoryFile = async (data) => {
    try {
        const response = await tranHistoryGetApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const getTranHistoryDownloadFile = async (data) => {
    try {
        const response = await tranHistoryDownloadApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const getTenantSettleDueFile = async (data) => {
    try {
        const response = await tenantSettleDueApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const splitTenantDue = async (data) => {
    try {
        const response = await tenantSplitDueApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const tenantSettleAllDue = async (data) => {
    try {
        const response = await tenantSettleAllDueApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export {createTenant,updateTenant,deleteTenant,getTenantId,deleteTenantFile,getTranHistoryFile,getTranHistoryDownloadFile,getTenantSettleDueFile,splitTenantDue,tenantSettleAllDue}