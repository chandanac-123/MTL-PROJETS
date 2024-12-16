import React from "react";
import styled from "styled-components";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MobileSideBar from "./MobileSideBar";
import Drawer from "@mui/material/Drawer";
import HeaderMenu from "./Common/HeaderMenu";
import { useSelector } from "react-redux";
import { selectUserName } from "../Slices/authSlice";
import LogoutReasonModal from "./Common/LogoutReasonModal";

function Header() {
  const username = useSelector(selectUserName);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <MainContainer>
        <LogoContainer>
          <div onClick={() => setOpen(!open)}>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_641)">
                <path
                  d="M3.15479 5.75098H25.6548V8.25098H3.15479V5.75098ZM3.15479 14.501H25.6548V17.001H3.15479V14.501ZM3.15479 23.251H25.6548V25.751H3.15479V23.251Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_641">
                  <rect
                    width="30"
                    height="30"
                    fill="white"
                    transform="translate(0.291016 0.750977)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <img src={require("../Assets/images/logo.png")} />
          </div>
        </LogoContainer>

        <Container>
          <HeaderMenu />
          {/* <span>{username}</span> */}
          {/* <ImgDiv>
            <SearchOutlinedIcon />
        </ImgDiv>
        <ImgDiv>
            <SettingsOutlinedIcon />
        </ImgDiv>
        
        <span>admin</span> */}
        </Container>
      </MainContainer>
      <DrawerMobItem
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: 500,
        }}
      >
        <MobileSideBar setOpen={setOpen} open={open} />
      </DrawerMobItem>
      <LogoutReasonModal />
    </>
  );
}

export default Header;

const DrawerMobItem = styled(Drawer)`
  &.MuiDrawer-paper.MuiDrawer-paperAnchorLeft {
    /* width: 80% !important; */
    /* @media only screen and (max-width: 480px) {
      width: 80% !important;
    } */
  }
  @media only screen and (min-width: 481px) {
    display: none;
  }
`;

const ImgDiv = styled.div`
  width: 20px;
  height: 20px;
  opacity: 0.7;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  width: 84%;
  @media only screen and (max-width: 480px) {
    justify-content: space-between;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 8%;
  margin-right: 20px;
`;
const LogoContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  @media only screen and (min-width: 481px) {
    display: none;
  }
`;
