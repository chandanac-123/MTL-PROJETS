import { axiosInstance } from './baseUrl'

//Authentication Apis
export const loginApiCall = (details) => axiosInstance.post('auth/email-login/', details)
export const requestPasswordLinkApiCall = (details) => axiosInstance.post('auth/forget-password/', details)
export const resetPasswordApiCall = (details) => axiosInstance.post('auth/reset-new-password/', details)
export const logoutApiCall = (details) => axiosInstance.post('auth/logout/', details)
export const changePasswordApiCall = (details) => axiosInstance.post('auth/change-password/', details)
export const generateAccessTokenCall = (details) => axiosInstance.post('auth/token/refresh/', details)
export const checkLinkValidity = ({ id, token }) => axiosInstance.get(`auth/check-token-validity/${id}/${token}`)


// expenses'
export const expenseListGetApiCall = (data) => axiosInstance.get(`finance/expense/list-expense/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&expense_type=${data?.expense_type || ''}`)
export const expenseDetailsGetApiCall = (id) => axiosInstance.get(`finance/expense/get-expense/${id}/`)
export const expenseCreateApiCall = (formData) => axiosInstance.post(`finance/expense/add-expense/`, formData)
export const expenseEditApiCall = ({ id, formData }) => axiosInstance.patch(`finance/expense/edit-expense/${id}/`, formData)
export const expenseDeleteApiCall = (id) => axiosInstance.delete(`finance/expense/delete-expense/${id}/`)
export const expenseDownloadApiCall = (data) => axiosInstance.get(`finance/expense/download-expense/?search=${data?.pagination?.search}&expense_type=${data?.expense_type || ''}`, { responseType: 'blob' })
export const ReceiptDownloadApiCallexpense = (id) => axiosInstance.get(`finance/expense/expense-reciept/${id}/`)

// reports

export const reportsListTarget = (data) => axiosInstance.get(`report/target-amount/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&month=${data?.createdMonth || ""}&year=${data?.createdYear || ""}&order=${data?.sort}`)
export const reportTargetDownloadApiCall = (data) => axiosInstance.get(`report/target-amount-download/?search=${data?.pagination?.search}&month=${data?.createdMonth || ""}&year=${data?.createdYear || ""}&order=${data?.sort}`, { responseType: 'blob' })
export const reportOccupiedVsVacantApiCall = (data) => axiosInstance.get(`report/occupancy/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&is_occupied=${data?.occupancyFilter || ''}&month=${data?.createdMonth || ""}&year=${data?.createdYear || ""}&ordering=${data?.sort}`)
export const reportsListIncome = (data) => axiosInstance.get(`report/transaction/?page=${data?.pagination?.current || 1}&page_size=${data?.pagination?.pageSize || 10}&search=${data?.pagination?.search}&payment_method=${data?.payment_Type || ''}&ordering=${data?.sort}&collected_on__range=${data?.startDate + `${data?.startDate ? "," : ""}` + data?.endDate}`)
export const reportsListExpense = (data) => axiosInstance.get(`report/expense/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&ordering=${data?.sort || ""}&created_at__date__range=${data?.startDate + `${data?.startDate ? "," : ""}` + data?.endDate}&expense_type=${data?.expense_type||''}`)
export const reportOccupencyDownloadApiCall = (data) => axiosInstance.get(`report/occupancy/download/?search=${data?.pagination?.search}&is_occupied=${data?.occupancyFilter || ''}&month=${data?.createdMonth || ""}&year=${data?.createdYear || ""}&ordering=${data?.sort || ""}`, { responseType: 'blob' })
export const reportIncomeDownloadApiCall = (data) => axiosInstance.get(`report/transaction/download/?search=${data?.pagination?.search}&payment_method=${data.payment_Type || ""}&ordering=${data?.sort}&created_at__date__range=${data?.startDate + `${data?.startDate ? "," : ""}` + data?.endDate}`, { responseType: 'blob' })
export const reportExpenseDownloadApiCall = (data) => axiosInstance.get(`report/expense/download/?search=${data?.pagination?.search}&created_at__date__range=${data?.startDate + `${data?.startDate ? "," : ""}` + data?.endDate}&ordering=${data?.sort || ""}&expense_type=${data?.expense_type||''}`, { responseType: 'blob' })


//Dropdown Apis
export const userRole = () => axiosInstance.get(`role/drop-down/`)
export const propertyType = () => axiosInstance.get(`property/dropdown/property-type/`)
export const state_dropdown = () => axiosInstance.get(`property/dropdown/state/`)
export const bank_dropdown = () => axiosInstance.get(`tenant/dropdown/bank/`)
export const property_dropdown = (data) => axiosInstance.get(`property/property/?search=${data?.searchParams}&page_size=${20}`)
export const property_dropdown_rent = (data) => axiosInstance.get(`finance/income/rental-property/?search=${data?.searchParams}&page_size=${20}`)
export const expenseType_dropdown = () => axiosInstance.get(`finance/expense/expense-type/drop-down/`)
export const expenseFileDeleteApiCall = (id) => axiosInstance.delete(`finance/expense/delete-file/${id}/`)
export const building_dropdown = () => axiosInstance.get(`property/building/list/?is_paginate=${false}`)

//User Role Apis
export const userRoleListApiCall = (data) => axiosInstance.get(`role/list-role/?page=${data?.current}&page_size=${data.pageSize}&search=${data.search}`)
export const userRoleCreateApiCall = (details) => axiosInstance.post(`role/add-role/`, details)
export const userRoleGetbyIdApiCall = (id) => axiosInstance.get(`role/get-role/${id}/`)
export const userRoleEditApiCall = ({ id, details }) => axiosInstance.patch(`role/update-role/${id}/`, details)
export const userRoleDeleteApiCall = (id) => axiosInstance.delete(`role/delete-role/${id}/`)

//UserManagement Apis
export const userListApiCall = (data) => axiosInstance.get(`user/list-user/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&groups__id=${data?.filterVal || ''}`,)
export const userCreateApiCall = (details) => axiosInstance.post(`user/add-user/`, details)
export const userGetbyIdApiCall = (id) => axiosInstance.get(`user/get-user/${id}/`)
export const userUpdateApiCall = ({ id, details }) => axiosInstance.patch(`user/update-user/${id}/`, details)
export const userDeleteApiCall = (id) => axiosInstance.delete(`user/delete-user/${id}`)

//User Profile Apis
export const userProfileGetApiCall = (id) => axiosInstance.get(`user/get-profile/`)
export const userProfileUpdateApiCall = (formData) => axiosInstance.patch(`user/update-profile/`, formData)

//Properties 
export const propertyListApiCall = (data) => axiosInstance.get(`property/list-property/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&is_occupied=${data?.occupancyFilter || ''}&created_at__month=${data?.createdMonth || ""}&created_at__year=${data?.createdYear || ""}`)
export const propertyGetbyIdApiCall = (id) => axiosInstance.get(`property/get-property/${id}/`)
export const propertyCreateApiCall = (details) => axiosInstance.post(`property/add-property/`, details)
export const propertyUpdateApiCall = ({ id, formData }) => axiosInstance.patch(`property/update-property/${id}/`, formData)
export const propertyDeleteApiCall = (id) => axiosInstance.delete(`property/delete-property/${id}/`)
export const propertyFileDeleteApiCall = (id) => axiosInstance.delete(`property/delete-file/${id}/`)

// Tenant
export const tenantCreateApiCall = (details) => axiosInstance.post(`tenant/add-tenant/`, details)
export const tenantUpdateApiCall = ({ id, formData }) => axiosInstance.patch(`tenant/update-tenant/${id}/`, formData)
export const tenantDeleteApiCall = (data) => axiosInstance.delete(`tenant/vecate-tenant/${data?.tenantId}/${data?.propId}/`)
export const tenantGetbyIdApiCall = (id) => axiosInstance.get(`tenant/get-tenant/${id}/`)

export const tenantFileDeleteApiCall = (id) => axiosInstance.delete(`tenant/delete-file/${id}/`)
export const tranHistoryGetApiCall = (data) => axiosInstance.get(`finance/income/transaction/?monthly_income__tenant_id=${data?.tenantId}&property_id=${data?.propId}&page=${data?.tableParams?.current}&page_size=${data?.tableParams?.pageSize}`);
export const tranHistoryDownloadApiCall = (data) => axiosInstance.get(`finance/income/download-transaction/?monthly_income__tenant_id=${data?.tenantId}&property_id=${data?.propId}`, { responseType: 'blob' })
export const tenantSettleDueApiCall = (data) => axiosInstance.get(`tenant/settle-due/advance-amount/${data?.propId}/${data?.tenantId}`)
export const tenantSplitDueApiCall = (details) => axiosInstance.post(`tenant/balance-due/`, details)
export const tenantSettleAllDueApiCall = (details) => axiosInstance.post(`tenant/settle-due/split-wise/`, details)

// Investment Income
export const investIncomeListApiCall = (data) => axiosInstance.get(`finance/income/list-investment-income/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&created_at__month=${data?.createdMonth || ""}&created_at__year=${data?.createdYear || ""}`)
export const investIncomeCreateApiCall = (details) => axiosInstance.post(`finance/income/add-investment-income/`, details)
export const investIncomeGetbyIdApiCall = (id) => axiosInstance.get(`finance/income/get-investment-income/${id}/`)
export const investIncomeUpdateApiCall = ({ id, details }) => axiosInstance.patch(`finance/income/update-investment-income/${id}/`, details)
export const investIncomeDeleteApiCall = (id) => axiosInstance.delete(`finance/income/delete-investment-income/${id}`)
export const investIncomeDownloadApiCall = (data) => axiosInstance.get(`finance/income/investment-income/download/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&created_at__month=${data?.createdMonth || ""}&created_at__year=${data?.createdYear || ""}`, { responseType: 'blob' })
export const ReceiptDownloadApiCall = (id) => axiosInstance.get(`finance/income/income-reciept/${id}/`)

//Expense Type
export const expenseTypeListApiCall = (data) => axiosInstance.get(`finance/expense/list-expense-type/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}`)
export const expenseTypeCreateApiCall = (details) => axiosInstance.post(`finance/expense/add-expense-type/`, details)
export const expenseTypeGetbyIdApiCall = (id) => axiosInstance.get(`finance/expense/get-expense-type/${id}/`)
export const expenseTypeUpdateApiCall = ({ id, details }) => axiosInstance.patch(`finance/expense/edit-expense-type/${id}/`, details)
export const expenseTypeDeleteApiCall = (id) => axiosInstance.delete(`finance/expense/delete-expense-type/${id}`)
export const expenseTypeListBuildingApiCall = (data) => axiosInstance.get(`property/single-property/?search=${data?.searchParams}`)

//RentIncome 
export const rentIncomeListApiCall = (data) => axiosInstance.get(`finance/income/monthly-income/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&rent_month=${data?.month || ''}&rent_year=${data?.year || ""}&is_partial_paid=${data?.paid_status || ''}`)
export const rentIncomeDownloadApiCall = (data) => axiosInstance.get(`finance/income/monthly-income/download/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&rent_month=${data?.month ? data?.month + 1 : ''}&is_partial_paid=${data?.paid_status || ''}`, { responseType: 'blob' })
export const rentIncomeGetbyIdApiCall = (id) => axiosInstance.get(`finance/income/monthly-income-transaction/${id}/`)
export const rentPropertyGetbyIdApiCall = (id) => axiosInstance.get(`finance/income/monthly-due/${id}/`)
export const rentIncomeCreateApiCall = (details) => axiosInstance.post(`/finance/income/add-rent-income/`, details)
export const rentTransactionDownloadApiCall = (data) => axiosInstance.get(`finance/income/download-transaction/?monthly_income__tenant_id=${data?.tenent_id}&property_id=${data?.property_id}&rent_month=${data?.rent_month || ''}&rent_year=${data?.rent_year || ''}`, { responseType: 'blob' })
export const rentIncomeUpdateApiCall = ({ id, details }) => axiosInstance.patch(`finance/income/edit-rent-income/${id}/`, details)
export const rentIncomeDeleteApiCall = (id) => axiosInstance.delete(`finance/income/delete-rent-income/${id}`)

//Dashboard
export const dashboardApiCall = (data) => axiosInstance.get(`report/dashboard/`)

//Notification
export const notificationListApiCall = (data) => axiosInstance.get(`notification/notification/?type=${data?.type || ''}`)
export const notificationGetbyIdApiCall = (id) => axiosInstance.get(`notification/notification/${id}`)
export const notificationDeleteApiCall = (id) => axiosInstance.delete(`notification/notification/${id}`)

//Balance Sheet
export const balanceSheetListApiCall = (data) => axiosInstance.get(`report/balance-report/?is_print=${data?.is_print || false}&page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search}&year=${data?.createdYear || ''}&month=${data?.createdMonth || ''}`)
export const balanceSheetGetbyIdApiCall = ({ id, data }) => axiosInstance.get(`report/balance-report/${id}/?month=${data?.month || ''}&year=${data?.date || data?.month ? new Date().getFullYear() : ""}`)
export const balanceSheetDownloadApiCall = (data) => axiosInstance.get(`report/balance-report-download/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&year=${data?.createdYear || ''}&month=${data?.createdMonth || ''}`, { responseType: 'blob' })

//Building Listing
export const buildingListApiCall = (data) => axiosInstance.get(`property/building/list/?page=${data?.current}&page_size=${data?.pageSize}&search=${data?.search}`)
export const buildingCreateApiCall = (details) => axiosInstance.post(`property/building/`, details)
export const buildingeleteApiCall = (id) => axiosInstance.delete(`property/building/${id}/`)
export const buildingUpdateApiCall = ({ id, details }) => axiosInstance.patch(`property/building/${id}/`, details)
export const targetListApiCall = (data) => axiosInstance.get(`report/building-target/?page=${data?.current}&page_size=${data?.pageSize}&search=${data?.search}`)
export const targetUpdateApiCall = (details) => axiosInstance.post(`property/target/`, details)
export const targetDeleteApiCall = (id) => axiosInstance.delete(`property/target/${id}/`)
export const buildingGetbyIdApiCall = ({ id, data }) => axiosInstance.get(`property/building/${id}/`)

// Rent To Be Collected
export const rentCollectedListApiCall = (data) => axiosInstance.get(`finance/income/rent-to-collect/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&rent_month=${data?.month || ''}&rent_year=${data?.year || ""}`)

//AdvanceIncome 
export const advanceIncomeListApiCall = (data) => axiosInstance.get(`finance/income/advance-income/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&is_partial_paid=${data?.paid_status || ''}`)
export const advanceIncomeGetbyIdApiCall = (id) => axiosInstance.get(`finance/income/advance-income/${id}/`)
export const advanceIncomeCreateApiCall = (details) => axiosInstance.post(`finance/income/advance/`, details)
export const advancePropertyListApiCall = (data) => axiosInstance.get(`finance/income/advance-property/?search=${data?.searchParams || ''}&page_size=${20}`)
export const advancePropertyByIdApiCall = (id) => axiosInstance.get(`finance/income/advance-property/${id}`)
export const advanceIncomeUpdateApiCall = ({ id, details }) => axiosInstance.patch(`finance/income/advance/${id}/`, details)
export const advanceIncomeDeleteApiCall = (id) => axiosInstance.delete(`finance/income/advance/${id}`)
export const advanceIncomeDownloadApiCall = (data) => axiosInstance.get(`finance/income/advance-income/download/?page=${data?.pagination?.current}&page_size=${data?.pagination?.pageSize}&search=${data?.pagination?.search || ''}&is_partial_paid=${data?.paid_status || ''}`, { responseType: 'blob' })
export const advanceHistoryDownloadApiCall = (data) => axiosInstance.get(`finance/income/download-transaction/?tenant_advance=${data?.id || ''}&income_type=${'advance_income'}`, { responseType: 'blob' })
