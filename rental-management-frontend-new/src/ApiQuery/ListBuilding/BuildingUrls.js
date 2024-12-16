import { buildingCreateApiCall, buildingListApiCall,buildingUpdateApiCall,buildingeleteApiCall,targetListApiCall,targetUpdateApiCall,buildingGetbyIdApiCall } from "../../Static/Apis";

const getBuilding = async (data) => {
    try {
        const response = await buildingListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const createBuilding = async (data) => {
    try {
        const response = await buildingCreateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const deleteBuilding = async (data) => {
    try {
        const response = await buildingeleteApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateBuilding = async (data) => {
    try {
        const response = await buildingUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getTarget = async (data) => {
    try {
        const response = await targetListApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const updateTarget = async (data) => {
    try {
        const response = await targetUpdateApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const buildingGetById = async (data) => {
    try {
        const response = await buildingGetbyIdApiCall(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}



export {getBuilding,createBuilding,deleteBuilding,updateBuilding,getTarget,updateTarget,buildingGetById}