import { useState } from "react";
import DownloadButton from "./DownloadButton";
import axios from "axios";
import { downloadFile } from "../common/utils";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const URLS = {
  AGENT_WISE_PENDING: "/api/report/agent-wise-district/download/",
  AGENT_WISE_USER: "/api/report/agent-wise-user/download/",
  AGENT_WISE_TOTAL_PENDING:
    "/api/assignedverification/assigned-verification/download/", // Not working when filter
  ///
  OFFICE_WISE_PENDING: "/api/report/office-wise-vendor/download/",
  OFFICE_WISE_STAFF: "/api/report/office-wise-staff/download/",
  OFFICE_WISE_TOTAL_PENDING:
    "/api/assignedverification/pending-report-recieved/download/",
  ///
  VENDOR_WISE_PENDING: "/api/report/vendor-wise-pending/download/",
  VENDOR_WISE_DISTRICT: "/api/report/vendor-wise-district/download/",
  VENDOR_WISE_TOTAL_PENDING:
    "/api/assignedverification/pending-report-recieved/download/",
  ///
  BILLABLE: "/api/billable-payable/download/billable/",
  PAYABLE: "/api/billable-payable/download/payable/",
  DIFFERENCE: "/api/billable-payable/download/diffrence/",
  BILLABLE_NOT_PAYABLE: "/api/billable-payable/download/billable-not-payable/",
  PAYABLE_NOT_BILLABLE: "/api/billable-payable/download/payable-not-billable/",
  ///
  ALLOCATION_TAT: "/api/report/tat-report/download/",
  ASSIGN_TAT: "/api/report/assign-district-tat/download/",
  DISTRICT_TAT: "/api/report/district-district-tat/download/",
  FIELD_TAT_DISTRICT: "/api/report/field-district-tat/download/",
  FIELD_TAT_AGENT: "/api/report/field-executive-tat/download/",
  FIELD_TAT_PRODUCT: "/api/report/field-product-tat/download/",
  OFFICE_TAT_DISTRICT: "/api/report/office-district-tat/download/",
  OFFICE_TAT_PRODUCT: "/api/report/office-product-tat/download/",
  TOTAL_TAT_DISTRICT: "/api/report/total-district-tat/download/",
  TOTAL_TAT_PRODUCT: "/api/report/total-product-tat/download/",
  DETAIL_TAT_REPORT: "/api/report/detail-tat-report/download/",
  ///

  PRODUCT: "/api/product/download/",
  HOLIDAY: "/api/holiday/download/",
  MANDATORY: "/api/mandatory/download/",
  USER: "/api/auth/create-user/?download=True",
  USER_SETTINGS: "/api/auth/settings/download/",
  VENDOR: "/api/auth/vendor/download/",

  BILLING_LOCATION: "/api/location/billing-loc/download/",
  DISTRICT: "/api/location/download/district/", /// issue on district filter = kkd
  NEGATIVE_REMARK: "/api/remark/download/negative-remark/",
  VENDOR_PARAMETER: "/api/vendorbillingparameter/download/",
  METER_READING: "/api/meter-reading/download/",

  MOBILE_REQUEST: "/api/auth/mob-request/download/",
  DOWNLOAD_IMAGE: "/api/assignedverification/image/download/",
  TIME_TRACKER: "/api/time-tracker/user/download/",
  TIME_TRACKER_VIEW: "/api/time-tracker/tracker/download/",
  WORKER_TRACKER: "/api/worktracker/download/",
  VERIFICATION_STATUS_LOG: "/api/report/status-log/download/",
  MIS_REPORT: "/api/mis-report/download/",
  PAYOUT_REPORT: "/api/payout-report/payout/download/",
  ADMIN_ROLE: "/api/adminrole/download/",
  ROLE_MANAGEMENT: "/api/auth/settings/download/",

  TAT_REPORT_VISIT: "/api/report/tat-report-visit/download/",
};

export function ExportExcel({ source, params, fileName }) {
  const access = JSON.parse(localStorage.getItem("auth")).access;

  const [isLoading, setIsLoading] = useState(false);

  const download = async () => {
    const url = `${BASE_URL}${URLS[source]}`;

    try {
      setIsLoading(true);
      const result = await axios.get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${access}` },
        params,
      });
      downloadFile(result.data, fileName);
    } catch (err) {
      console.log("Error when downloading");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DownloadButton
      title="Excel"
      handleClick={download}
      isLoading={isLoading}
    />
  );
}
