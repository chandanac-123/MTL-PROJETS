import { eventListApiCall, eventCreateApiCall, eventUpdateApiCall, eventGetByIdApiCall, eventDeleteApiCall ,eventCitiesApiCall} from '../../Axios/apis';

export const getAllEvent = async (data) => {
  try {
    const response = await eventListApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (data) => {
  try {
    const response = await eventCreateApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (data) => {
  try {
    const response = await eventUpdateApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (data) => {
  try {
    const response = await eventGetByIdApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (data) => {
  try {
    const response = await eventDeleteApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};

export const getCities = async (data) => {
  try {
    const response = await eventCitiesApiCall(data);
    const userData = response.data;
    return userData;
  } catch (error) {
    throw error;
  }
};