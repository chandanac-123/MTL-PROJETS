import { propertyGetbyIdApiCall, propertyListApiCall,propertyCreateApiCall,propertyUpdateApiCall,propertyDeleteApiCall, propertyFileDeleteApiCall} from "../../Static/Apis";

const getProperty = async (data) => {
    try {
        const response = await propertyListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getPropertyId = async (data) => {
    try {
        const response = await propertyGetbyIdApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const createProperty = async (data) => {
    try {
        const response = await propertyCreateApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateProperty = async (data) => {
    try {
        const response = await propertyUpdateApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteProperty = async (data) => {
    try {
        const response = await propertyDeleteApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}

const deletePropertyFile = async (data) => {
    try {
        const response = await propertyFileDeleteApiCall(data)
        const userData = response.data
        return userData;
    } catch (error) {
        throw error;
    }
}


export {getProperty,getPropertyId,createProperty,updateProperty,deleteProperty,deletePropertyFile}