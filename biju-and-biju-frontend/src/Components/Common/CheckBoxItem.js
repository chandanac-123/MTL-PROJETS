import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styled from "styled-components";

export default function CheckBoxItem(props) {
  return (
    <FormContainer ml={props.ml}>
      <FormControlLabelItem
        clr={props.clr}
        control={
          <CheckInput
            checked={props.ticked}
            onClick={() => (props.handleChange ? props.handleChange() : null)}
          />
        }
        label={props.label}
      />
    </FormContainer>
  );
}

const FormContainer = styled(FormGroup)`
  margin-left: ${({ ml }) => (ml ? ml : "0px")};
  label {
    margin-right: ${({ mr }) => (mr ? mr : "0px")};
  }
`;

const FormControlLabelItem = styled(FormControlLabel)`
  span {
    font-size: 12px !important;
    font-weight: 600 !important;
    /* color: #000000 !important; */
    color: ${({ clr }) => (clr ? clr : "#000000 !important")};
  }
`;

const CheckInput = styled(Checkbox)`
  color: "red !important";
  &.Mui-checked {
    color: "#132756";
  }
`;
