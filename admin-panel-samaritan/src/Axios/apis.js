import axiosInstance from './axios';

//AUTHENTICATION
export const loginApiCall = (details) => axiosInstance.post('auth/admin/login', details);
export const userGetApiCall = () => axiosInstance.get('users/profile');
export const changePasswordApiCall = (details) => axiosInstance.put('auth/users/change/password',details);
export const forgotPasswordApiCall = (details) => axiosInstance.post('auth/users/forgot/password',details);
export const resetPasswordApiCall = (details) => axiosInstance.post('auth/admin/reset/password',details);

//DROPDOWN API
export const categoryDropdownApiCall = (id) => axiosInstance.get(`category/list/?id=${id?.id || ''}`);
export const userDropdownApiCall = () => axiosInstance.get(`users/list`);

//DASHBOARD
export const dashboardApiCall = () => axiosInstance.get('dashboard');
export const fileUploadApiCall = (details) => axiosInstance.post('files/upload/single', details,{headers: { 'Content-Type': 'multipart/formdata' }});
export const profileUpdateApiCall = (details) => axiosInstance.put('users', details);

//USER-MANAGEMENT
export const userListApiCall = (data) => axiosInstance.get(`users/?page=${data?.pagination?.current || 1}&size=${data?.pagination?.pageSize || 10}&status=${data?.filterVal || 'all'}&name=${data?.pagination?.search || ''}`);
export const userBlockApiCall = (id) => axiosInstance.patch(`users/${id}/block`);
export const userUnblockApiCall = (id) => axiosInstance.patch(`users/${id}/unblock`);
export const userDetailApiCall = (id) => axiosInstance.get(`users/${id}`);
export const userAchievementsApiCall = (id) => axiosInstance.get(`users/${id}/achievements`);
export const userPostsApiCall = (data) => axiosInstance.get(`post/?page=${data?.pagination?.current || 1}&size=${data?.pagination?.pageSize || 10}&status=approved&userId=${data?.userId || ''}`);
export const userKudosApiCall = (id) => axiosInstance.get(`users/${id}/kudos`);
export const userDonationsApiCall = (data) => axiosInstance.get(`users/${data?.id}/donation/?date=${data?.tableParams?.dateFilter || ''}&page=${data?.pagination?.current || 1}&size=${data?.pagination?.pageSize || 10}`);

//POST-APPROVAL/REJECT
export const postListApiCall = (data) => axiosInstance.get(`post/?page=${data?.pagination?.current || 1}&size=${data?.pagination?.pageSize || 10}&status=pending&userName=${data?.pagination?.search || ''}&categoryId=${data?.filterVal || ''}`);
export const postApproveApiCall = (id) => axiosInstance.post(`post/${id}/approve`);
export const postRejectApiCall = (id) => axiosInstance.post(`post/${id}/reject`);
export const postDetailsApiCall = (data) => axiosInstance.get(`post/${data || ''}`);

//CATEGORY
export const categoryListApiCall = (data) => axiosInstance.get(`category/?page=${data?.pagination?.current || ''}&size=${data?.pagination?.pageSize || ''}&categoryName=${data?.pagination?.search || ''}`);
export const categoryCheckApiCall = (data) => axiosInstance.get(`category/check?name=${data?.state}`);
export const categoryCreateApiCall = (details) => axiosInstance.post(`category/create`, details);
export const categoryUpdateApiCall = (details) => axiosInstance.patch(`category/edit`, details);
export const categoryDeleteApiCall = (data) => axiosInstance.delete(`category/delete`, data);
export const categoryGetByIdApiCall = (data) => axiosInstance.get(`category/?categoryId=${data?.id || ''}`);

//ALL EVENT
export const eventListApiCall = (data) => axiosInstance.get(`event/?page=${data?.pagination?.current || ''}&size=${data?.pagination?.pageSize || ''}&eventName=${data?.pagination?.search || ''}&categoryId=${data?.categoryType || ''}&status=${data?.eventStatus || ''}`);
export const eventCreateApiCall = (details) =>
  axiosInstance.post(`event`, details, {
    headers: { 'Content-Type': 'multipart/formdata' }
  });
export const eventUpdateApiCall = (details) =>
  axiosInstance.put(`event/edit`, details, {
    headers: { 'Content-Type': 'multipart/formdata' }
  });
export const eventGetByIdApiCall = (data) => axiosInstance.get(`event/${data?.id || ''}`);
export const eventDeleteApiCall = (data) => axiosInstance.delete(`event/delete`, data);
export const eventCitiesApiCall = (data) => axiosInstance.get(`system/cities`);

//REPORT EXCEL
export const reportExcelApiCall = (data) => axiosInstance.get(`report?name=${data}`);
