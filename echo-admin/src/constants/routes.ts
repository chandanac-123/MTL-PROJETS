import dashbord_active from "@public/menu-active-icons/active_dashboard.svg";
import dashbord_inactive from "@public/menu-inactive-icons/inactive_dashboard.svg";
import order_active from "@public/menu-active-icons/active_order.svg";
import order_inactive from "@public/menu-inactive-icons/inactive_order.svg";
import project_active from "@public/menu-active-icons/active_product.svg";
import project_inactive from "@public/menu-inactive-icons/inactive_product.svg";
import stock_active from "@public/menu-active-icons/active_stock.svg";
import stock_inactive from "@public/menu-inactive-icons/inactive_stock.svg";
import customer_active from "@public/menu-active-icons/active_user.svg";
import customer_inactive from "@public/menu-inactive-icons/inactive_user.svg";
import offer_active from "@public/menu-active-icons/active_ticket.svg";
import offer_inactive from "@public/menu-inactive-icons//inactive_ticket.svg";
import banner_active from "@public/menu-active-icons/active_banner.svg";
import banner_inactive from "@public/menu-inactive-icons/inactive_banner.svg";
import referral_active from "@public/menu-active-icons/active_refferal.svg";
import referral_inactive from "@public/menu-inactive-icons/inactive_refferal.svg";
import support_active from "@public/menu-active-icons/active_support.svg";
import support_inactive from "@public/menu-inactive-icons/inactive_support.svg";
import setting_active from "@public/menu-active-icons/active_setting.svg";
import setting_inactive from "@public/menu-inactive-icons/inactive_setting.svg";

export const routes = [
  {
    title: "Dashboard",
    label: "Dashboard",
    path: "/dashboard",
    activeIcon: dashbord_active,
    inactiveIcon: dashbord_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Orders",
    label: "Orders",
    path: "/orders",
    activeIcon: order_active,
    inactiveIcon: order_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Product Management",
    label: "Product Management",
    path: "/product-management",
    activeIcon: project_active,
    inactiveIcon: project_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: true,
    subItem: [
      {
        title: "Products",
        label: "Products",

        path: "/product-management/products",
        activeIcon: "",
        inactiveIcon: "",
        role: ["admin", "super_admin"],
        permission: true,
        subRoute: false,
      },
      {
        title: "Menu",
        label: "Menu",
        path: "/product-management/menu",
        activeIcon: "",
        inactiveIcon: "",
        role: ["admin", "super_admin"],
        permission: true,
        subRoute: false,
      },
      {
        title: "Categories",
        label: "Categories",
        path: "/product-management/categories",
        activeIcon: "",
        inactiveIcon: "",
        role: ["admin", "super_admin"],
        permission: true,
        subRoute: false,
      },
      {
        title: "Brands",
        label: "Brands",
        path: "/product-management/brand",
        activeIcon: "",
        inactiveIcon: "",
        role: ["admin", "super_admin"],
        permission: true,
        subRoute: false,
      },
      {
        title: "Top Products",
        label: "Top Products",
        path: "/product-management/top-products",
        activeIcon: "",
        inactiveIcon: "",
        role: ["admin", "super_admin"],
        permission: true,
        subRoute: false,
      },
    ],
  },
  {
    title: "Stock Management",
    label: "Stock Management",
    path: "/stock-management",
    activeIcon: stock_active,
    inactiveIcon: stock_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Customer Management",
    label: "Customer Management",
    path: "/customer-management",
    activeIcon: customer_active,
    inactiveIcon: customer_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Offers and Coupons",
    label: "Offers and Coupons",
    path: "/offers-coupons",
    activeIcon: offer_active,
    inactiveIcon: offer_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Banners",
    label: "Banners",
    path: "/banners",
    activeIcon: banner_active,
    inactiveIcon: banner_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Referrals",
    label: "Referrals",
    path: "/referrals",
    activeIcon: referral_active,
    inactiveIcon: referral_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Customer Support",
    label: "Customer Support",
    path: "/customer-support",
    activeIcon: support_active,
    inactiveIcon: support_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "User Management",
    label: "User Management",
    path: "/user-management",
    activeIcon: customer_active,
    inactiveIcon: customer_inactive,
    role: ["super_admin"],
    permission: true,
    subRoute: false,
  },
  {
    title: "Settings",
    label: "Settings",
    path: "/settings",
    activeIcon: setting_active,
    inactiveIcon: setting_inactive,
    role: ["admin", "super_admin"],
    permission: true,
    subRoute: false,
  },
];
