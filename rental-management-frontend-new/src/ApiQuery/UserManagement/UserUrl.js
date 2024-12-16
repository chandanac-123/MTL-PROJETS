import { userCreateApiCall, userDeleteApiCall, userGetbyIdApiCall, userListApiCall, userProfileGetApiCall, userProfileUpdateApiCall, userUpdateApiCall } from "../../Static/Apis";

const getUser = async (data) => {
    try {
        const response = await userListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const createUser = async (data) => {
    try {
        const response = await userCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getUserId = async (data) => {
    try {
        const response = await userGetbyIdApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (data) => {
    try {
        const response = await userUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (data) => {
    try {
        const response = await userDeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getUserProfile = async (data) => {
    try {
        const response = await userProfileGetApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateUserProfile = async (data) => {
    try {
        const response = await userProfileUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export {getUser,createUser,getUserId,updateUser,deleteUser,getUserProfile,updateUserProfile}