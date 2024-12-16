import { Updatepasswordtype, Updateprofiletype } from "@/screens/settings";
import axiosInstance from "./axiosInstance";
import { cusotmerTicketsTableAPI } from "@/screens/customer-support";
import { addcreditsForm, ChatByConversationAPI, closeTicketAPI, SendMsgAPI, TicketByAPI } from "@/screens/customer-support/ticket";
import { UserFormType } from "@/screens/user-management/add-user";

//AUTHENTICATION
export const loginApi = (details: any) => axiosInstance.post('/api/user/auth/admin-login', details)
export const forgotPasswordApi = (details: any) => axiosInstance.post('/api/user/auth/forget-password', details);
export const resetPasswordApi = (details: any) => axiosInstance.post('/api/user/auth/reset-password', details);
export const resetVerifyApi = (details: any) => axiosInstance.post('/api/user/auth/verify-reset-password-link', details);

//DASHBOARD
export const dashboardgetApi = () => axiosInstance.get('/api/dashboard/')
export const salessummaryChartApi = () => axiosInstance.post('/api/dashboard/sales-summary')

//ORDERS
export const ordersListApi = (data: any) => axiosInstance.get(`/api/order/get-all-orders?page=${data?.page}&pageSize=${data?.pageSize ?? ''}&status=${data?.status ?? ''}&key=${data?.search ?? ''}&fromDate=${data?.fromDate ?? ""}&toDate=${data?.toDate ?? ''}`)
export const getOrderdetailsByIdApi = (data: any) => axiosInstance.get(`/api/order/get-order/${data?.id}`)
export const OrderstatusUpdateApi = (details: any, id: string) => axiosInstance.post(`/api/order/update-status/${id}`, details)
export const orderHistoryApi = (data: any) => axiosInstance.get(`/api/order/${data?.id}/history?page=${data?.page}&status=${data?.status ?? ''}&key=${data?.search ?? ''}&fromDate=${data?.fromDate ?? ""}&toDate=${data?.toDate ?? ''}`)
export const getOrderInvoiceApi = (id: string) => axiosInstance.get(`/api/order/invoice/${id}`)

//PRODUCTS-BRAND
export const listBrandApi = (data: any) => axiosInstance.get(`/api/brand/?page=${data?.page}&name=${data?.search}&key=${data?.search}`)
export const addBrandApi = (details: any) => axiosInstance.post('/api/brand/create', details)
export const editBrandApi = (details: any, id: any) => axiosInstance.put(`/api/brand/update/${id}`, details)
export const checkBrandApi = () => axiosInstance.get('/api/brand/get-by-name')
export const getByIdBrandApi = (data: any) => axiosInstance.get(`/api/brand/${data?.id}`)
export const deactivateBrandApi = (id: any) => axiosInstance.patch(`/api/brand/deactivate/${id}`)

//PRODUCTS
export const listProductApi = (data: any) => axiosInstance.get(`/api/product/get-all-products/?currentPage=${data?.page || 1}&isActive=${data?.status || ''}&productType=${data?.productType || ''}&pgroupId=${data?.menu || ""}&categoryId=${data?.category || ""}&q=${data?.search}`)
export const listTopProductApi = (data: any) => axiosInstance.get(`/api/product/get-all-products/?currentPage=${data?.page || 1}&isPopular=${data?.isTop}&q=${data?.search}&isActive=${data?.status}`)
export const addProductApi = (details: any) => axiosInstance.post('/api/product/create-product', details)
export const editProductApi = (details: any, id: any) => axiosInstance.put(`/api/product/update-product/${id}`, details)
export const activateProductApi = (details: { categoryIds: string[] }) => axiosInstance.post('/api/product/activate', details)
export const deactivateProductApi = (details: { categoryIds: string[] }) => axiosInstance.post('/api/product/deactivate', details)
export const getProductByIdApi = (data: any) => axiosInstance.get(`/api/product/get-product/${data?.id}`)
export const deleteProductApi = (id: any) => axiosInstance.delete(`/api/product/delete-product/${id}`)

//PRODUCTS-CATEGORY
export const listCategoryApi = (data: any) => axiosInstance.get(`/api/category/get-all-categories/?page=${data?.page}&isActive=${data?.filter}&q=${data?.search}`)
export const addCategoryApi = (details: any) => axiosInstance.post('/api/category/create', details)
export const editCategoryApi = (details: any, id: any) => axiosInstance.post(`/api/category/update/${id}`, details)
export const activateCategoryApi = (details: { categoryIds: string[] }) => axiosInstance.post('/api/category/activate', details)
export const deactivateCategoryApi = (details: { categoryIds: string[] }) => axiosInstance.post('/api/category/deactivate', details)
export const getCategoryByIdApi = (data: any) => axiosInstance.get(`/api/category/get-category/${data?.id}`)

//PRODUCT-MENU
export const listMenuApi = (data: any) => axiosInstance.get(`/api/product/pgroup/get-all-product-groups/?page=${data?.page}&isActive=${data?.filter}&q=${data?.search}`)
export const addMenuApi = (details: any) => axiosInstance.post('/api/product/pgroup/create-pgroup', details)
export const editMenuApi = (details: any, id: any) => axiosInstance.post(`/api/product/pgroup/update-pgroup/${id}`, details)
export const activateMenuApi = (details: { groupIds: string[] }) => axiosInstance.post('/api/product/pgroup/activate-product-group', details)
export const deactivateMenuApi = (details: { groupIds: string[] }) => axiosInstance.post('/api/product/pgroup/deactivate-product-group', details)
export const getMenuByIdApi = (data: any) => axiosInstance.get(`/api/product/pgroup/get-product-group/${data?.id}`)

//IMAGE UPLOAD
export const uploadApi = (details: any) => axiosInstance.post('/api/aws/upload', details, { headers: { 'Content-Type': 'multipart/formdata' } })

//DROPDOWN 
export const categoryDropdownApi = () => axiosInstance.get(`/api/category/get-categories`)
export const menuDropdownApi = () => axiosInstance.get(`api/product/pgroup/get-product-groups`)
export const brandDropdownApi = () => axiosInstance.get(`/api/brand/dropdown`)
export const productDropdownApi = () => axiosInstance.get(`api/product/list`)
export const issueTypeDropdownApi = () => axiosInstance.get(`api/ticket/get-issue/types`)

//CUSTOMER MANAGEMENT
export const customerlistApi = (data: any) => axiosInstance.get(`/api/user/?page=${data?.page}&status=${data?.status ?? ''}&key=${data?.search ?? ''}`)
export const activateDeactivateUserApi = (userId: any, status: any) => axiosInstance.patch(`/api/user/${userId}/${status}`)
export const getCustomerdetailsByIdApi = (data: any) => axiosInstance.get(`/api/user/${data?.id}`)

//STOCK-MANAGEMENT
export const listStockApi = (data: any) => axiosInstance.get(`/api/inventory/get-all-stock/?page=${data?.page}&status=${data?.status}&q=${data?.search}`)
export const getStockByIdApi = (id: string) => axiosInstance.get(`/api/inventory/${id}`)
export const editStockApi = (details: any, id: string) => axiosInstance.put(`/api/inventory/update/${id}`, details)
export const stockHistoryApi = (data: any) => axiosInstance.get(`/api/inventory/get-stock-history/${data?.id}?fromDate=${data?.fromMonth ?? ""}&toDate=${data?.toMonth ?? ''}`)

//OFFERS-COUPONS
export const listCouponApi = (data: any) => axiosInstance.get(`/api/coupon/?page=${data?.page}&isActive=${data?.status}&key=${data?.search}`)
export const addCouponApi = (details: any) => axiosInstance.post('/api/coupon/create', details)
export const getCouponByIdApi = (id: string) => axiosInstance.get(`/api/coupon/${id}`)
export const activateCouponApi = (id: string) => axiosInstance.patch(`/api/coupon/activate/${id}`)
export const deactivateCouponApi = (id: string) => axiosInstance.patch(`/api/coupon/deactivate/${id}`)
export const deleteCouponApi = (id: any) => axiosInstance.delete(`/api/coupon/${id}`)
export const editCouponApi = (details: any, id: string) => axiosInstance.put(`/api/coupon/update/${id}`, details)
export const couponDetailsApi = (data: any) => axiosInstance.get(`/api/coupon/${data?.id}/transactions/?page=${data?.page}`)

//BANNERS
export const listBannerApi = () => axiosInstance.get(`/api/banner/get-all-banners/?getAll=${true}`)
export const getBannerByIdApi = (data: any) => axiosInstance.get(`/api/banner/get-by-id/${data?.id}/?getAll=${true}`)
export const editBannerApi = (details: any, id: string) => axiosInstance.put(`/api/banner/${id}`, details)
export const publishBannerApi = (id: string) => axiosInstance.patch(`/api/banner/${id}/publish`)
export const unPublishBannerApi = (id: string) => axiosInstance.patch(`/api/banner/${id}/unpublish`)

//SETTINGS
export const basicProfileUpdateApi = (details: Updateprofiletype) => axiosInstance.put(`/api/user/admin/update`, details)
export const passwordUpdateApi = (details: Updatepasswordtype) => axiosInstance.put(`/api/user/auth/change-password`, details)
export const getprofileDetailsApi = () => axiosInstance.get(`/api/user/profile`)

//REFERRALS
export const listreferralApi = (data: any) => axiosInstance.get(`/api/referral/?key=${data?.search}`)

//CUSTOMER-SUPPORT
export const listTicketApi = (data: cusotmerTicketsTableAPI) => axiosInstance.get(`/api/ticket?page=${data?.page}&userId=${data?.user_id||''}&status=${data?.status ?? ""}&q=${data?.search ?? ''}&startDate=${data?.fromDate ?? ""}&endDate=${data?.toDate ?? ""}&issueType=${data?.issueType ?? ""}`)
export const getTicketByIdApi = (data: TicketByAPI) => axiosInstance.get(`/api/ticket/${data?.id}`)
export const CloseTicketApi = (details: closeTicketAPI, id: string) => axiosInstance.put(`/api/ticket/close-ticket/${id}`, details);
export const AddcreditAPi = (details: addcreditsForm, id: string) => axiosInstance.post(`/api/wallet/credit-wallet/${id}`, details)
export const ChatByConversationIdApi = (data: ChatByConversationAPI) => axiosInstance.get(`/api/ticket/messages/${data?.id}`)
export const ChatsentMSGApi = (details: SendMsgAPI) => axiosInstance.post(`/api/ticket/message/`, details)

//NOTIFICATIONS
export const listNotificationsApi = () => axiosInstance.get(`/api/notification/`)
export const notificationReadApi = (id: string) => axiosInstance.patch(`/api/notification/${id}/mark-as-read`)

//USERMANAGAMENT
export const listUserApi = (data: any) => axiosInstance.get(`/api/user/admin/users/?page=${data?.page}&key=${data?.search}&status=${data?.status}`)
export const userCreateApi = (details: UserFormType) => axiosInstance.post(`/api/user/admin/create`, details)
export const userStatusChangeApi = (id: string) => axiosInstance.patch(`/api/user/admin/change/status?adminId=${id}`)
export const userDeleteApi = (id: string) => axiosInstance.delete(`/api/user/admin/delete/?adminId=${id}`)

//FIREBASE
export const firebaseUpdateApi = (details: any) => axiosInstance.put(`/api/user/update-fcm-token`, details);
