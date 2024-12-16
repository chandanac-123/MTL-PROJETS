import * as React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import { get_formatted_date } from "../../Functions/utils";

export default function HidedDatePicker(props) {
  const handleCHange = (newValue) => {
    // let formatted_date = get_formatted_date(newValue)
    props.setValue(newValue);
    props.setOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateInput
        variant="inline"
        open={props.open}
        value={props.value}
        onChange={(newValue) => handleCHange(newValue)}
        format="DD-MM-YYYY"
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
  padding: 0px !important;
  &.MuiFormControl-root.MuiTextField-root.DatePickItem__DateInput-sc-162swjg-0 {
    width: 0px !important;
    padding: 0px !important;
  }
  fieldset {
    width: 0px !important;
    border: none !important;
  }
  input {
    width: 0px !important;
    padding: 0px !important;
  }
  button {
    display: none !important;
  }
  div {
    padding: 0px !important;
  }
`;
