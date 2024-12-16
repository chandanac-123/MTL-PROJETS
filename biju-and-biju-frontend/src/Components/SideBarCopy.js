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
import { isActive, Page } from "../Functions/utils";
import { style } from "@mui/system";
import HeaderMenu from "./Common/HeaderMenu";
import { selectUserName } from "../Slices/authSlice";
import { useSelector } from "react-redux";

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
}));

export default function SideBar() {
  const username = useSelector(selectUserName);
  const { pathname } = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [close, setClose] = React.useState(isActive(pathname)[1]);
  const [is_collapse, setCollapse] = React.useState(isActive(pathname)[0]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setClose("");
  };

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
      type === "role management"
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
              <MenuIcon />
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
            <StyledListItem
              onClick={() => handleClick("dashboard")}
              is_collapse={is_collapse}
              name="dashboard"
            >
              <SideMenuTextLink to="/dashboard">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "dashboard" ? (
                      <img src={require("../Assets/images/dashicon.png")} />
                    ) : (
                      <img
                        src={require("../Assets/images/inactivedashIcon.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Dashboard" />
                </MenuDiv>
                {is_collapse === "dashboard" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
            <StyledListItem
              onClick={() => handleClick("verification")}
              is_collapse={is_collapse}
              name="verification"
            >
              <SideMenuTextLink to="/dashboard/verification">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "verification" ? (
                      <img
                        src={require("../Assets/images/activeVeifyIcon.png")}
                      />
                    ) : (
                      <img src={require("../Assets/images/veriflogo.png")} />
                    )}
                  </IconDiv>
                  <ListItemDIv
                    className="head"
                    primary="Verification"
                    is_main={handleMainActive("verification")}
                  />
                  {close === "report submitted" || close === "verification" ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </MenuDiv>
                {is_collapse === "verification" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
            <Collapse
              in={
                close === "report submitted" || close === "verification"
                  ? true
                  : false
              }
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                style={{ backgroundColor: "rgba(0, 27, 84, 0.06)" }}
              >
                <StyledListItem
                  onClick={() => handleClick("assigned verification")}
                  is_collapse={is_collapse}
                  name="assigned verification"
                >
                  <SideMenuTextLink to="/dashboard/assigned-verification">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Assigned Verification"
                        is_collapse={is_collapse}
                        name="assigned verification"
                      />
                    </MenuDiv>
                    {is_collapse === "assigned verification" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("report received")}
                  is_collapse={is_collapse}
                  name="report received"
                >
                  <SideMenuTextLink to="/dashboard/reports-recieved">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Report Received"
                        is_collapse={is_collapse}
                        name="report received"
                      />
                    </MenuDiv>
                    {is_collapse === "report received" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("report submitted")}
                  is_collapse={is_collapse}
                  name="report submitted"
                >
                  <SideMenuTextLink to="/dashboard/reports-submitted">
                    <MenuDiv>
                      <IconDiv open={open}>
                        {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                        :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                      </IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Report Submitted"
                        is_collapse={is_collapse}
                        name="report submitted"
                      />
                      {/* {is_collapse === "report submitted" || is_collapse === "report edit" || is_collapse === "report confirm" || is_collapse === "database"  ? <ExpandLess /> : <ExpandMore />} */}
                      {close === "report submitted" ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </MenuDiv>
                    {is_collapse === "report submitted" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <Collapse
                  in={close === "report submitted" ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("report edit")}
                      is_collapse={is_collapse}
                      name="report edit"
                    >
                      <SideMenuTextLink to="/dashboard/reports-edit">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Reports Edit"
                            is_collapse={is_collapse}
                            name="report edit"
                          />
                        </MenuDiv>
                        {is_collapse === "report edit" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("report confirm")}
                      is_collapse={is_collapse}
                      name="report confirm"
                    >
                      <SideMenuTextLink to="/dashboard/reports-confirm">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Reports Confirm"
                            is_collapse={is_collapse}
                            name="report confirm"
                          />
                        </MenuDiv>
                        {is_collapse === "report confirm" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("database")}
                      is_collapse={is_collapse}
                      name="database"
                    >
                      <SideMenuTextLink to="/dashboard/database">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Database"
                            is_collapse={is_collapse}
                            name="database"
                          />
                        </MenuDiv>
                        {is_collapse === "database" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>
                  </List>
                </Collapse>
              </List>
            </Collapse>

            <StyledListItem
              onClick={() => handleClick("admin")}
              is_collapse={is_collapse}
              name="admin"
            >
              <SideMenuTextLink to="/dashboard/add-product">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "admin" ? (
                      <img src={require("../Assets/images/admin.png")} />
                    ) : (
                      <img src={require("../Assets/images/admin.png")} />
                    )}
                  </IconDiv>
                  <ListItemDIv
                    className="head"
                    primary="Admin"
                    is_main={handleMainActive("admin")}
                  />
                  {close === "admin" ||
                  close === "add mandatory" ||
                  close === "user" ||
                  close === "setting" ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </MenuDiv>
                {is_collapse === "admin" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
            <Collapse
              in={
                close === "admin" ||
                close === "add mandatory" ||
                close === "user" ||
                close === "setting"
                  ? true
                  : false
              }
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                style={{ backgroundColor: "rgba(0, 27, 84, 0.06)" }}
              >
                <StyledListItem
                  onClick={() => handleClick("add product")}
                  is_collapse={is_collapse}
                  name="add product"
                >
                  <SideMenuTextLink to="/dashboard/add-product">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Add Product"
                        is_collapse={is_collapse}
                        name="add product"
                      />
                    </MenuDiv>
                    {is_collapse === "add product" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("add holidays")}
                  is_collapse={is_collapse}
                  name="add holidays"
                >
                  <SideMenuTextLink to="/dashboard/add-holidays">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Add Holidays"
                        is_collapse={is_collapse}
                        name="add holidays"
                      />
                    </MenuDiv>
                    {is_collapse === "add holidays" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("add mandatory")}
                  is_collapse={is_collapse}
                  name="add mandatory"
                >
                  <SideMenuTextLink to="/dashboard/add-mandatory">
                    <MenuDiv>
                      <IconDiv open={open}>
                        {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                        :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                      </IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Add Mandatory"
                        is_collapse={is_collapse}
                        name="add mandatory"
                      />
                      {/* {is_collapse === "add mandatory" || is_collapse === "report edit" || is_collapse === "report confirm" || is_collapse === "database"  ? <ExpandLess /> : <ExpandMore />} */}
                      {close === "add mandatory" ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </MenuDiv>
                    {is_collapse === "add mandatory" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <Collapse
                  in={close === "add mandatory" ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("vendor specific fields")}
                      is_collapse={is_collapse}
                      name="vendor specific fields"
                    >
                      <SideMenuTextLink to="/dashboard/vendor-specific-fields">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Vendor Specific Fields"
                            is_collapse={is_collapse}
                            name="vendor specific fields"
                          />
                        </MenuDiv>
                        {is_collapse === "vendor specific fields" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>
                  </List>
                </Collapse>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("user")}
                  is_collapse={is_collapse}
                  name="user"
                >
                  <SideMenuTextLink to="/dashboard/add-user">
                    <MenuDiv>
                      <IconDiv open={open}>
                        {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                        :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                      </IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="User"
                        is_collapse={is_collapse}
                        name="user"
                      />
                      {/* {is_collapse === "user" || is_collapse === "report edit" || is_collapse === "report confirm" || is_collapse === "database"  ? <ExpandLess /> : <ExpandMore />} */}
                      {close === "user" ? <ExpandLess /> : <ExpandMore />}
                    </MenuDiv>
                    {is_collapse === "user" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <Collapse
                  in={close === "user" ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("add user")}
                      is_collapse={is_collapse}
                      name="add user"
                    >
                      <SideMenuTextLink to="/dashboard/add-user">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Add User"
                            is_collapse={is_collapse}
                            name="add user"
                          />
                        </MenuDiv>
                        {is_collapse === "add user" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("user settings")}
                      is_collapse={is_collapse}
                      name="user settings"
                    >
                      <SideMenuTextLink to="/dashboard/user-settings">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="User Settings"
                            is_collapse={is_collapse}
                            name="user settings"
                          />
                        </MenuDiv>
                        {is_collapse === "user settings" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("add vendor")}
                      is_collapse={is_collapse}
                      name="add vendor"
                    >
                      <SideMenuTextLink to="/dashboard/add-vendor">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Add Vendor"
                            is_collapse={is_collapse}
                            name="add vendor"
                          />
                        </MenuDiv>
                        {is_collapse === "add vendor" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>
                  </List>
                </Collapse>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("setting")}
                  is_collapse={is_collapse}
                  name="setting"
                >
                  <SideMenuTextLink to="/dashboard/billing-location">
                    <MenuDiv>
                      <IconDiv open={open}>
                        {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                        :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                      </IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Setting"
                        is_collapse={is_collapse}
                        name="setting"
                      />
                      {/* {is_collapse === "setting" || is_collapse === "report edit" || is_collapse === "report confirm" || is_collapse === "database"  ? <ExpandLess /> : <ExpandMore />} */}
                      {close === "setting" ? <ExpandLess /> : <ExpandMore />}
                    </MenuDiv>
                    {is_collapse === "setting" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <Collapse
                  in={close === "setting" ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("billing location")}
                      is_collapse={is_collapse}
                      name="billing location"
                    >
                      <SideMenuTextLink to="/dashboard/billing-location">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Billing Location"
                            is_collapse={is_collapse}
                            name="billing location"
                          />
                        </MenuDiv>
                        {is_collapse === "billing location" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("district")}
                      is_collapse={is_collapse}
                      name="district"
                    >
                      <SideMenuTextLink to="/dashboard/districts">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="District"
                            is_collapse={is_collapse}
                            name="district"
                          />
                        </MenuDiv>
                        {is_collapse === "district" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>

                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("negative remarks")}
                      is_collapse={is_collapse}
                      name="negative remarks"
                    >
                      <SideMenuTextLink to="/dashboard/negative-remarks">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="Negative"
                            secondary="Remarks"
                            is_collapse={is_collapse}
                            name="negative remarks"
                          />
                        </MenuDiv>
                        {is_collapse === "negative remarks" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>
                  </List>
                </Collapse>
              </List>
            </Collapse>
            <StyledListItem
              onClick={() => handleClick("vendor billing parameter")}
              is_collapse={is_collapse}
              name="vendor billing parameter"
            >
              <SideMenuTextLink to="/dashboard/vendor-billing-parameter">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "vendor billing parameter" ? (
                      <img
                        src={require("../Assets/images/vendor_bill_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/vendor_billing.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv
                    className="head multi-line"
                    primary="Vendor Billing"
                    secondary="Parameter"
                    is_collapse={is_collapse}
                    name="vendor billing parameter"
                  />
                </MenuDiv>
                {is_collapse === "vendor billing parameter" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <StyledListItem
              onClick={() => handleClick("meter reading")}
              is_collapse={is_collapse}
              name="meter reading"
            >
              <SideMenuTextLink to="/dashboard/meter-reading">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "meter reading" ? (
                      <img src={require("../Assets/images/meterActive.png")} />
                    ) : (
                      <img
                        src={require("../Assets/images/meter_reading.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Meter Reading" />
                </MenuDiv>
                {is_collapse === "meter reading" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
            <StyledListItem
              onClick={() => handleClick("usermobile")}
              is_collapse={is_collapse}
              name="usermobile"
            >
              <SideMenuTextLink to="/dashboard/mobile-request">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "usermobile" ? (
                      <img
                        src={require("../Assets/images/mobile_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/mobile_request.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Mobile Request" />
                </MenuDiv>
                {is_collapse === "usermobile" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <StyledListItem
              onClick={() => handleClick("download image")}
              is_collapse={is_collapse}
              name="download image"
            >
              <SideMenuTextLink to="/dashboard/download-image">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "download image" ? (
                      <img
                        src={require("../Assets/images/download_active.png")}
                      />
                    ) : (
                      <img src={require("../Assets/images/download_img.png")} />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Download Image" />
                </MenuDiv>
                {is_collapse === "download image" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
            <StyledListItem
              onClick={() => handleClick("time tracker")}
              is_collapse={is_collapse}
              name="time tracker"
            >
              <SideMenuTextLink to="/dashboard/time-tracker">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "time tracker" ? (
                      <img
                        src={require("../Assets/images/time_track_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/time_track_icon.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Time Tracker" />
                </MenuDiv>
                {is_collapse === "time tracker" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <StyledListItem
              onClick={() => handleClick("worker tracker")}
              is_collapse={is_collapse}
              name="worker tracker"
            >
              <SideMenuTextLink to="/dashboard/worker-tracker">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "worker tracker" ? (
                      <img
                        src={require("../Assets/images/work_tracker_icon_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/work_tracker_icon.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Worker Tracker" />
                </MenuDiv>
                {is_collapse === "worker tracker" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <StyledListItem
              onClick={() => handleClick("reports")}
              is_collapse={is_collapse}
              name="reports"
            >
              <SideMenuTextLink to="/dashboard/verification-status-log">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "reports" ? (
                      <img src={require("../Assets/images/reports.png")} />
                    ) : (
                      <img src={require("../Assets/images/reports.png")} />
                    )}
                  </IconDiv>
                  <ListItemDIv
                    className="head"
                    primary="Reports"
                    is_main={handleMainActive("reports")}
                  />
                  {close === "TAT reports" || close === "reports" ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </MenuDiv>
                {is_collapse === "reports" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <Collapse
              in={close === "TAT reports" || close === "reports" ? true : false}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                style={{ backgroundColor: "rgba(0, 27, 84, 0.06)" }}
              >
                <StyledListItem
                  onClick={() => handleClick("verification status & log")}
                  is_collapse={is_collapse}
                  name="verification status & log"
                >
                  <SideMenuTextLink to="/dashboard/verification-status-log">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Verification"
                        secondary="Status & Log"
                        is_collapse={is_collapse}
                        name="verification status & log"
                      />
                    </MenuDiv>
                    {is_collapse === "verification status & log" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("MIS reports")}
                  is_collapse={is_collapse}
                  name="MIS reports"
                >
                  <SideMenuTextLink to="/dashboard/MIS-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="MIS Reports"
                        is_collapse={is_collapse}
                        name="MIS reports"
                      />
                    </MenuDiv>
                    {is_collapse === "MIS reports" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("payout reports")}
                  is_collapse={is_collapse}
                  name="payout reports"
                >
                  <SideMenuTextLink to="/dashboard/payout-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Payout Reports"
                        is_collapse={is_collapse}
                        name="payout reports"
                      />
                    </MenuDiv>
                    {is_collapse === "payout reports" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <StyledListItem
                  sx={{ pl: 4 }}
                  onClick={() => handleClick("TAT reports")}
                  is_collapse={is_collapse}
                  name="TAT reports"
                >
                  <SideMenuTextLink to="/dashboard/tat-reports">
                    <MenuDiv>
                      <IconDiv open={open}>
                        {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                          :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                      </IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="TAT Reports"
                        is_collapse={is_collapse}
                        name="TAT reports"
                      />
                      {/* {is_collapse === "TAT reports" || is_collapse === "report edit" || is_collapse === "report confirm" || is_collapse === "database"  ? <ExpandLess /> : <ExpandMore />} */}
                      {close === "TAT reports" ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </MenuDiv>
                    {is_collapse === "TAT reports" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <Collapse
                  in={close === "TAT reports" ? true : false}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <StyledListItem
                      sx={{ pl: 4 }}
                      onClick={() => handleClick("TAT reports visit")}
                      is_collapse={is_collapse}
                      name="TAT reports visit"
                    >
                      <SideMenuTextLink to="/dashboard/tat-report-visit">
                        <MenuDiv>
                          <IconDiv open={open}>
                            {/* {is_collapse === "verification"? <img src={require('../Assets/images/activeVeifyIcon.png')} /> 
                                :   <img src={require('../Assets/images/veriflogo.png')} />  } */}
                          </IconDiv>
                          <ListItemDIv
                            className="items"
                            primary="TAT Reports Visit"
                            is_collapse={is_collapse}
                            name="TAT reports visit"
                          />
                        </MenuDiv>
                        {is_collapse === "TAT reports visit" ? (
                          <img
                            src={require("../Assets/images/activeIcon2.png")}
                          />
                        ) : (
                          ""
                        )}
                      </SideMenuTextLink>
                    </StyledListItem>
                  </List>
                </Collapse>
                <StyledListItem
                  onClick={() => handleClick("vendor track reports")}
                  is_collapse={is_collapse}
                  name="vendor track reports"
                >
                  <SideMenuTextLink to="/dashboard/vendor-track-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Vendor Track"
                        secondary="Reports"
                        is_collapse={is_collapse}
                        name="vendor track reports"
                      />
                    </MenuDiv>
                    {is_collapse === "vendor track reports" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("billable/payable")}
                  is_collapse={is_collapse}
                  name="billable/payable"
                >
                  <SideMenuTextLink to="/dashboard/billable-payable-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Billable/Payable"
                        is_collapse={is_collapse}
                        name="billable/payable"
                      />
                    </MenuDiv>
                    {is_collapse === "billable/payable" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>

                <StyledListItem
                  onClick={() => handleClick("agentwise pending")}
                  is_collapse={is_collapse}
                  name="agentwise pending"
                >
                  <SideMenuTextLink to="/dashboard/agentwise-pending-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Agent Wise"
                        secondary="Pending"
                        is_collapse={is_collapse}
                        name="agentwise pending"
                      />
                    </MenuDiv>
                    {is_collapse === "agentwise pending" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("officewise pending")}
                  is_collapse={is_collapse}
                  name="officewise pending"
                >
                  <SideMenuTextLink to="/dashboard/officewise-pending-reports">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Office Wise"
                        secondary="Pending"
                        is_collapse={is_collapse}
                        name="officewise pending"
                      />
                    </MenuDiv>
                    {is_collapse === "officewise pending" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
                <StyledListItem
                  onClick={() => handleClick("vendorwise pending")}
                  is_collapse={is_collapse}
                  name="vendorwise pending"
                >
                  <SideMenuTextLink to="/dashboard/vendorwise-pending-reports/">
                    <MenuDiv>
                      <IconDiv open={open}></IconDiv>
                      <ListItemDIv
                        className="items"
                        primary="Vendor Wise"
                        secondary="Pending"
                        is_collapse={is_collapse}
                        name="vendorwise pending"
                      />
                    </MenuDiv>
                    {is_collapse === "vendorwise pending" ? (
                      <img src={require("../Assets/images/activeIcon2.png")} />
                    ) : (
                      ""
                    )}
                  </SideMenuTextLink>
                </StyledListItem>
              </List>
            </Collapse>

            <StyledListItem
              onClick={() => handleClick("role management")}
              is_collapse={is_collapse}
              name="role management"
            >
              <SideMenuTextLink to="/dashboard/role-management">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "role management" ? (
                      <img
                        src={require("../Assets/images/role_management_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/role_management.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv className="head" primary="Role Management" />
                </MenuDiv>
                {is_collapse === "role management" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>

            <StyledListItem
              onClick={() => handleClick("admin management")}
              is_collapse={is_collapse}
              name="admin management"
            >
              <SideMenuTextLink to="/dashboard/admin-management">
                <MenuDiv>
                  <IconDiv open={open}>
                    {is_collapse === "admin management" ? (
                      <img
                        src={require("../Assets/images/admin_manage_active.png")}
                      />
                    ) : (
                      <img
                        src={require("../Assets/images/admin_manage_icon.png")}
                      />
                    )}
                  </IconDiv>
                  <ListItemDIv
                    className="head multi-line"
                    primary="Admin"
                    secondary="Management"
                    is_collapse={is_collapse}
                    name="admin management"
                  />
                </MenuDiv>
                {is_collapse === "admin management" ? (
                  <img src={require("../Assets/images/activeIcon2.png")} />
                ) : (
                  ""
                )}
              </SideMenuTextLink>
            </StyledListItem>
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
      is_main ? "700 !important" : "500 !important"};
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
