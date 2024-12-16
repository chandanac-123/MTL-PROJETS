import { changePasswordApiCall, loginApiCall, requestPasswordLinkApiCall, resetPasswordApiCall,checkLinkValidity } from '../../Static/Apis';

const login = async (data) => {
    try {
        const response = await loginApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const forget_pasword = async (data) => {
    try {
        const response = await requestPasswordLinkApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const reset_pasword = async (data) => {
    try {
        const response = await resetPasswordApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const change_password = async (data) => {
    try {
        const response = await changePasswordApiCall(data)
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error
    }
}

const check_validity = async (data) => {
    try {
        const response = await checkLinkValidity(data)
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error
    }
}

export { login, forget_pasword, reset_pasword, change_password,check_validity }