import React from "react";
import styled from "styled-components";

function Heading(props) {
  return (
    <Container>
      <HeadSpan>{props.name}</HeadSpan>
    </Container>
  );
}

export default Heading;

const Container = styled.div`
  width: 95%;
  margin: 0px !important;
`;

const HeadSpan = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #464e5f;
`;
