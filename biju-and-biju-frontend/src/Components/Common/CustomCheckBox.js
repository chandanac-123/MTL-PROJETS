import React from "react";
import styled from "styled-components";

function CustomCheckBox(props) {
  return (
    <Container className={`checkbox-wrapper ${props?.class}`}>
      {props.ticked ? (
        <img src={require("../../Assets/images/checked.png")} />
      ) : (
        <img src={require("../../Assets/images/unchecked.png")} />
      )}
    </Container>
  );
}

export default CustomCheckBox;

const Container = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &.no-margin {
    margin-right: 5px;
  }
`;
