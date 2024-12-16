import { GetPermission } from '../Functions/utils';

export const menus = [
    {
        primary: "Dashboard",
        secondary: "",
        name: "dashboard",
        path: "/dashboard",
        role: ['Admin'],
        activeIcon: require('../Assets/images/dashicon.png'),
        inctiveIcon: require('../Assets/images/inactivedashIcon.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("dashboard")
    },
    {
        primary: "Verification",
        secondary: "",
        name: "verification",
        path: "/dashboard/verification",
        role: ['Admin'],
        activeIcon: require('../Assets/images/activeVeifyIcon.png'),
        inctiveIcon: require('../Assets/images/veriflogo.png'),
        is_main: true,
        close: ["report submitted","verification"],
        children: [
            {
                primary: "Assigned Verification",
                secondary: "",
                name: "assigned verification",
                path: "/dashboard/assigned-verification",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("assignedverification")
            },
            {
                primary: "Report Received",
                secondary: "",
                name: "report received",
                path: "/dashboard/reports-recieved",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("report_recieved")
            },
            {
                primary: "Report Submitted",
                secondary: "",
                name: "report submitted",
                path: "/dashboard/reports-submitted",
                role: ['Admin'],
                close: ["report submitted"],
                children: [
                    {
                        primary: "Report Edit",
                        secondary: "",
                        name: "report edit",
                        path: "/dashboard/reports-edit",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("reports_edit")
                    },
                    {
                        primary: "Reports Confirm",
                        secondary: "",
                        name: "report confirm",
                        path: "/dashboard/reports-confirm",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("reports_confirm")
                    },
                    {
                        primary: "Database",
                        secondary: "",
                        name: "database",
                        path: "/dashboard/database",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("database")
                    }
                ],
                view: GetPermission("report_submitted")
            }
        ],
        view: GetPermission("verification")
    },
    {
        primary: "Admin",
        secondary: "",
        name: "admin",
        path: "/dashboard/add-product",
        role: ['Admin'],
        activeIcon: require('../Assets/images/admin.png'),
        inctiveIcon: require('../Assets/images/admin.png'),
        is_main: true,
        close: ["admin","add mandatory","user","setting"],
        children: [
            {
                primary: "Add Product",
                secondary: "",
                name: "add product",
                path: "/dashboard/add-product",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("product")
            },
            {
                primary: "Add Holidays",
                secondary: "",
                name: "add holidays",
                path: "/dashboard/add-holidays",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("holiday")
            },
            {
                primary: "Add Mandatory",
                secondary: "",
                name: "add mandatory",
                path: "/dashboard/add-mandatory",
                role: ['Admin'],
                close: ["add mandatory"],
                children: [
                    {
                        primary: "Vendor Specific Fields",
                        secondary: "",
                        name: "vendor specific fields",
                        path: "/dashboard/vendor-specific-fields",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("vendormandatoryfield")
                    },
                ],
                view: GetPermission("mandatory")
            },
            {
                primary: "User",
                secondary: "",
                name: "user",
                path: "/dashboard/add-user",
                role: ['Admin'],
                close: ["user"],
                children: [
                    {
                        primary: "Add User",
                        secondary: "",
                        name: "add user",
                        path: "/dashboard/add-user",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("add_user")
                    },
                    {
                        primary: "User Settings",
                        secondary: "",
                        name: "user settings",
                        path: "/dashboard/user-settings",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("user_settings")
                    },
                    {
                        primary: "Add Vendor",
                        secondary: "",
                        name: "add vendor",
                        path: "/dashboard/add-vendor",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("add_vendor")
                    },
                ],
                view: GetPermission("user")
            },
            {
                primary: "Setting",
                secondary: "",
                name: "setting",
                path: "/dashboard/billing-location",
                role: ['Admin'],
                close: ["setting"],
                children: [
                    {
                        primary: "Billing Location",
                        secondary: "",
                        name: "billing location",
                        path: "/dashboard/billing-location",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("billinglocation")
                    },
                    {
                        primary: "District",
                        secondary: "",
                        name: "district",
                        path: "/dashboard/districts",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("district")
                    },
                    {
                        primary: "Negative Remarks",
                        secondary: "",
                        name: "negative remarks",
                        path: "/dashboard/negative-remarks",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("negativeremarks")
                    },
                ],
                view: GetPermission("settings")
            },
        ],
        view: GetPermission("admin")
    },
    {
        primary: "Vendor Billing",
        secondary: "Parameter",
        name: "vendor billing parameter",
        path: "/dashboard/vendor-billing-parameter",
        role: ['Admin'],
        activeIcon: require('../Assets/images/vendor_bill_active.png'),
        inctiveIcon: require('../Assets/images/vendor_billing.png'),
        is_main: false,
        close: [],
        children: [],
        multi_line: true,
        view: GetPermission("vendor_billing")
    },
    {
        primary: "Meter Reading",
        secondary: "",
        name: "meter reading",
        path: "/dashboard/meter-reading",
        role: ['Admin'],
        activeIcon: require('../Assets/images/meterActive.png'),
        inctiveIcon: require('../Assets/images/meter_reading.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("meter_reading")
    },
    {
        primary: "Mobile Request",
        secondary: "",
        name: "usermobile",
        path: "/dashboard/mobile-request",
        role: ['Admin'],
        activeIcon: require('../Assets/images/mobile_active.png'),
        inctiveIcon: require('../Assets/images/mobile_request.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("usermobile")
    },
    {
        primary: "Download Image",
        secondary: "",
        name: "download image",
        path: "/dashboard/download-image",
        role: ['Admin'],
        activeIcon: require('../Assets/images/download_active.png'),
        inctiveIcon: require('../Assets/images/download_img.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("download_image")
    },
    {
        primary: "Time Tracker",
        secondary: "",
        name: "time tracker",
        path: "/dashboard/time-tracker",
        role: ['Admin'],
        activeIcon: require('../Assets/images/time_track_active.png'),
        inctiveIcon: require('../Assets/images/time_track_icon.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("time_tracker")
    },
    {
        primary: "Worker Tracker",
        secondary: "",
        name: "worker tracker",
        path: "/dashboard/worker-tracker",
        role: ['Admin'],
        activeIcon: require('../Assets/images/work_tracker_icon_active.png'),
        inctiveIcon: require('../Assets/images/work_tracker_icon.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("worker_tracker")
    },
    {
        primary: "Reports",
        secondary: "",
        name: "reports",
        path: "/dashboard/verification-status-log",
        role: ['Admin'],
        activeIcon: require('../Assets/images/reports.png'),
        inctiveIcon: require('../Assets/images/reports.png'),
        is_main: true,
        close: ["TAT reports","reports"],
        children: [
            {
                primary: "Verification",
                secondary: "Status & Log",
                name: "verification status & log",
                path: "/dashboard/verification-status-log",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("verification_status_log")
            },
            {
                primary: "MIS Reports",
                secondary: "",
                name: "MIS reports",
                path: "/dashboard/MIS-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("mis_reports")
            },
            {
                primary: "Payout Reports",
                secondary: "",
                name: "payout reports",
                path: "/dashboard/payout-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("payout_reports")
            },
            {
                primary: "TAT Reports",
                secondary: "",
                name: "TAT reports",
                path: "/dashboard/tat-reports",
                role: ['Admin'],
                close: ["TAT reports"],
                children: [
                    {
                        primary: "TAT Reports Visit",
                        secondary: "",
                        name: "TAT reports visit",
                        path: "/dashboard/tat-report-visit",
                        role: ['Admin'],
                        close: [],
                        children: [],
                        view: GetPermission("tat_reports_visit")
                    },
                ],
                view: GetPermission("tat_reports")
            },
            {
                primary: "Vendor Track",
                secondary: "Reports",
                name: "vendor track reports",
                path: "/dashboard/vendor-track-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("vendor_track_reports")
            },
            {
                primary: "Billable/Payable",
                secondary: "",
                name: "billable/payable",
                path: "/dashboard/billable-payable-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("billable_payable")
            },
            {
                primary: "Agent Wise",
                secondary: "Pending",
                name: "agentwise pending",
                path: "/dashboard/agentwise-pending-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("agent_wise_pending")
            },
            {
                primary: "Office Wise",
                secondary: "Pending",
                name: "officewise pending",
                path: "/dashboard/officewise-pending-reports",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("office_wise_pending")
            },
            {
                primary: "Vendor Wise",
                secondary: "Pending",
                name: "vendorwise pending",
                path: "/dashboard/vendorwise-pending-reports/",
                role: ['Admin'],
                close: [],
                children: [],
                view: GetPermission("vendor_wise_pending")
            },
        ],
        view: GetPermission("report")
    },
    {
        primary: "Role Management",
        secondary: "",
        name: "role management",
        path: "/dashboard/role-management",
        role: ['Admin'],
        activeIcon: require('../Assets/images/role_management_active.png'),
        inctiveIcon: require('../Assets/images/role_management.png'),
        is_main: false,
        close: [],
        children: [],
        view: GetPermission("role_management")
    },
    {
        primary: "Admin",
        secondary: "Management",
        name: "admin management",
        path: "/dashboard/admin-management",
        role: ['Admin'],
        activeIcon: require('../Assets/images/admin_manage_active.png'),
        inctiveIcon: require('../Assets/images/admin_manage_icon.png'),
        is_main: false,
        close: [],
        children: [],
        multi_line: true,
        view: GetPermission("admin_management")
    },
    {
        primary: "View",
        secondary: "",
        name: "view",
        path: "/dashboard/view",
        role: ['Admin'],
        activeIcon: require('../Assets/images/dashicon.png'),
        inctiveIcon: require('../Assets/images/inactivedashIcon.png'),
        is_main: false,
        close: [],
        children: [],
        view:GetPermission("vendor_view")
    },
]