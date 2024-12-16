import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";

export default function DatePickerItem(props) {
  // const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerInput
        // label="Basic example"
        value={props.value}
        onChange={(newValue) => {
          props.setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="dd/mm/yyyy" />
        )}
        inputFormat="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}

const DatePickerInput = styled(DatePicker)`
  width: 80% !important;
  border-radius: 4px !important;
  background-color: #00d2d3;
  fieldset {
    border-color: #fff !important;
    border-width: 1px !important;
    /* border: none !important; */
    border-radius: 4px !important;
    padding-right: 0px !important;
  }
  input {
    /* padding: 6.5px 10px; */
    padding: 6.5px 20px;
    background-color: #fff;
    border-radius: 4px !important;
    font-size: 12px;
    color: #6c6c6c;
  }

  button {
    /* background-color: red !important; */
    margin: 0px !important;
    padding: 0px !important;
  }
  svg {
    color: #fff;
  }
  &.MuiFormControl-root.MuiTextField-root.DatePickerItem__DatePickerInput-sc-1y08lm-0 {
    background-color: #00d2d3;
  }
`;
