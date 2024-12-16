import { userRole, propertyType, state_dropdown, bank_dropdown ,property_dropdown, property_dropdown_rent,expenseType_dropdown,building_dropdown} from "../../Static/Apis";

const getUserList = async (data) => {
    try {
        const response = await userRole(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getPropertyTypeList = async (data) => {
    try {
        const response = await propertyType(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getStateList = async (data) => {
    try {
        const response = await state_dropdown(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getBankList = async (data) => {
    try {
        const response = await bank_dropdown(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getPropertyList = async (data) => {
    try {
        const response = await property_dropdown(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getRentPropertyList = async (data) => {
    try {
        const response = await property_dropdown_rent(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getExpenseTypeList = async (data) => {
    try {
        const response = await expenseType_dropdown(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

const getBuildingList = async (data) => {
    try {
        const response = await building_dropdown(data);
        const userData = response.data;
        return userData;
    } catch (error) {
        throw error;
    }
}

export { getUserList, getPropertyTypeList, getStateList ,getBankList,getPropertyList,getRentPropertyList, getExpenseTypeList,getBuildingList}
