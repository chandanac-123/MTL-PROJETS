import React from "react";
import styled from "styled-components";

function DashboardMobileBox(props) {
  return (
    <MainContainer color={props?.color}>
      {props.data.map((i, index) => (
        <SmallBox index={index} main_index={props.index} key={index}>
          <Item index={props.index}>{i}</Item>
        </SmallBox>
      ))}
    </MainContainer>
  );
}

export default DashboardMobileBox;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background-color: ${({ color }) => (color ? color : "")};
  color: #fff;
  /* text-align: center; */
`;
const SmallBox = styled.div`
  width: 100%;
  border: 1px solid white;
  height: 40px;
  padding: 1px;
  background-color: ${({ index }) =>
    index === 0 ? "rgba(0,0,0,0.2)" : "unset"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Item = styled.span`
  font-size: ${({ index }) => (index == 0 ? "13px" : "12px")};
  font-weight: ${({ index }) => (index == 0 ? "700" : "600")};
`;
