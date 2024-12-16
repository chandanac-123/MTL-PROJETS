import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import styled from "styled-components";
import { useEffect } from "react";

export default function TimePickerItem() {
  const [value, setValue] = React.useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setValue(now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePickerInput
        // label="Basic example"
        readOnly
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "hh:mm",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

const TimePickerInput = styled(TimePicker)`
  width: 80% !important;
  border-radius: 4px !important;
  background-color: #0984e3;
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
  &.MuiFormControl-root.MuiTextField-root.TimePickerItem__TimePickerInput-sc-zk5zjj-0 {
    background-color: #0984e3;
  }
`;
