import React from "react";
import styled from "styled-components";

function DashboardBox(props) {
  console.log(props.data, "props.data");
  return (
    <MainContainer color={props.color}>
      {props.data.map((i, index) => (
        <SmallBox index={index} main_index={props.index} key={index}>
          <Item>{i}</Item>
        </SmallBox>
      ))}
    </MainContainer>
  );
}

export default DashboardBox;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ color }) => (color ? color : "")};
  width: 16%;
  text-align: center;
  /* @media only screen and (max-width: 480px) {
      display: none !important;
    } */
`;
const SmallBox = styled.div`
  color: #ffffff;
  width: 83%;
  padding: ${({ index }) => (index === 2 ? "15px 0px" : "15px")};
  padding-bottom: ${({ index }) => (index === 3 ? "25px" : "")};
  font-size: ${({ index }) => (index === 0 ? "16px" : "22px")};
  font-weight: ${({ index }) => (index === 0 ? "900" : "600")};
  letter-spacing: 0.03em;
  height: 40px;
  z-index: 2;
  border-radius: ${({ index }) => (index === 0 ? "8px" : "unset")};
  background-color: ${({ index }) =>
    index === 0 ? "rgba(0,0,0,0.2)" : "unset"};
  display: flex;
  justify-content: ${({ index, main_index }) =>
    main_index === 0 && index !== 0 ? "left" : "center"};
  align-items: center;
  border-top: ${({ index }) =>
    index === 2 ? "2px solid rgba(255, 255, 255, 0.4)" : "unset"};
  border-bottom: ${({ index }) =>
    index === 2 ? "2px solid rgba(255, 255, 255, 0.4)" : "unset"};
`;

const Item = styled.span``;
