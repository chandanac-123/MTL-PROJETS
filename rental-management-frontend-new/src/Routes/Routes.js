
import ForgetPassword from "../Pages/Authentication/ForgetPassword"
import Login from "../Pages/Authentication/Login"
import ResetPassword from "../Pages/Authentication/ResetPassword"
import ResetSuccess from "../Pages/Authentication/ResetSuccess"
import Dashborad from "../Pages/Dashboard"
import dashboard_light from '../Static/Images/dashboard-light.svg'
import dashboard_dark from '../Static/Images/dashboard-dark.svg'
import income_light from '../Static/Images/income-light.svg'
import income_dark from '../Static/Images/income-dark.svg'
import Properties from "../Pages/Properties"
import property_dark from '../Static/Images/property-dark.svg'
import property_light from '../Static/Images/property-light.svg'
import expense_light from '../Static/Images/expense-light.svg'
import expense_dark from '../Static/Images/expense-dark.svg'
import UserRole from "../Pages/UserRole"
import UserMangenment from "../Pages/UserManagement"
import BalanceSheet from "../Pages/BalanceSheet"
import role_light from '../Static/Images/userrole-light.svg'
import role_dark from '../Static/Images/userrole-dark.svg'
import user_light from "../Static/Images/management-light.svg"
import user_dark from "../Static/Images/managemnt-dark.svg"
import balance_light from '../Static/Images/balancesheet-light.svg'
import balance_dark from '../Static/Images/balancesheet-dark.svg'
import report_light from '../Static/Images/report-light.svg'
import report_dark from '../Static/Images/report-dark.svg'
import InvestmentIncome from "../Pages/Income/InvesmentIncome"
import RentIncome from "../Pages/Income/RentIncome"
import Totalrentcollection from "../Pages/Reports/TotalRentCollection"
import TargetAmount from "../Pages/Reports/TargetAmount"
import OccupaidOrVaccant from "../Pages/Reports/OccupaidOrVaccant"
import IncomeReport from "../Pages/Reports/Income"
import ExpenseReport from "../Pages/Reports/Expense"
import TanentReport from "../Pages/Reports/Tanent"
import UserProfile from "../Pages/UserProfile"
import PropertyAdd from "../Pages/Properties/Add"
import PropertyView from "../Pages/Properties/View"
import AddTenant from "../Pages/Properties/TenantAdd"
import { Link } from "react-router-dom"
import RentIncomeView from "../Pages/Income/RentIncome/View/RentIncomeView"
import InvestmentIncomeView from "../Pages/Income/InvesmentIncome/View"
import Expences from "../Pages/Expenses/Expense";
import ExpenseView from "../Pages/Expenses/Expense/view";
import ExpenseType from "../Pages/Expenses/ExpenseType"
import Notification from "../Pages/Notification"
import BalanceSheetView from "../Pages/BalanceSheet/View"
import BuildingList from "../Pages/ListBuilding"
import list_building from "../Static/Images/building_list.svg"
import dark_building from "../Static/Images/building_drak.svg"
import TargetBuilding from "../Pages/TargetBuilding"
import { getPermission } from "../Utils/utils"
import RentCollected from "../Pages/Income/RentToCollected"
import RentCollectedView from "../Pages/Income/RentToCollected/View/RentCollectedView"
import AdvanceIncome from "../Pages/Income/AdvanceIncome"
import AdvanceIncomeView from "../Pages/Income/AdvanceIncome/View/AdvanceIncomeView"


const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString);
const data = userData?.data;
const permissionsArray = data?.permissions;
export const routes = [
  {
    key: 0,
    path: "/",
    label: "",
    privetRoute: false,
    isSubRoute: false,
    title: "Login",
    component: Login,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: "/forget-password",
    label: "",
    privetRoute: false,
    isSubRoute: false,
    title: "Forget Password",
    component: ForgetPassword,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: "/reset-password",
    label: "",
    privetRoute: false,
    isSubRoute: false,
    title: "Reset Password",
    component: ResetPassword,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: "/reset-success",
    label: "",
    privetRoute: false,
    isSubRoute: false,
    title: "Reset Success",
    component: ResetSuccess,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: "dashboard",
    label: "Hello, Mohamed",
    icon: dashboard_dark,
    iconActive: dashboard_light,
    privetRoute: true,
    isSubRoute: false,
    title: "Dashboard",
    component: Dashborad,
    menubar: permissionsArray?.includes("Dashboard"),
    greeting: "Welcome",
    permission: getPermission("Dashboard"),
    tooltip: false
  },
  {
    key: 0,
    path: "properties",
    label: "Properties",
    icon: property_dark,
    iconActive: property_light,
    privetRoute: true,
    isSubRoute: false,
    title: "Properties",
    component: Properties,
    menubar: permissionsArray?.includes("Property"),
    breadCrumbs: [{ title: <Link to="/properties">Properties</Link> }],
    permission: getPermission("Property"),
    tooltip: false
  },
  {
    key: 0,
    path: "properties/add",
    label: "Properties Add",
    privetRoute: true,
    isSubRoute: false,
    component: PropertyAdd,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/properties">Properties</Link> },
      { title: <Link to="#">Add Property</Link> },
    ],
    permission: getPermission("Property")
  },
  {
    key: 0,
    path: "properties/view/:id",
    label: "Properties View",
    title: "Properties",
    privetRoute: true,
    isSubRoute: false,
    component: PropertyView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/properties">Properties</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Property")
  },
  {
    key: 0,
    path: "properties/tenant/add",
    label: "Properties",
    privetRoute: true,
    isSubRoute: false,
    component: AddTenant,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/properties">Properties</Link> },
      { title: <Link to="#">Add Tenant</Link> },
    ],
    permission: getPermission("Property")
  },
  {
    key: 0,
    path: "income/rent-income",
    label: "Income",
    icon: income_dark,
    iconActive: income_light,
    privetRoute: true,
    isSubRoute: false,
    title: "Income",
    component: "",
    menubar: permissionsArray?.includes("Income"),
    subMenu: [
      {
        key: 1,
        path: "income/rent-income",
        label: "Rent Income",
        privetRoute: true,
        isSubRoute: false,
        title: "Income",
        tooltip: false,
        component: RentIncome,
        breadCrumbs: [
          { title: <Link to="/income/rent-income">Rent Income</Link> },
        ],
      },
      {
        key: 2,
        path: "income/investment-income",
        label: "Investment income",
        privetRoute: true,
        isSubRoute: false,
        title: "Income",
        tooltip: false,
        component: InvestmentIncome,
        breadCrumbs: [
          {
            title: <Link to="income/investment-income">Investment Income</Link>,
          },
        ],
      },
      {
        key: 3,
        path: "income/rent-collected",
        label: "Rent To Be Collected",
        privetRoute: true,
        isSubRoute: false,
        title: "Income",
        tooltip: false,
        component: RentCollected,
        breadCrumbs: [
          { title: <Link to="/income/rent-collected">Rent To Be Collected</Link> },
        ],
      },
      {
        key: 4,
        path: "income/advance-income",
        label: "Advance Income",
        privetRoute: true,
        isSubRoute: false,
        title: "Advance Income",
        tooltip: false,
        component: AdvanceIncome,
        breadCrumbs: [
          { title: <Link to="/income/advance">Advance Income</Link> },
        ],
      },
    ],
    permission: getPermission("Income")
  },
  {
    key: 0,
    path: "income/investment-income/view/:id",
    label: "Investment income",
    title: "Investment income",
    privetRoute: true,
    isSubRoute: false,
    component: InvestmentIncomeView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/income/investment-income">Investment Income</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Income")
  },
  {
    key: 0,
    path: "income/rent-income/view/:id",
    label: "Rent Income",
    title: "Rent Income",
    privetRoute: true,
    isSubRoute: false,
    component: RentIncomeView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/income/rent-income">Rent Income</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Income")
  },
  {
    key: 0,
    path: "income/rent-collected/view/:id",
    label: "Rent To Be Collected",
    title: "Rent To Be Collected",
    privetRoute: true,
    isSubRoute: false,
    component: RentCollectedView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/income/rent-collected">Rent To Be Collected</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Income")
  },
  {
    key: 0,
    path: "income/advance-income/view/:id",
    label: "Advance Income",
    title: "Advance Income",
    privetRoute: true,
    isSubRoute: false,
    component: AdvanceIncomeView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/income/advance-income">Advance Income</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Expense")
  },
  {
    key: 0,
    path: "expense/expenses",
    label: "Expenses",
    icon: expense_dark,
    iconActive: expense_light,
    privetRoute: true,
    isSubRoute: false,
    title: "Expenses",
    component: "",
    tooltip: false,
    menubar: permissionsArray?.includes("Expense"),
    subMenu: [
      {
        key: 1,
        path: "expense/expenses",
        label: "Expenses",
        privetRoute: true,
        isSubRoute: false,
        title: "Expense",
        component: Expences,
        breadCrumbs: [{ title: <Link to="expense/expenses">Expenses</Link> }],
      },
      {
        key: 2,
        path: "expense/expense-type",
        label: "Expense Type",
        privetRoute: true,
        isSubRoute: false,
        title: "Expense Type",
        component: ExpenseType,
        breadCrumbs: [
          { title: <Link to="expense/expense-type">Expense Type</Link> },
        ],
      },
    ],
    permission: getPermission("Expense")
  },
  {
    key: 0,
    path: "expense/expenses/view/:id",
    label: "Expenses",
    title: "Expenses",
    privetRoute: true,
    isSubRoute: false,
    component: ExpenseView,
    menubar: false,
    breadCrumbs: [
      { title: <Link to="/expense/expenses">Expenses</Link> },
      { title: <Link to="#">View Details</Link> },
    ],
    permission: getPermission("Expense")
  },
  {
    key: 0,
    path: "target/building",
    label: "List Building",
    icon: list_building,
    iconActive: dark_building,
    privetRoute: true,
    isSubRoute: false,
    title: "List Building",
    component: "",
    menubar: permissionsArray?.includes("Building"),
    subMenu: [
      {
        key: 0,
        path: "target/building",
        label: "List Building",
        title: "List Building",
        privetRoute: true,
        isSubRoute: false,
        tooltip: false,
        component: TargetBuilding,
        breadCrumbs: [
          { title: <Link to="/target/building">List Building</Link> },
        ],
      },
      {
        key: 2,
        path: "building",
        label: "New Building",
        privetRoute: true,
        isSubRoute: false,
        tooltip: false,
        title: "New Building",
        component: BuildingList,
        breadCrumbs: [
          { title: <Link to="/target/building">List Building</Link> },
        ],
      },
    ],
    permission: getPermission("Building")
  },
  {
    key: 0,
    path: "balance-sheet",
    label: "Balance Sheet",
    icon: balance_dark,
    iconActive: balance_light,
    privetRoute: true,
    isSubRoute: false,
    tooltip:"View and download property details such as income, expenses, balance, and targets for comprehensive insights.",
    title: "Balance Sheet",
    component: BalanceSheet,
    menubar: permissionsArray?.includes("Balance Sheet"),
    breadCrumbs: [{ title: <Link to="/balance-sheet">Balance Sheet</Link> }],
    permission: getPermission("Balance Sheet")
  },
  {
    key: 0,
    path: "balance-sheet/view/:id",
    label: "Balance Sheet",
    privetRoute: true,
    isSubRoute: false,
    title: "Balance Sheet",
    component: BalanceSheetView,
    menubar: false,
    breadCrumbs: [{ title: <Link to="/balance-sheet">Balance Sheet</Link> }],
    permission: getPermission("Balance Sheet")
  },
  {
    key: 0,
    path: "report/target-amount",
    label: "Reports",
    icon: report_dark,
    iconActive: report_light,
    privetRoute: true,
    isSubRoute: false,
    title: "Reports",
    component: "",
    menubar: permissionsArray?.includes("Reports"),
    permission: getPermission("Reports"),
    subMenu: [
      // {
      //   key: 1,
      //   path: "report/rent-collection",
      //   label: "Total Rent Collection",
      //   privetRoute: true,
      //   isSubRoute: false,
      //   title: "Total Rent Collection",
      //   component: Totalrentcollection,
      //   breadCrumbs: [
      //     {
      //       title: (
      //         <Link to="/report/rent-collection">Total Rent Collection</Link>
      //       ),
      //     },
      //   ],
      // },
      {
        key: 2,
        path: "report/target-amount",
        label: "Target Amount",
        privetRoute: true,
        isSubRoute: false,
        title: "Target Amount",
        tooltip: "View and download target rates set for each property, along with rent received against the set targets.",
        component: TargetAmount,
        breadCrumbs: [
          { title: <Link to="/report/target-amount">Target Amount</Link> },
        ],
        permission: getPermission("Reports")
      },
      {
        key: 2,
        path: "report/occupied-vacant",
        label: "Occupancy Report",
        privetRoute: true,
        isSubRoute: false,
        tooltip: "View and download occupancy status of each property - occupied or vacant.",
        title: "Occupied vs Vacant Properties",
        component: OccupaidOrVaccant,
        breadCrumbs: [
          {
            title: (
              <Link to="/report/occupied-vacant">
                Occupied vs Vacant Properties
              </Link>
            ),
          },
        ],
        permission: getPermission("Reports")
      },
      {
        key: 2,
        path: "report/income",
        label: "Income Report",
        privetRoute: true,
        isSubRoute: false,
        title: "Income Report",
        tooltip: "Review income details at a glance: building name, date, rent, tenant info, received amount, and payment mode.",
        component: IncomeReport,
        breadCrumbs: [
          { title: <Link to="/report/income">Income Report</Link> },
        ],
        permission: getPermission("Reports")
      },
      {
        key: 2,
        path: "report/expense",
        label: "Expense Report",
        privetRoute: true,
        isSubRoute: false,
        title: "Expense Report",
        tooltip: "Check building name, expense type, date, remarks, and amount on the Expense Report for quick expenditure insights.",
        component: ExpenseReport,
        breadCrumbs: [
          { title: <Link to="/report/expense">Expense Report</Link> },
        ],
        permission: getPermission("Reports")
      },
      // {
      //   key: 2,
      //   path: "report/tanent",
      //   label: "Tenant Report",
      //   privetRoute: true,
      //   isSubRoute: false,
      //   title: "Tenant Report",
      //   component: TanentReport,
      //   breadCrumbs: [
      //     { title: <Link to="/report/tanent">Tanant Report</Link> },
      //   ],
      // },
    ],
  },
  {
    key: 0,
    path: "user-role",
    label: "User Role",
    icon: role_dark,
    iconActive: role_light,
    privetRoute: true,
    isSubRoute: false,
    title: "User Role",
    component: UserRole,
    tooltip: false,
    menubar: permissionsArray?.includes("User Role"),
    breadCrumbs: [{ title: <Link to="/user-role">User Role</Link> }],
    permission: getPermission("User Role")
  },
  {
    key: 0,
    path: "user-management",
    label: "User Management",
    icon: user_dark,
    iconActive: user_light,
    privetRoute: true,
    isSubRoute: false,
    tooltip: false,
    title: "User Management",
    component: UserMangenment,
    menubar: permissionsArray?.includes("User Management"),
    breadCrumbs: [
      { title: <Link to="/user-management">User Management</Link> },
    ],
    permission: getPermission("User Management")
  },
  {
    key: 0,
    path: "user-profile",
    label: "Account Settings",
    privetRoute: true,
    isSubRoute: false,
    component: UserProfile,
    menubar: false,
    permission: true
  },
  {
    key: 0,
    path: "notification",
    label: "Notification",
    privetRoute: true,
    isSubRoute: false,
    title: "Notification",
    component: Notification,
    menubar: permissionsArray?.includes("Notification"),
    breadCrumbs: [
      { title: <Link to="/notification">Overview</Link> },
    ],
    permission: true
  },
];
