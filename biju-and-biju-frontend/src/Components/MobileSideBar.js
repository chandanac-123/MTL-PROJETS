// import * as React from 'react';
import { styled as styled1, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import styled from "styled-components";
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
import { selectUserName } from "../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { collapseSuccess } from "../Slices/commonSlice";

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

export default function SideBar(props) {
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

  useEffect(() => {
    dispatch(collapseSuccess(open));
  }, [open]);

const parentRole=[
  'verification',
  'report submitted',
  'admin',
  'add mandatory',
  'user',
  'setting',
  'TAT reports'
]  

  const handleClick = (type) => {
    // mysolution
    if(!parentRole.includes(type)){
      props?.setOpen(false)
    }
    let collapse_type = type;
    // const sidebars=["admin","verification","reports"]
    // if(sidebars.includes(type)&&!open){
    //   setOpen(true);
    // }
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
                      <img src={require("../Assets/images/activeIcon2.png")} />
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
      </BoxContainer>
    );
  }
}

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
  width: 300px !important;
  &.MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation0.MuiDrawer-paper {
    ::-webkit-scrollbar {
      display: none !important;
    }
    box-shadow: 0px 5px 6px 2px rgba(0, 0, 0, 0.15) !important;
  }
  ul {
    width: 100% !important;
  }
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
