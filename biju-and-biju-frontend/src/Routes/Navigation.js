import React, { lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import { ButtonBase, CircularProgress } from "@mui/material";
import { useLocation, useNavigate, Routes as Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { menus } from "./routes";
import { CheckNavigationPermission } from "../Functions/utils";
import {
  logOutSuccess,
  selectAccess,
  selectRefresh,
} from "../Slices/authSlice";
import { time_tracker_active } from "../Api/TimeTrackerAPIs";
import axios from "axios";
import { logoutUrl } from "../Api/AuthApis";

function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const permissions = useSelector((state) => state.auth.permissions);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const users = [
    "GroupLeader",
    "ProductCoordinator",
    "TeamMember",
    "DistrictCoordinator",
    "ExecutiveOfficeAdmin",
  ];
  const access = useSelector(selectAccess);
  // const refresh = useSelector(selectRefresh);
  const refresh = JSON.parse(localStorage.getItem("auth"))?.refresh;
  const user_type = useSelector((state) => state.auth.user_type);

  // this useEffect is for to check user inactivity
  useEffect(() => {
    let inactivityTimer = null;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(callAPI, 600000); // 10 minutes (10 minutes * 60 seconds * 1000 milliseconds)
    };

    const callAPI = async () => {
      // Call your API here
      if (users.includes(user_type)) {
        // try{
        //     let url = time_tracker_active
        //     const result = axios.get(url,
        //         { headers: {"Authorization" : `Bearer ${access}`} })
        //     console.log(result);

        // }catch (error) {
        //     console.log(error);
        // }
        const currentDate = new Date();
        try {
          const loginResponse = await axios.post(
            logoutUrl,
            {
              refresh_token: refresh,
              logout_time: currentDate,
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
      }
    };

    const handleActivity = () => {
      resetTimer();
    };

    // Attach event listeners
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("scroll", handleActivity);

    // Start the inactivity timer
    resetTimer();

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimer);
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("scroll", handleActivity);
    };
  }, []);

  // end here--------------

  useEffect(() => {
    if (isAuth === false) {
      navigate(`/signin`);
    } else {
      setLoading(false);
      if (pathname === "/") {
        let path = CheckNavigationPermission();
        // navigate(`/dashboard`);
        navigate(path);
      } else {
        navigate(pathname);
      }
    }
  }, []);

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
      <Container>
        <Header />
        <MenuContainer>
          <SideBar />
          <Suspense
            fallback={
              <Box>
                <CircularProgress />
              </Box>
            }
          >
            {/* <Routes>
              <Switch>
              </Switch>
            </Routes> */}
          </Suspense>
        </MenuContainer>
      </Container>
    );
  }
}

export default Navigation;

const Container = styled.div`
  background-image: linear-gradient(22deg, #ecf2f0, #f5f8f7);
  padding-bottom: 10px;
  /* width: 100vw; */
  min-height: 100vh;
  overflow: hidden;
  @media only screen and (max-width: 480px) {
    /* padding: 40px; */
  }
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* padding-bottom: 10px; ; */
`;
const Routes = styled.div`
  /* width: 86.4%; */
  margin: 0;
  /* margin-left: 67px; */
  margin-top: 67px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px;
  /* background-color: #ffffff; */
  /* min-height: 100vh; */
  border-radius: 6px;
`;

const Box = styled.div`
  width: 100%;
  height: 80vh;
  /* width: 96%; */
  display: grid;
  place-items: center;
`;
