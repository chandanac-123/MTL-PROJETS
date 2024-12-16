import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import styled from "styled-components";
import { FormHelperText } from "@mui/material";

export default function TextInputOkEnd(props) {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.\d*)\..*$/, "$1");
    const [integerPart, decimalPart] = inputValue.split(".");
    const limitedIntegerPart = integerPart ? integerPart.slice(0, 3) : "";
    const limitedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : "";
    const limitedValue =
      decimalPart !== undefined
        ? `${limitedIntegerPart}.${limitedDecimalPart}`
        : limitedIntegerPart;
    e.target.value = limitedValue;
  };

  return (
    <>
      <PaperItem
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          maxWidth: 367,
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder={props.placeholder}
          inputProps={{ "aria-label": "search google maps", maxLength: 6 }}
          // onInput={(e) => {
          //   const target = e.target;
          //   target.value = e.target.value.replace(/[^0-9]/g, "");
          // }}
          onInput={handleInputChange}
          onChange={(e) => props.handleChange(e)}
          value={props.value ? props.value : ""}
          name={props.name ? props.name : ""}
        />

        {props.show_button ? (
          <OkButton onClick={() => props.handleOk(props.type_name)}>
            OK
          </OkButton>
        ) : null}
      </PaperItem>
      {props.required ? (
        <FormHelperText error style={{ marginLeft: "20px" }}>
          *Please enter the distance
        </FormHelperText>
      ) : (
        ""
      )}
    </>
  );
}

const PaperItem = styled(Paper)`
  &.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.TextInputOkEnd__PaperItem-sc-13z8gl3-0 {
    box-shadow: none !important;
    border: 1px solid #d9d9d9 !important;
    border-radius: 6px;
    padding: 4px !important;
  }
  &.MuiInputBase-root.MuiInputBase-colorPrimary.css-f3a06d-MuiInputBase-root {
    padding: 3px 0px;
  }
`;
const OkButton = styled.span`
  background-color: #132756;
  color: #fff;
  padding: 12px 20px;
  border-radius: 0px 6px 6px 0px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
