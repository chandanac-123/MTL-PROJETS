import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";

export default function DatePickItem(props) {
  const [value, setValue] = React.useState(props.value);

  useEffect(() => {
    if (value && props.handleChange) {
      props.handleChange(value, props.name);
    }
  }, [value]);

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  useEffect(() => {
    if (props.is_reset) {
      setValue(null);
    }
  }, [props.is_reset]);

  return (
    <>
      {props.readOnly ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateInput
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            disablePast
            disableFuture
            // inputFormat="YYYY-MM-DD"
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                readOnly
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />
        </LocalizationProvider>
      ) : (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateInput
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            // inputFormat="YYYY-MM-DD"
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: props.placeholder
                    ? props.placeholder
                    : "Select Date",
                }}
              />
            )}
          />
          <div>
            {props.required ? <ErrorMsg>*Please select a date</ErrorMsg> : null}
          </div>
        </LocalizationProvider>
      )}
    </>
  );
}

const DateInput = styled(DatePicker)`
  &.MuiFormControl-root.MuiTextField-root.DatePickItem__DateInput-sc-162swjg-0 {
    width: 168px !important;
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
const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
  margin-left: 16px;
`;
