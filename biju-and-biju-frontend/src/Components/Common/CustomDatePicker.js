import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";

export default function CustomDatePicker(props) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateInput
        variant="inline"
        open={props.open}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

const DateInput = styled(DatePicker)`
  &.MuiFormControl-root.MuiTextField-root.DatePickItem__DateInput-sc-162swjg-0 {
    width: 160px !important;
  }
  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
    border-radius: 6px;
  }
  input {
    padding: 9.5px;
    padding-left: 12px;
    /* border-color: #D9D9D9; */
    ::placeholder {
      color: #444445 !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      opacity: unset;
    }
  }
`;
