import { useEffect } from "react";
import store from "../Store/store";
import * as XLSX from "xlsx";
import { menus } from "../Routes/routes";
import CryptoJS from "crypto-js";
import * as base from "../Settings";

export function Page(props) {
  useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);
  return props.children;
}

export function isActive(pathname) {
  let initial_active = "dashboard";
  let is_close = "";
  if (
    pathname.includes("/dashboard/agentwise-pending-district") ||
    pathname.includes("/dashboard/agentwise-pending-assigned-verification")
  ) {
    pathname = "/dashboard/agentwise-pending-district";
  }
  if (
    pathname.includes("/dashboard/officewise-pending/single") ||
    pathname.includes("/dashboard/officewise-pending/details")
  ) {
    pathname = "/dashboard/officewise-pending-reports";
  }
  if (
    pathname.includes("/dashboard/vendorwise-pending/single/") ||
    pathname.includes("/dashboard/vendorwise-pending/details")
  ) {
    pathname = "/dashboard/vendorwise-pending-reports/";
  }
  if (pathname === "" || pathname === "/dashboard") {
    initial_active = "dashboard";
  } else if (pathname === "/dashboard/verification") {
    initial_active = "verification";
    is_close = "verification";
  } else if (pathname === "/dashboard/assigned-verification") {
    initial_active = "assigned verification";
    is_close = "verification";
  } else if (pathname === "/dashboard/reports-recieved") {
    initial_active = "report received";
    is_close = "verification";
  } else if (pathname === "/dashboard/reports-submitted") {
    initial_active = "report submitted";
    is_close = "verification";
  } else if (pathname === "/dashboard/reports-edit") {
    initial_active = "report edit";
    is_close = "verification";
  } else if (pathname === "/dashboard/reports-confirm") {
    initial_active = "report confirm";
    is_close = "verification";
  } else if (pathname === "/dashboard/database") {
    initial_active = "database";
    is_close = "verification";
  } else if (pathname === "/dashboard/add-product") {
    initial_active = "add product";
    is_close = "admin";
  } else if (pathname === "/dashboard/add-holidays") {
    initial_active = "add holidays";
    is_close = "admin";
  } else if (pathname === "/dashboard/add-mandatory") {
    initial_active = "add mandatory";
    is_close = "admin";
  } else if (pathname === "/dashboard/vendor-specific-fields") {
    initial_active = "vendor specific fields";
    is_close = "admin";
  } else if (pathname === "/dashboard/add-user") {
    initial_active = "user";
    is_close = "admin";
  } else if (pathname === "/dashboard/add-user") {
    initial_active = "add user";
    is_close = "admin";
  } else if (pathname === "/dashboard/user-settings") {
    initial_active = "user settings";
    is_close = "admin";
  } else if (pathname === "/dashboard/add-vendor") {
    initial_active = "add vendor";
    is_close = "admin";
  } else if (pathname === "/dashboard/billing-location") {
    initial_active = "billing location";
    is_close = "admin";
  } else if (pathname === "/dashboard/districts") {
    initial_active = "district";
    is_close = "admin";
  } else if (pathname === "/dashboard/negative-remarks") {
    initial_active = "negative remarks";
    is_close = "admin";
  } else if (pathname === "/dashboard/vendor-billing-parameter") {
    initial_active = "vendor billing parameter";
  } else if (pathname === "/dashboard/meter-reading") {
    initial_active = "meter reading";
  } else if (pathname === "/dashboard/mobile-request") {
    initial_active = "usermobile";
  } else if (pathname === "/dashboard/download-image") {
    initial_active = "download image";
  } else if (pathname === "/dashboard/verification-status-log") {
    initial_active = "verification status & log";
    is_close = "reports";
  } else if (pathname === "/dashboard/MIS-reports") {
    initial_active = "MIS reports";
    is_close = "reports";
  } else if (pathname === "/dashboard/payout-reports") {
    initial_active = "payout reports";
    is_close = "reports";
  } else if (
    pathname === "/dashboard/tat-reports" ||
    pathname === "/dashboard/tat-details"
  ) {
    initial_active = "TAT reports";
    is_close = "reports";
  } else if (pathname === "/dashboard/vendor-track-reports") {
    initial_active = "vendor track reports";
    is_close = "reports";
  } else if (pathname === "/dashboard/tat-report-visit") {
    initial_active = "TAT reports visit";
    is_close = "reports";
  } else if (pathname === "/dashboard/billable-payable-reports") {
    initial_active = "billable/payable";
    is_close = "reports";
  } else if (
    pathname === "/dashboard/agentwise-pending-reports" ||
    pathname === "/dashboard/agentwise-pending-district" ||
    pathname === "/dashboard/agentwise-pending-assigned-verification"
  ) {
    initial_active = "agentwise pending";
    is_close = "reports";
  } else if (
    pathname === "/dashboard/officewise-pending-reports" ||
    pathname === "/dashboard/officewise-pending/single" ||
    pathname === "/dashboard/officewise-pending/details"
  ) {
    initial_active = "officewise pending";
    is_close = "reports";
  } else if (
    pathname === "/dashboard/vendorwise-pending-reports/" ||
    pathname === "/dashboard/vendorwise-pending/single/" ||
    pathname === "/dashboard/vendorwise-pending/details"
  ) {
    initial_active = "vendorwise pending";
    is_close = "reports";
  } else if (pathname === "/dashboard/role-management") {
    initial_active = "role management";
  } else if (
    pathname === "/dashboard/time-tracker" ||
    pathname === "/dashboard/time-tracker-view"
  ) {
    initial_active = "time tracker";
  } else if (pathname === "/dashboard/worker-tracker") {
    initial_active = "worker tracker";
  } else if (pathname === "/dashboard/admin-management") {
    initial_active = "admin management";
  } else if (pathname === "/dashboard/view") {
    initial_active = "view";
  }
  return [initial_active, is_close];
}

// this function is used for getting values from URL
// export function get_values_from_url(search) {
//   const params = new Proxy(new URLSearchParams(search), {
//     get: (searchParams, prop) => searchParams.get(prop),
//   });
//   return params;
// }

export function get_values_from_url() {
  const queryParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash);
  const params = {};
  queryParams.forEach((value, key) => {
    params[key] = value;
  });
  hashParams.forEach((value, key) => {
    if (key.startsWith("#")) {
      params.name = key;
    } else {
      params[key] = value;
    }
  });
  return params;
}

// feb 3-2023 formate
export function get_formatted_date(date_obj) {
  let date = new Date(date_obj);
  let day = date.toLocaleString("en-us", { weekday: "long" });
  let date_no = date.getDate();
  let month = date.toLocaleString("en-us", { month: "long" });
  let result = String(day + "," + " " + String(date_no) + " " + month);
  return result;
}

export function get_name_by_id(datas, id) {
  let name = "";
  if (datas.length) {
    name = datas.filter((i) => i.id === id)[0].name;
  }
  return name;
}

// YYYY/MM/DD Format
export function convert_date_format(objectDate) {
  objectDate = new Date(objectDate);
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  let format = year + "-" + month + "-" + day;
  // let format = day + "/" + month + "/" + year;
  return format;
}

//DD/MM/YYYYY Format
export function extract_date(date) {
  const dateTimeString = date;
  const dateTime = new Date(dateTimeString);

  const day = String(dateTime.getDate()).padStart(2, "0");
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const year = String(dateTime.getFullYear());

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

// feb 3-2023 formate
export function get_formatted_date_with_year(date_obj) {
  let date = new Date(date_obj);
  let day = date.getFullYear();
  let date_no = date.getDate();
  let month = date.toLocaleString("en-us", { month: "long" });
  let result = String(month + " " + String(date_no) + "," + " " + day);
  return result;
}

// YYYY/MM/DD TO DD/MM/YYYY
export function date_conversion(date_obj) {
  const dateStr = date_obj;
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-GB"); // Format as "dd/MM/yyyy"
  return formattedDate;
}

// export function convert_file_webp(file) {
//   let new_file = im.convert([file.path, '-quality', '75', 'output.webp'], function(err) {
//     if (err) throw err;
//     console.log('File converted to WebP!');
//   });
//   console.log("new_file");
//   console.log(new_file);
//   console.log(typeof new_file);
//   return "";
// }

export function exportToExcel(data, fileName) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  XLSX.writeFile(wb, `${fileName}.csv`);
  return "";
}

// 01:12:24
export function get_time_from_date(date_obj, type = "24HR") {
  const date = new Date(date_obj);
  let result = date.toTimeString();
  let time = result.split(" ")[0];
  if (type === "12HR") {
    formatTo12Hour(time);
  }
  return time;
}

// 03/02/2023 01:05:00 formate
export function timeDate(dateTimeString) {
  var dateTime = new Date(dateTimeString);
  var date = dateTime.toLocaleDateString();
  let formated_date = extract_date(date);
  if (formated_date !== "NaN/NaN/NaN") {
    date = formated_date;
  }
  var time = dateTime.toLocaleTimeString();
  return date + " " + time;
}

// 03/02/2023 21:05:00 24 hours formate date
export function timeDate24Hours(dateTimeString) {
  var dateTime = new Date(dateTimeString);
  var date = extract_date(dateTime);
  var time = get_time_from_date(dateTimeString);
  return date + " " + time;
}

// 12:12 ---HH:MM
export function timeFun(dateTimeString) {
  if (/\d{2}:\d{2}$/.test(dateTimeString)) return dateTimeString;
  let dateTime = new Date(dateTimeString);
  console.log(dateTimeString);
  console.log(dateTime);
  let date = dateTime.getHours();
  let time = dateTime.getMinutes();
  return `${date}:${time}`;
}

export function GetPermission(name, type = "view") {
  let permission = false;
  const permissions = store.getState()?.auth?.permissions;
  try {
    let actions = permissions.filter((i) => i?.menu === name)[0]?.actions;
    if (type === "view") {
      permission = actions?.view;
    } else if (type === "change") {
      permission = actions?.change;
    }
  } catch (error) {
    console.log(error, "error");
  }
  // if(name === "admin_management"){
  //   permission = true
  // }
  return permission;
}

export const CheckNavigationPermission = () => {
  let path = menus.filter((m) => m.view === true)[0]?.path;
  if (!path) {
    path = "/dashboard";
  }
  return path;
};

export const GetDecryptedPaswd = (encrypted_password) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const secretKey = auth.key;
  if (encrypted_password && secretKey) {
    const cipherText = CryptoJS.enc.Base64.parse(encrypted_password);
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, key, {
      mode: CryptoJS.mode.ECB,
    });
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedString;
  } else {
    return "";
  }
};

export const GetMenus = (user_type) => {
  let menus = [];

  if (user_type == "GroupLeader" || user_type == "TeamMember") {
    menus = [
      {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard"),
      },
      {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        is_main: true,
        close: ["report submitted", "verification"],
        children: [
          {
            primary: "Assigned Verification",
            secondary: "",
            name: "assigned verification",
            path: "/dashboard/assigned-verification",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("assignedverification"),
          },
          {
            primary: "Report Received",
            secondary: "",
            name: "report received",
            path: "/dashboard/reports-recieved",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("report_recieved"),
          },
          {
            primary: "Report Submitted",
            secondary: "",
            name: "report submitted",
            path: "/dashboard/reports-submitted",
            role: ["Admin"],
            close: ["report submitted"],
            children: [
              {
                primary: "Report Edit",
                secondary: "",
                name: "report edit",
                path: "/dashboard/reports-edit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_edit"),
              },
              {
                primary: "Reports Confirm",
                secondary: "",
                name: "report confirm",
                path: "/dashboard/reports-confirm",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_confirm"),
              },
              {
                primary: "Database",
                secondary: "",
                name: "database",
                path: "/dashboard/database",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("database"),
              },
            ],
            view: GetPermission("report_submitted"),
          },
        ],
        view: GetPermission("verification"),
      },
      {
        primary: "User",
        secondary: "",
        name: "user",
        path: "/dashboard/add-user",
        activeIcon: require("../Assets/images/Vectoruserlogo.png"),
        inctiveIcon: require("../Assets/images/admin.png"),
        is_main: true,
        role: ["Admin"],
        close: ["user"],
        children: [
          {
            primary: "User Settings",
            secondary: "",
            name: "user settings",
            path: "/dashboard/user-settings",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("user_settings"),
          },
        ],
        view: GetPermission("user"),
      },
      {
        primary: "TAT Reports",
        secondary: "",
        name: "TAT reports",
        path: "/dashboard/tat-reports",
        activeIcon: require("../Assets/images/inactive_report.png"),
        inctiveIcon: require("../Assets/images/reports.png"),
        role: ["Admin"],
        close: ["TAT reports"],
        children: [
          {
            primary: "TAT Reports Visit",
            secondary: "",
            name: "TAT reports visit",
            path: "/dashboard/tat-report-visit",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("tat_reports_visit"),
          },
        ],
        view: GetPermission("tat_reports"),
      },
    ];
  } else if (user_type == "ProductCoordinator") {
    menus = [
      {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard"),
      },
      {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        is_main: true,
        close: ["report submitted", "verification"],
        children: [
          {
            primary: "Assigned Verification",
            secondary: "",
            name: "assigned verification",
            path: "/dashboard/assigned-verification",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("assignedverification"),
          },
          {
            primary: "Report Received",
            secondary: "",
            name: "report received",
            path: "/dashboard/reports-recieved",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("report_recieved"),
          },
          {
            primary: "Report Submitted",
            secondary: "",
            name: "report submitted",
            path: "/dashboard/reports-submitted",
            role: ["Admin"],
            close: ["report submitted"],
            children: [
              {
                primary: "Report Edit",
                secondary: "",
                name: "report edit",
                path: "/dashboard/reports-edit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_edit"),
              },
              {
                primary: "Reports Confirm",
                secondary: "",
                name: "report confirm",
                path: "/dashboard/reports-confirm",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_confirm"),
              },
              {
                primary: "Database",
                secondary: "",
                name: "database",
                path: "/dashboard/database",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("database"),
              },
            ],
            view: GetPermission("report_submitted"),
          },
        ],
        view: GetPermission("verification"),
      },

      {
        primary: "User",
        secondary: "",
        name: "user",
        path: "/dashboard/add-user",
        activeIcon: require("../Assets/images/Vectoruserlogo.png"),
        inctiveIcon: require("../Assets/images/admin.png"),
        is_main: true,
        role: ["Admin"],
        close: ["user"],
        children: [
          {
            primary: "User Settings",
            secondary: "",
            name: "user settings",
            path: "/dashboard/user-settings",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("user_settings"),
          },
        ],
        view: GetPermission("user"),
      },

      {
        primary: "Reports",
        secondary: "",
        name: "reports",
        path: "/dashboard/verification-status-log",
        role: ["Admin"],
        activeIcon: require("../Assets/images/reports.png"),
        inctiveIcon: require("../Assets/images/reports.png"),
        is_main: true,
        close: ["TAT reports", "reports"],
        children: [
          {
            primary: "Verification",
            secondary: "Status & Log",
            name: "verification status & log",
            path: "/dashboard/verification-status-log",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("verification_status_log"),
          },
          {
            primary: "TAT Reports",
            secondary: "",
            name: "TAT reports",
            path: "/dashboard/tat-reports",
            activeIcon: require("../Assets/images/inactive_report.png"),
            inctiveIcon: require("../Assets/images/reports.png"),
            role: ["Admin"],
            close: ["TAT reports"],
            children: [
              {
                primary: "TAT Reports Visit",
                secondary: "",
                name: "TAT reports visit",
                path: "/dashboard/tat-report-visit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("tat_reports_visit"),
              },
            ],
            view: GetPermission("tat_reports"),
          },
        ],
        view: GetPermission("report"),
      },
    ];
  } else if (user_type == "ExecutiveOfficeAdmin") {
    menus = [
      {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard"),
      },
      {
        primary: "Database",
        secondary: "",
        name: "database",
        path: "/dashboard/database",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        close: [],
        is_main: true,
        children: [],
        view: GetPermission("database"),
      },
      {
        primary: "Vendor Billing",
        secondary: "Parameter",
        name: "vendor billing parameter",
        path: "/dashboard/vendor-billing-parameter",
        role: ["Admin"],
        activeIcon: require("../Assets/images/vendor_bill_active.png"),
        inctiveIcon: require("../Assets/images/vendor_billing.png"),
        is_main: false,
        close: [],
        children: [],
        multi_line: true,
        view: GetPermission("vendor_billing"),
      },
      {
        primary: "Reports",
        secondary: "",
        name: "reports",
        path: "/dashboard/payout-reports",
        role: ["Admin"],
        activeIcon: require("../Assets/images/reports.png"),
        inctiveIcon: require("../Assets/images/reports.png"),
        is_main: true,
        close: ["TAT reports", "reports"],
        children: [
          {
            primary: "Payout Reports",
            secondary: "",
            name: "payout reports",
            path: "/dashboard/payout-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("payout_reports"),
          },
          {
            primary: "MIS Reports",
            secondary: "",
            name: "MIS reports",
            path: "/dashboard/MIS-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("mis_reports"),
          },
          {
            primary: "TAT Reports",
            secondary: "",
            name: "TAT reports",
            path: "/dashboard/tat-reports",
            role: ["Admin"],
            close: ["TAT reports"],
            children: [
              {
                primary: "TAT Reports Visit",
                secondary: "",
                name: "TAT reports visit",
                path: "/dashboard/tat-report-visit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("tat_reports_visit"),
              },
            ],
            view: GetPermission("tat_reports"),
          },
        ],
        view: GetPermission("report"),
      },
    ];
  } else if (user_type == "Vendor") {
    menus = [
      {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        is_main: true,
        close: ["report submitted", "verification"],
        children: [
          {
            primary: "Assigned Verification",
            secondary: "",
            name: "assigned verification",
            path: "/dashboard/assigned-verification",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("assignedverification"),
          },
          {
            primary: "Report Received",
            secondary: "",
            name: "report received",
            path: "/dashboard/reports-recieved",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("report_recieved"),
          },
        ],
        view: GetPermission("verification"),
      },
      {
        primary: "View",
        secondary: "",
        name: "view",
        path: "/dashboard/view",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("vendor_view"),
      },
    ];
  } else if (user_type == "DistrictCoordinator") {
    menus = [
      {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard"),
      },
      {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        is_main: true,
        close: ["report submitted", "verification"],
        children: [
          {
            primary: "Assigned Verification",
            secondary: "",
            name: "assigned verification",
            path: "/dashboard/assigned-verification",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("assignedverification"),
          },
          {
            primary: "Report Received",
            secondary: "",
            name: "report received",
            path: "/dashboard/reports-recieved",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("report_recieved"),
          },
        ],
        view: GetPermission("verification"),
      },
      {
        primary: "TAT Reports",
        secondary: "",
        name: "TAT reports",
        path: "/dashboard/tat-reports",
        activeIcon: require("../Assets/images/inactive_report.png"),
        inctiveIcon: require("../Assets/images/reports.png"),
        role: ["Admin"],
        close: ["TAT reports"],
        children: [
          {
            primary: "TAT Reports Visit",
            secondary: "",
            name: "TAT reports visit",
            path: "/dashboard/tat-report-visit",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("tat_reports_visit"),
          },
        ],
        view: GetPermission("tat_reports"),
      },
      {
        primary: "Mobile Request",
        secondary: "",
        name: "usermobile",
        path: "/dashboard/mobile-request",
        role: ["Admin"],
        activeIcon: require("../Assets/images/mobile_active.png"),
        inctiveIcon: require("../Assets/images/mobile_request.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("usermobile"),
      },
    ];
  } else if (user_type == "Admin" || user_type == "SubAdmin") {
    menus = [
      {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ["Admin"],
        activeIcon: require("../Assets/images/dashicon.png"),
        inctiveIcon: require("../Assets/images/inactivedashIcon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard"),
      },
      {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ["Admin"],
        activeIcon: require("../Assets/images/activeVeifyIcon.png"),
        inctiveIcon: require("../Assets/images/veriflogo.png"),
        is_main: true,
        close: ["report submitted", "verification"],
        children: [
          {
            primary: "Assigned Verification",
            secondary: "",
            name: "assigned verification",
            path: "/dashboard/assigned-verification",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("assignedverification"),
          },
          {
            primary: "Report Received",
            secondary: "",
            name: "report received",
            path: "/dashboard/reports-recieved",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("report_recieved"),
          },
          {
            primary: "Report Submitted",
            secondary: "",
            name: "report submitted",
            path: "/dashboard/reports-submitted",
            role: ["Admin"],
            close: ["report submitted"],
            children: [
              {
                primary: "Report Edit",
                secondary: "",
                name: "report edit",
                path: "/dashboard/reports-edit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_edit"),
              },
              {
                primary: "Reports Confirm",
                secondary: "",
                name: "report confirm",
                path: "/dashboard/reports-confirm",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("reports_confirm"),
              },
              {
                primary: "Database",
                secondary: "",
                name: "database",
                path: "/dashboard/database",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("database"),
              },
            ],
            view: GetPermission("report_submitted"),
          },
        ],
        view: GetPermission("verification"),
      },
      {
        primary: "Admin",
        secondary: "",
        name: "admin",
        path: "/dashboard/add-product",
        role: ["Admin"],
        activeIcon: require("../Assets/images/admin.png"),
        inctiveIcon: require("../Assets/images/admin.png"),
        is_main: true,
        close: ["admin", "add mandatory", "user", "setting"],
        children: [
          {
            primary: "Add Product",
            secondary: "",
            name: "add product",
            path: "/dashboard/add-product",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("product"),
          },
          {
            primary: "Add Holidays",
            secondary: "",
            name: "add holidays",
            path: "/dashboard/add-holidays",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("holiday"),
          },
          {
            primary: "Add Mandatory",
            secondary: "",
            name: "add mandatory",
            path: "/dashboard/add-mandatory",
            role: ["Admin"],
            close: ["add mandatory"],
            children: [
              {
                primary: "Vendor Specific Fields",
                secondary: "",
                name: "vendor specific fields",
                path: "/dashboard/vendor-specific-fields",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("vendormandatoryfield"),
              },
            ],
            view: GetPermission("mandatory"),
          },
          {
            primary: "User",
            secondary: "",
            name: "user",
            path: "/dashboard/add-user",
            role: ["Admin"],
            close: ["user"],
            children: [
              {
                primary: "Add User",
                secondary: "",
                name: "add user",
                path: "/dashboard/add-user",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("add_user"),
              },
              {
                primary: "User Settings",
                secondary: "",
                name: "user settings",
                path: "/dashboard/user-settings",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("user_settings"),
              },
              {
                primary: "Add Vendor",
                secondary: "",
                name: "add vendor",
                path: "/dashboard/add-vendor",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("add_vendor"),
              },
            ],
            view: GetPermission("user"),
          },
          {
            primary: "Setting",
            secondary: "",
            name: "setting",
            path: "/dashboard/billing-location",
            role: ["Admin"],
            close: ["setting"],
            children: [
              {
                primary: "Billing Location",
                secondary: "",
                name: "billing location",
                path: "/dashboard/billing-location",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("billinglocation"),
              },
              {
                primary: "District",
                secondary: "",
                name: "district",
                path: "/dashboard/districts",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("district"),
              },
              {
                primary: "Negative Remarks",
                secondary: "",
                name: "negative remarks",
                path: "/dashboard/negative-remarks",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("negativeremarks"),
              },
            ],
            view: GetPermission("settings"),
          },
        ],
        view: GetPermission("admin"),
      },
      {
        primary: "Vendor Billing",
        secondary: "Parameter",
        name: "vendor billing parameter",
        path: "/dashboard/vendor-billing-parameter",
        role: ["Admin"],
        activeIcon: require("../Assets/images/vendor_bill_active.png"),
        inctiveIcon: require("../Assets/images/vendor_billing.png"),
        is_main: false,
        close: [],
        children: [],
        multi_line: true,
        view: GetPermission("vendor_billing"),
      },
      {
        primary: "Meter Reading",
        secondary: "",
        name: "meter reading",
        path: "/dashboard/meter-reading",
        role: ["Admin"],
        activeIcon: require("../Assets/images/meterActive.png"),
        inctiveIcon: require("../Assets/images/meter_reading.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("meter_reading"),
      },
      {
        primary: "Mobile Request",
        secondary: "",
        name: "usermobile",
        path: "/dashboard/mobile-request",
        role: ["Admin"],
        activeIcon: require("../Assets/images/mobile_active.png"),
        inctiveIcon: require("../Assets/images/mobile_request.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("usermobile"),
      },
      {
        primary: "Download Image",
        secondary: "",
        name: "download image",
        path: "/dashboard/download-image",
        role: ["Admin"],
        activeIcon: require("../Assets/images/download_active.png"),
        inctiveIcon: require("../Assets/images/download_img.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("download_image"),
      },
      {
        primary: "Time Tracker",
        secondary: "",
        name: "time tracker",
        path: "/dashboard/time-tracker",
        role: ["Admin"],
        activeIcon: require("../Assets/images/time_track_active.png"),
        inctiveIcon: require("../Assets/images/time_track_icon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("time_tracker"),
      },
      {
        primary: "Worker Tracker",
        secondary: "",
        name: "worker tracker",
        path: "/dashboard/worker-tracker",
        role: ["Admin"],
        activeIcon: require("../Assets/images/work_tracker_icon_active.png"),
        inctiveIcon: require("../Assets/images/work_tracker_icon.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("worker_tracker"),
      },
      {
        primary: "Reports",
        secondary: "",
        name: "reports",
        path: "/dashboard/verification-status-log",
        role: ["Admin"],
        activeIcon: require("../Assets/images/reports.png"),
        inctiveIcon: require("../Assets/images/reports.png"),
        is_main: true,
        close: ["TAT reports", "reports"],
        children: [
          {
            primary: "Verification",
            secondary: "Status & Log",
            name: "verification status & log",
            path: "/dashboard/verification-status-log",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("verification_status_log"),
          },
          {
            primary: "MIS Reports",
            secondary: "",
            name: "MIS reports",
            path: "/dashboard/MIS-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("mis_reports"),
          },
          {
            primary: "Payout Reports",
            secondary: "",
            name: "payout reports",
            path: "/dashboard/payout-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("payout_reports"),
          },
          {
            primary: "TAT Reports",
            secondary: "",
            name: "TAT reports",
            path: "/dashboard/tat-reports",
            role: ["Admin"],
            close: ["TAT reports"],
            children: [
              {
                primary: "TAT Reports Visit",
                secondary: "",
                name: "TAT reports visit",
                path: "/dashboard/tat-report-visit",
                role: ["Admin"],
                close: [],
                children: [],
                view: GetPermission("tat_reports_visit"),
              },
            ],
            view: GetPermission("tat_reports"),
          },
          {
            primary: "Vendor Track",
            secondary: "Reports",
            name: "vendor track reports",
            path: "/dashboard/vendor-track-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("vendor_track_reports"),
          },
          {
            primary: "Billable/Payable",
            secondary: "",
            name: "billable/payable",
            path: "/dashboard/billable-payable-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("billable_payable"),
          },
          {
            primary: "Agent Wise",
            secondary: "Pending",
            name: "agentwise pending",
            path: "/dashboard/agentwise-pending-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("agent_wise_pending"),
          },
          {
            primary: "Office Wise",
            secondary: "Pending",
            name: "officewise pending",
            path: "/dashboard/officewise-pending-reports",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("office_wise_pending"),
          },
          {
            primary: "Vendor Wise",
            secondary: "Pending",
            name: "vendorwise pending",
            path: "/dashboard/vendorwise-pending-reports/",
            role: ["Admin"],
            close: [],
            children: [],
            view: GetPermission("vendor_wise_pending"),
          },
        ],
        view: GetPermission("report"),
      },
      {
        primary: "Role Management",
        secondary: "",
        name: "role management",
        path: "/dashboard/role-management",
        role: ["Admin"],
        activeIcon: require("../Assets/images/role_management_active.png"),
        inctiveIcon: require("../Assets/images/role_management.png"),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("role_management"),
      },
      {
        primary: "Admin",
        secondary: "Management",
        name: "admin management",
        path: "/dashboard/admin-management",
        role: ["Admin"],
        activeIcon: require("../Assets/images/admin_manage_active.png"),
        inctiveIcon: require("../Assets/images/admin_manage_icon.png"),
        is_main: false,
        close: [],
        children: [],
        multi_line: true,
        view: GetPermission("admin_management"),
      },
    ];
  }
  return menus;
};

export const GetImageUrl = (url) => {
  let result_url = "";
  if (url) {
    const baseUrl = base.BASE_URL;
    result_url = baseUrl + url;
  }
  return result_url;
};

export const GetDatas = (user_type) => {
  let datas = [];

  if (user_type == "GroupLeader") {
    datas = [
      {
        name: "",
        label: "All",
      },
      {
        name: "product_coordinator_role",
        label: "Product Coordinator",
      },
      {
        name: "team_member_role",
        label: "Team Member",
      },
      {
        name: "district_coordinator_role",
        label: "District Coordinator",
      },
      {
        name: "executive_admin",
        label: "Executive Admin",
      },
    ];
  }

  if (user_type == "ProductCoordinator") {
    datas = [
      {
        name: "",
        label: "All",
      },
      {
        name: "team_member_role",
        label: "Team Member",
      },
      {
        name: "district_coordinator_role",
        label: "District Coordinator",
      },
      {
        name: "executive_admin",
        label: "Executive Admin",
      },
    ];
  }

  if (user_type == "Admin") {
    datas = [
      {
        name: "",
        label: "All",
      },
      {
        name: "group_leader_role",
        label: "Group Leader",
      },
      {
        name: "product_coordinator_role",
        label: "Product Coordinator",
      },
      {
        name: "team_member_role",
        label: "Team Member",
      },
      {
        name: "district_coordinator_role",
        label: "District Coordinator",
      },
      {
        name: "executive_admin",
        label: "Executive Admin",
      },
    ];
  }

  return datas;
};

export function get_param_url(key) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get(key);
  return value;
}

export function getDate_from_datetime(dateString) {
  // const dateString = "2023-05-22T17:24:07.820778+05:30";
  let timeString = "N/A";
  if (dateString) {
    const date = new Date(dateString);
    timeString = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return timeString;
}

export function findTimeDifference(starting, ending) {
  let result = "N/A";
  if (starting != "N/A" && ending != "N/A") {
    // Convert starting and ending times to Date objects
    const startDate = new Date(`2000-01-01 ${starting}`);
    const endDate = new Date(`2000-01-01 ${ending}`);

    // Calculate the difference in milliseconds
    const durationInMillis = endDate.getTime() - startDate.getTime();

    // Calculate the duration in hours and minutes
    const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMillis / (1000 * 60)) % 60);

    // Format the result as "Xhr Ymin" format
    result = `${hours}hr ${minutes}min`;
  }

  return result;
}

export function formatTo12Hour(timeString) {
  const [hours, minutes] = timeString.split(":");
  let period = "am";

  let formattedHours = parseInt(hours);
  if (formattedHours >= 12) {
    period = "pm";
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  return `${formattedHours}:${minutes} ${period}`;
}

function formatDuration(duration) {
  const hours = duration.getUTCHours().toString().padStart(2, "0");
  const minutes = duration.getUTCMinutes().toString().padStart(2, "0");
  const seconds = duration.getUTCSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// export function calculateDuration(timestamps) {
//   const durations = [];
//   for (let i = 0; i < timestamps.length - 1; i++) {
//     const start = new Date(`2023-06-08T${timestamps[i]}`);
//     const end = new Date(`2023-06-08T${timestamps[i + 1]}`);
//     const duration = new Date(end - start);
//     durations.push(formatDuration(duration));
//   }
//   return durations;
// }

export function calculateDuration(timestamps) {
  const durations = [];
  for (let i = 0; i < timestamps.length - 1; i++) {
    const start = new Date(timestamps[i]);
    const end = new Date(timestamps[i + 1]);
    var durationMs = end - start;
    var seconds = Math.floor((durationMs / 1000) % 60),
      minutes = Math.floor((durationMs / (1000 * 60)) % 60),
      hours = Math.floor(durationMs / (1000 * 60 * 60));
    var durationString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    durations.push(durationString);
  }
  return durations;
}

export const getPageDetails = (total, page, rowsperpage) => {
  let start = (page - 1) * rowsperpage + 1;
  let end = (page - 1) * rowsperpage + rowsperpage;
  if (end > total) {
    end = total;
  }
  let result = String(start) + "-" + String(end) + " of " + String(total);
  return result;
};

export const splitUrlEndPoint = (url) => {
  let result = "";
  if (url) {
    result = url.split("/api/");
    if (result.length) {
      result = result[1];
    }
  }
  return result;
};
