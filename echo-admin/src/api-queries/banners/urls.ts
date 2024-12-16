import {
  getBannerByIdApi,
  listBannerApi,
  editBannerApi,
  publishBannerApi,
  unPublishBannerApi,
} from "@/lib/apis";

export const bannerList = async () => {
  try {
    const response = await listBannerApi();
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const getSinglebanner = async (data: any) => {
  try {
    const response = await getBannerByIdApi(data);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const updateBanner = async (data: any, id: string) => {
  try {
    const response = await editBannerApi(data, id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const publishBanner = async ( id: string) => {
  try {
    const response = await publishBannerApi(id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};

export const unpublishBanner = async ( id: string) => {
  try {
    const response = await unPublishBannerApi( id);
    const userDate = response.data;
    return userDate;
  } catch (error) {
    throw error;
  }
};
