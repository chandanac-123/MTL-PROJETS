import React from "react";
import Heading from "../../Components/Heading";
import styled from "styled-components";
import TATDetailsTable from "../../Components/Reports/TATDetailsTable";
import { useMediaQuery } from "react-responsive";
import useScreenSize from "../../common/hooks/useScreenSize";

function TATDetails(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const screenSize = useScreenSize();
  return (
    <Container isMobileScreen={isMobileScreen} height={screenSize.height}>
      <HeaderContainer>
        <HeaderTop>
          <BackIcon onClick={() => props.handleClose()}>
            <IconImg src={require("../../Assets/images/back_arrow.png")} />
          </BackIcon>
          <Heading name="TAT Details" />
        </HeaderTop>
        <HeaderRight onClick={() => props.handleClose()}>
          <img src={require("../../Assets/images/close-square-blue.png")} />
        </HeaderRight>
      </HeaderContainer>
      <TATDetailsTable
        name={props.name}
        data={props.data}
        count={props.count}
        setPage={props.setPage}
        page={props.page}
        rowsperpage={props.rowsperpage}
        setRowsPerPage={props.setRowsPerPage}
        searchParams={props.searchParams}
      />
    </Container>
  );
}

export default TATDetails;

const HeaderRight = styled.div`
  img {
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  padding: ${({ isMobileScreen }) => (isMobileScreen ? "10px" : "35px")};
  max-height: ${({ isMobileScreen, height }) =>
    isMobileScreen ? `${height - 120}px` : "unset"};
  overflow-y: ${({ isMobileScreen }) => (isMobileScreen ? "scroll" : "unset")};
  padding-bottom: 30px;
  padding-top: 30px;
  margin-top: ${({ isMobileScreen }) => (isMobileScreen ? "30px" : "0px")};
`;
const BackIcon = styled.div`
  margin-right: 40px;
  height: 18px;
  width: 13px;
  cursor: pointer;
`;

const IconImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;
const HeaderTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 25px;
`;
