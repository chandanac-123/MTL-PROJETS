import * as React from "react";
import styled from "styled-components";

export default function RedStarItem(props) {
  return <RedItem>*</RedItem>;
}

const RedItem = styled.span`
  color: red;
`;
