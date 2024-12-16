import { userRoleCreateApiCall, userRoleListApiCall, userRoleGetbyIdApiCall,userRoleEditApiCall,userRoleDeleteApiCall } from "../../Static/Apis";

const getUserRole = async (data) => {
    try {
        const response = await userRoleListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const createUserRole = async (data) => {
    try {
        const response = await userRoleCreateApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const getUserRoleId = async (data) => {
    try {
        const response = await userRoleGetbyIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateUserRole = async (data) => {
    try {
        const response = await userRoleEditApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteUserRole = async (data) => {
    try {
        const response = await userRoleDeleteApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

export { getUserRole, createUserRole ,getUserRoleId,updateUserRole,deleteUserRole}