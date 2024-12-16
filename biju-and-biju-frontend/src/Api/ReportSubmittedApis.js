import * as base from "../Settings";

export const report_submitted = base.BASE_URL + "/api/submittedverification/report-submitted/";
export const report_edit = base.BASE_URL + "/api/verification/repots-edit/";
export const report_confirm = base.BASE_URL + "/api/verification/confirm/";
export const submitted = base.BASE_URL + "/api/submittedverification/submit/";
export const database_list = base.BASE_URL + "/api/verification/database/";
export const database_dwonload = base.BASE_URL + "/api/verification/database-download/";
export const ws_progress_url = base.BASE_URL + "/ws/progress/";
export const database_dwonload_file = base.BASE_URL + "/api/verification/download_file/";
export const vendor_track_dwonload_file = base.BASE_URL + "/api/report/get-vendor-track-file/";

export const excel_report_download = base.BASE_URL + "/api/core/excel_report_download/";
export const report_submitted_excel = base.BASE_URL + "/api/submittedverification/report-submitted-excel-download/";
export const report_edit_excel = base.BASE_URL + "/api/verification/repots-edit-excel-download/";
export const database_list_excel = base.BASE_URL + "/api/verification/database-download-excel-download/";

//REFACTOR API CHANGES
export const v2_report_submitted = base.BASE_URL + "/api/submittedverification/v2/report-submitted/";
export const v2_employees = base.BASE_URL + "/api/verification/v2/employees-filtered/";
export const v2_report_edit = base.BASE_URL + "/api/verification/v2/repots-edit/";
export const v2_database_list = base.BASE_URL + "/api/verification/v2/database/";

