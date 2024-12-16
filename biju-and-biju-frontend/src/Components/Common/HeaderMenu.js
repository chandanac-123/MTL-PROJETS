import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  logOutSuccess,
  selectAccess,
  selectRefresh,
} from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { logoutUrl } from "../../Api/AuthApis";
import axios from "axios";
import LogoutReasonModal from "./LogoutReasonModal";

export default function HeaderMenu() {
  const access = useSelector(selectAccess);
  // const refresh = useSelector(selectRefresh);
  const refresh = JSON.parse(localStorage.getItem("auth"))?.refresh;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log(access);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const currentDate = new Date();
    try {
      const loginResponse = await axios.post(
        logoutUrl,
        {
          refresh_token: refresh,
          // logout_time: currentDate,
        },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      if (loginResponse.status === 200) {
        dispatch(logOutSuccess());
        navigate(`/signin`);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        dispatch(logOutSuccess());
        navigate(`/signin`);
      }
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Tooltip title="Account settings">
          {/* <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton> */}
          <SettingsOutlinedIcon onClick={handleClick} />
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate(`/reset-password`)}>
          <ListItemIcon>
            {/* <Settings fontSize="small" /> */}
            <img src={require("../../Assets/images/lock.png")} />
          </ListItemIcon>
          <Text>Change Password</Text>
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            {/* <Logout fontSize="small" /> */}
            <img src={require("../../Assets/images/logout_icon.png")} />
          </ListItemIcon>
          <Text>Logout</Text>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const ItemMenu = styled(MenuItem)``;

const Text = styled.span`
  color: #000000;
  font-size: 14px;
  font-weight: 300;
`;
