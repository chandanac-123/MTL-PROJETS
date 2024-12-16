// import * as React from 'react';
import { styled as styled1, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import styled from "styled-components";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { lazy, Suspense, useEffect } from "react";
import { Link, useLocation, Route, Routes as Switch } from "react-router-dom";
import { ButtonBase, CircularProgress } from "@mui/material";
import {
  CheckNavigationPermission,
  GetMenus,
  GetPermission,
  isActive,
  Page,
  GetDatas,
} from "../Functions/utils";
import { style } from "@mui/system";
import HeaderMenu from "./Common/HeaderMenu";
import { selectUserName } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { menus } from "../Routes/routes";
import { collapseSuccess } from "../Slices/commonSlice";
import store from "../Store/store";
import VendorWisePendingSingleTable from "./Reports/VendorWisePendingSingleTable";
import VendorWisePendingSingle from "../Screens/Reports/VendorWisePendingSingle";
import VendorWisePendingDetails from "../Screens/Reports/VendorWisePendingDetails";
import OfficeWisePendingSingle from "../Screens/Reports/OfficeWisePendingSingle";
import OfficeWisePendingDetails from "../Screens/Reports/OfficeWisePendingDetails";
// import {setUserAction} from "../Slices/userActions";
// import '../Services/apiCaller.js';

const Dashboard = lazy(() => import("../Screens/Dashboard"));
const Verification = lazy(() => import("../Screens/Verification"));
const AssignedVerification = lazy(() =>
  import("../Screens/AssignedVerification")
);
const ReportRecieved = lazy(() => import("../Screens/ReportRecieved"));
const ReportSubmitted = lazy(() => import("../Screens/ReportSubmitted"));
const ReportsEdit = lazy(() => import("../Screens/ReportsEdit"));
const ReportsConfirm = lazy(() => import("../Screens/ReportsConfirm"));
const Database = lazy(() => import("../Screens/Database"));
const AddProduct = lazy(() => import("../Screens/admins/AddProduct"));
const AddHolidays = lazy(() => import("../Screens/admins/AddHolidays"));
const AddMandatory = lazy(() => import("../Screens/admins/AddMandatory"));
const VendorSpecificField = lazy(() =>
  import("../Screens/admins/VendorSpecificField")
);
const AddUser = lazy(() => import("../Screens/admins/AddUser"));
const UserSettings = lazy(() => import("../Screens/admins/UserSettings"));
const AddVendor = lazy(() => import("../Screens/admins/AddVendor"));
const Billinglocation = lazy(() => import("../Screens/admins/Billinglocation"));
const Districts = lazy(() => import("../Screens/admins/Districts"));
const NegativeRemarks = lazy(() => import("../Screens/admins/NegativeRemarks"));
const VendorBillingParameter = lazy(() =>
  import("../Screens/VendorBillingParameter/VendorBillingParameter")
);
const MeterReading = lazy(() => import("../Screens/MeterReading"));
const MobileRequest = lazy(() => import("../Screens/MobileRequest"));
const DownloadImage = lazy(() => import("../Screens/DownloadImage"));
const TimeTracker = lazy(() => import("../Screens/TimeTracker/TimeTracker"));
const WorkerTracker = lazy(() =>
  import("../Screens/WorkerTracker/WorkerTracker")
);
const TimeTrackerView = lazy(() =>
  import("../Components/TimeTracker/TimeTrackerView")
);
const VerificationStatus = lazy(() =>
  import("../Screens/Reports/VerificationStatus")
);
const MISReports = lazy(() => import("../Screens/Reports/MISReports"));
const PayoutReport = lazy(() => import("../Screens/Reports/PayoutReport"));
const TATReports = lazy(() => import("../Screens/Reports/TATReports"));
const TATDetails = lazy(() => import("../Screens/Reports/TATDetails"));
const TATReportVisit = lazy(() => import("../Screens/Reports/TATReportVisit"));
const VendorTrackReport = lazy(() => import("./Reports/VendorTrackReport"));
const BillablePayableReport = lazy(() =>
  import("./Reports/BillablePayableReport")
);
const AgentWisePending = lazy(() =>
  import("../Screens/Reports/AgentWisePending")
);
const OfficeWisePending = lazy(() =>
  import("../Screens/Reports/OfficeWisePending")
);
const VendorWisePending = lazy(() =>
  import("../Screens/Reports/VendorWisePending")
);
const RoleManagement = lazy(() =>
  import("../Screens/RoleManagement/RoleManagement")
);
const AdminManagement = lazy(() =>
  import("../Screens/AdminManagement/AdminManagement")
);
const View = lazy(() => import("../Screens/View"));
const AgentWisePendingDistrict = lazy(() =>
  import("../Screens/Reports/AgentWisePendingDistrict")
);
const AgentAssignedVerification = lazy(() =>
  import("../Screens/Reports/AgentAssignedVerification")
);

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled1("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled1(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled1(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  boxShadow: "0px 5px 6px 2px rgb(0 0 0 / 15%)",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  "*::-webkit-scrollbar": {
    display: "none",
  },
  "@media only screen and (max-width: 480px)": {
    display: "none",
  },
}));

export default function SideBar() {
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const user_type = useSelector((state) => state.auth.user_type);
  const { pathname } = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [close, setClose] = React.useState(isActive(pathname)[1]);
  const [is_collapse, setCollapse] = React.useState(isActive(pathname)[0]);
  const [menus1, setMenus1] = React.useState([]);

  useEffect(() => {
    // dispatch(setUserAction('Page Loaded'));
    setCollapse(isActive(pathname)[0]);
  }, [pathname]);

  useEffect(() => {
    let menus = GetMenus(user_type);
    setMenus1(menus);
    setLoading(false);
    if (pathname === "/") {
      let path = CheckNavigationPermission();
      setClose(isActive(path)[1]);
      setCollapse(isActive(path)[0]);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    setCollapse(isActive(pathname)[0]);
    setClose(isActive(pathname)[1]);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setClose("");
  };

  useEffect(() => {
    dispatch(collapseSuccess(open));
  }, [open]);

  const handleClick = (type) => {
    let collapse_type = type;
    const sidebars = ["admin", "verification", "reports"];
    if (sidebars.includes(type) && !open) {
      setOpen(true);
    }
    if (type === "admin") {
      collapse_type = "add product";
    } else if (type === "user") {
      collapse_type = "add user";
    } else if (type === "setting") {
      collapse_type = "billing location";
    } else if (type === "reports") {
      collapse_type = "verification status & log";
    }
    setCollapse(collapse_type);
    if (
      type === "dashboard" ||
      type === "vendor billing parameter" ||
      type === "meter reading" ||
      type === "usermobile" ||
      type === "download image" ||
      type === "role management" ||
      type === "view"
    ) {
      setClose("");
    } else {
      if (type === "verification" || type === "report submitted") {
        if (close === type && type === "report submitted") {
          setClose("verification");
        } else if (close === type && type === "verification") {
          setClose("");
        } else {
          setClose(type);
        }
      } else if (
        type === "admin" ||
        type === "add mandatory" ||
        type === "user" ||
        type === "setting"
      ) {
        if (close === type && type === "admin") {
          setClose("");
        } else if (close === type && type !== "admin") {
          setClose("admin");
        } else {
          setClose(type);
        }
      } else if (type === "reports" || type === "TAT reports") {
        if (close === type && type === "reports") {
          setClose("");
        } else if (close === type && type !== "reports") {
          setClose("reports");
        } else {
          setClose(type);
        }
      }
    }
  };

  const handleMainActive = (name) => {
    let is_main = false;
    if (name === "verification") {
      if (close === "verification" || close === "report submitted") {
        is_main = true;
      }
    } else if (name === "admin") {
      if (
        close === "admin" ||
        close === "add mandatory" ||
        close === "user" ||
        close === "setting"
      ) {
        is_main = true;
      }
    } else if (name === "reports") {
      if (close === "reports" || close === "TAT reports") {
        is_main = true;
      }
    }
    return is_main;
  };

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "250px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <BoxContainer sx={{ display: "flex", width: "100%" }}>
        {/* <CssBaseline /> */}
        <AppBarDiv position="fixed" open={open}>
          <HeaderContainer open={open}>
            <IconButtonDIv
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              {/* <MenuIcon /> */}
              <img
                src={require("../Assets/images/biju&biju-icon.png")}
                width="35px"
                height="35px"
              />
            </IconButtonDIv>
            <HeaderRight>
              <ImgDiv>{/* <SearchOutlinedIcon /> */}</ImgDiv>
              <ImgDiv>
                {/* <IconImg src={require('../Assets/images/Groupsettings.png')} /> */}
                {/* <SettingsOutlinedIcon /> */}
                <HeaderMenu />
              </ImgDiv>

              <span>{username}</span>
            </HeaderRight>
          </HeaderContainer>
        </AppBarDiv>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img src={require("../Assets/images/logo.png")} />
            </div>
            <IconButtonDIv onClick={handleDrawerClose} className="drawer-icon">
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <>
                  {/* <ChevronLeftIcon /> */}
                  <img src={require("../Assets/images/drawer_icon.png")} />
                </>
              )}
            </IconButtonDIv>
          </DrawerHeader>
          <Divider />
          <List>
            {menus1
              .filter((m) => m.view === true)
              .map((i, index) => (
                <>
                  <StyledListItem
                    onClick={() => handleClick(i.name)}
                    is_collapse={is_collapse}
                    name={i.name}
                    key={i.name}
                  >
                    <SideMenuTextLink to={i.path}>
                      <MenuDiv>
                        <IconDiv open={open}>
                          {is_collapse === i.name ? (
                            <img src={i.activeIcon} />
                          ) : (
                            <img src={i.inctiveIcon} />
                          )}
                        </IconDiv>
                        <ListItemDIv
                          className={i.multi_line ? "head multi-line" : "head"}
                          primary={i.primary}
                          secondary={i.secondary}
                          is_collapse={is_collapse}
                          name={i.name}
                          is_main={
                            i.is_main
                              ? handleMainActive(i.username).toString()
                              : "false"
                          }
                        />
                        {i.close.length ? (
                          i.close.includes(close) ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )
                        ) : null}
                      </MenuDiv>
                      {is_collapse === i.name ? (
                        <img
                          src={require("../Assets/images/activeIcon2.png")}
                        />
                      ) : (
                        ""
                      )}
                    </SideMenuTextLink>
                  </StyledListItem>
                  {i.children.length ? (
                    <Collapse
                      in={i.close.includes(close) ? true : false}
                      timeout="auto"
                      unmountOnExit
                      key={index}
                    >
                      <List
                        component="div"
                        disablePadding
                        style={{ backgroundColor: "rgba(0, 27, 84, 0.06)" }}
                      >
                        {i.children
                          .filter((f) => f.view === true)
                          .map((c, index) => (
                            <>
                              <StyledListItem
                                onClick={() => handleClick(c.name)}
                                is_collapse={is_collapse}
                                name={c.name}
                                key={c.name}
                              >
                                <SideMenuTextLink to={c.path}>
                                  <MenuDiv>
                                    <IconDiv open={open}></IconDiv>
                                    <ListItemDIv
                                      className="items"
                                      primary={c.primary}
                                      secondary={c.secondary}
                                      is_collapse={is_collapse}
                                      name={c.name}
                                    />
                                    {c.close.length ? (
                                      c.close.includes(close) ? (
                                        <ExpandLess />
                                      ) : (
                                        <ExpandMore />
                                      )
                                    ) : null}
                                  </MenuDiv>
                                  {is_collapse === c.name ? (
                                    <img
                                      src={require("../Assets/images/activeIcon2.png")}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </SideMenuTextLink>
                              </StyledListItem>
                              {c.children.length ? (
                                <Collapse
                                  in={c.close.includes(close) ? true : false}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    {c.children
                                      .filter((s) => s.view === true)
                                      .map((sc, index) => (
                                        <>
                                          <StyledListItem
                                            sx={{ pl: 4 }}
                                            onClick={() => handleClick(sc.name)}
                                            is_collapse={is_collapse}
                                            name={sc.name}
                                            key={index}
                                          >
                                            <SideMenuTextLink to={sc.path}>
                                              <MenuDiv>
                                                <IconDiv open={open}></IconDiv>
                                                <ListItemDIv
                                                  className="items"
                                                  primary={sc.primary}
                                                  secondary={sc.secondary}
                                                  is_collapse={is_collapse}
                                                  name={sc.name}
                                                />
                                                {sc.close.length ? (
                                                  sc.close.includes(close) ? (
                                                    <ExpandLess />
                                                  ) : (
                                                    <ExpandMore />
                                                  )
                                                ) : null}
                                              </MenuDiv>
                                              {is_collapse === sc.name ? (
                                                <img
                                                  src={require("../Assets/images/activeIcon2.png")}
                                                />
                                              ) : (
                                                ""
                                              )}
                                            </SideMenuTextLink>
                                          </StyledListItem>
                                        </>
                                      ))}
                                  </List>
                                </Collapse>
                              ) : null}
                            </>
                          ))}
                      </List>
                    </Collapse>
                  ) : null}
                </>
              ))}
          </List>
        </Drawer>
        <MainContainer>
          <Suspense
            fallback={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "250px",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Switch>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/verification"
                  element={<Verification />}
                />
                <Route
                  path="/dashboard/assigned-verification"
                  element={<AssignedVerification />}
                />
                <Route
                  path="/dashboard/reports-recieved"
                  element={<ReportRecieved />}
                />
                <Route
                  path="/dashboard/reports-submitted"
                  element={<ReportSubmitted />}
                />
                <Route
                  path="/dashboard/reports-edit"
                  element={<ReportsEdit />}
                />
                <Route
                  path="/dashboard/reports-confirm"
                  element={<ReportsConfirm />}
                />
                <Route path="/dashboard/database" element={<Database />} />
                <Route path="/dashboard/add-product" element={<AddProduct />} />
                <Route
                  path="/dashboard/add-holidays"
                  element={<AddHolidays />}
                />
                <Route
                  path="/dashboard/add-mandatory"
                  element={<AddMandatory />}
                />
                <Route
                  path="/dashboard/vendor-specific-fields"
                  element={<VendorSpecificField />}
                />
                <Route path="/dashboard/add-user" element={<AddUser />} />
                <Route
                  path="/dashboard/user-settings"
                  element={<UserSettings />}
                />
                <Route path="/dashboard/add-vendor" element={<AddVendor />} />
                <Route
                  path="/dashboard/billing-location"
                  element={<Billinglocation />}
                />
                <Route path="/dashboard/districts" element={<Districts />} />
                <Route
                  path="/dashboard/negative-remarks"
                  element={<NegativeRemarks />}
                />
                <Route
                  path="/dashboard/vendor-billing-parameter"
                  element={<VendorBillingParameter />}
                />
                <Route
                  path="/dashboard/meter-reading"
                  element={<MeterReading />}
                />
                <Route
                  path="/dashboard/mobile-request"
                  element={<MobileRequest />}
                />
                <Route
                  path="/dashboard/download-image"
                  element={<DownloadImage />}
                />
                <Route
                  path="/dashboard/time-tracker"
                  element={<TimeTracker />}
                />
                <Route
                  path="/dashboard/time-tracker-view"
                  element={<TimeTrackerView />}
                />
                <Route
                  path="/dashboard/worker-tracker"
                  element={<WorkerTracker />}
                />
                <Route
                  path="/dashboard/verification-status-log"
                  element={<VerificationStatus />}
                />
                <Route path="/dashboard/MIS-reports" element={<MISReports />} />
                <Route
                  path="/dashboard/payout-reports"
                  element={<PayoutReport />}
                />
                <Route path="/dashboard/tat-reports" element={<TATReports />} />
                <Route path="/dashboard/tat-details" element={<TATDetails />} />
                <Route
                  path="/dashboard/tat-report-visit"
                  element={<TATReportVisit />}
                />
                <Route
                  path="/dashboard/vendor-track-reports"
                  element={<VendorTrackReport />}
                />
                <Route
                  path="/dashboard/billable-payable-reports"
                  element={<BillablePayableReport />}
                />
                <Route
                  path="/dashboard/agentwise-pending-reports"
                  element={<AgentWisePending />}
                />
                <Route
                  path="/dashboard/officewise-pending-reports"
                  element={<OfficeWisePending />}
                />
                <Route
                  path="/dashboard/vendorwise-pending-reports/"
                  element={<VendorWisePending />}
                />
                <Route
                  path="/dashboard/role-management"
                  element={<RoleManagement />}
                />
                <Route
                  path="/dashboard/admin-management"
                  element={<AdminManagement />}
                />
                <Route path="/dashboard/view" element={<View />} />
                <Route
                  path="/dashboard/vendorwise-pending/single/:id/:name"
                  element={<VendorWisePendingSingle />}
                />
                <Route
                  path="/dashboard/vendorwise-pending/details/:id/:param1/:param2"
                  element={<VendorWisePendingDetails />}
                />
                <Route
                  path="/dashboard/officewise-pending/single/:id/:param1/:param2"
                  element={<OfficeWisePendingSingle />}
                />
                <Route
                  path="/dashboard/officewise-pending/details/:id/:name"
                  element={<OfficeWisePendingDetails />}
                />
                <Route
                  path="/dashboard/agentwise-pending-district/:id/:name"
                  element={<AgentWisePendingDistrict />}
                />
                <Route
                  path="/dashboard/agentwise-pending-assigned-verification/:id/:name"
                  element={<AgentAssignedVerification />}
                />
              </Switch>
            </Routes>
          </Suspense>
        </MainContainer>

        {/* <Box component="main" sx={{ width: "100%" }}>
          <DrawerHeader />
          <Suspense
            fallback={
              <Box>
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Switch>
              <Route
                  path="/dashboard/meter-reading"
                  element={<MeterReading />}
                />
              </Switch>
            </Routes>
          </Suspense>
        </Box> */}
      </BoxContainer>
    );
  }
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Routes = styled.div`
  width: 100%;
  margin: 0;
  padding: 0px 10px 10px 10px;
  /* margin-left: auto; */
  background: #f2f6f5;
`;

const StyledListItem = styled1(ListItemButton)`
    background-color: ${({ is_collapse, name }) =>
      is_collapse === name ? "#001B54" : ""};
    color: ${({ is_collapse, name }) =>
      is_collapse === name ? "#fff" : "#001B54"};
    &:hover {
        background-color: ${({ is_collapse, name }) =>
          is_collapse === name ? "#001B54" : ""};
    }
    display: block;
    // justify-content: space-between;
    padding: 0px !important;
    font-size: 14px;
    font-weight: ${({ is_collapse, name }) =>
      is_collapse === name ? "bold" : ""};
`;

const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  // padding: 4px 10px;
  align-items: center;
  width: 90%;
  // color: ${({ is_collapse, name }) =>
    is_collapse === name ? "#fff" : "#001B54"};
  margin-left: 15px;
`;

const IconDiv = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${({ open }) => (open ? "0px" : "0px 19px 0px 8px")};
`;

const ListItemDIv = styled(ListItemText)`
  &.items {
    && p,
    span {
      font-weight: 500 !important;
      font-size: 13px;
      color: ${({ is_collapse, name }) =>
        is_collapse === name ? "#fff" : "#001B54"};
    }
    margin-left: 20px;
  }
  &.head {
    margin-left: 10px;
  }
  &.multi-line {
    && p,
    span {
      color: ${({ is_collapse, name }) =>
        is_collapse === name ? "#fff" : "#001B54"};
      font-size: 15px;
      font-weight: 500 !important;
    }
  }
  && span {
    /* font-weight: 500 !important; */
    font-weight: ${({ is_main }) =>
      is_main == "true" ? "700 !important" : "500 !important"};
  }
`;

const BoxContainer = styled(Box)`
  &.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0.MuiDrawer-paper {
    ::-webkit-scrollbar {
      display: none !important;
    }
    box-shadow: 0px 5px 6px 2px rgba(0, 0, 0, 0.15) !important;
  }
`;

const AppBarDiv = styled(AppBar)`
  &.MuiPaper-root {
    box-shadow: none !important;
    background-color: #f2f6f5 !important;
  }
  @media only screen and (max-width: 480px) {
    display: none !important;
  }
`;

const HeaderContainer = styled(Toolbar)`
  background-color: #f2f6f5 !important;
  box-shadow: none !important;
  header {
    box-shadow: none !important;
  }

  display: flex;
  justify-content: ${({ open }) => (open ? "flex-end" : "space-between")};
`;
const IconButtonDIv = styled(IconButton)`
  /* background-color: #001B54 !important; */
  color: #707070 !important;
  &.drawer-icon {
    margin-right: 10px;
  }
  &.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeStart {
    margin-left: -14px !important;
  }
`;

const HeaderRight = styled.div`
  color: #444445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  width: 10%;
  font-size: 13px;
  font-weight: 500;
`;

const ImgDiv = styled.div`
  width: 22px;
  height: 22px;
  opacity: 0.7;
`;

const SideMenuTextLink = styled(Link)`
  display: flex;
  text-decoration: unset;
  color: unset;
  margin-bottom: 10px;
  &.active {
    background-color: red;
  }
  /* color: #fff; */
  /* padding: 10px 10px; */
  /* display: inline-block; */
  /* width: 100%; */
`;
