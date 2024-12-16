import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function TextFieldItem(props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.\d*)\..*$/, "$1");
    const [integerPart, decimalPart] = inputValue.split(".");
    const limitedIntegerPart = integerPart ? integerPart.slice(0, 10) : "";
    const limitedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : "";
    const limitedValue =
      decimalPart !== undefined
        ? `${limitedIntegerPart}.${limitedDecimalPart}`
        : limitedIntegerPart;
    e.target.value = limitedValue;
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <>
        {props.textField === "Password" && (
          <TextInput
            id="outlined-basic"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconEye
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconEye>
              ),
            }}
            error
            helperText={props.required ? "*Please enter password" : ""}
            variant="outlined"
            placeholder={props.placeholder}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            multiline={props.multiLine ? props.multiLine : false}
            rows={props.row ? props.row : 3}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
          />
        )}

        {props.textField === "Numeric" && (
          <TextInput
            id="outlined-basic"
            variant="outlined"
            error
            helperText={props.required ? "*Please enter a numeric value" : ""}
            placeholder={props.placeholder}
            onInput={(e) => {
              const target = e.target;
              target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={{ maxLength: 10 }}
          />
        )}
        {props.textField === "DecimalVal" && (
          <TextInput
            id="outlined-basic"
            variant="outlined"
            error
            helperText={props.required ? "*Please enter a numeric value" : ""}
            placeholder={props.placeholder}
            // onInput={(e) => {
            //   const target = e.target;
            //   target.value = e.target.value.replace(/[^0-9]/g, "");
            // }}
            onInput={handleInputChange}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={{ maxLength: 10 }}
          />
        )}
        {props.textField === "Text" && (
          <TextInput
            id="outlined-basic"
            type="text"
            variant="outlined"
            error
            helperText={props.required ? "*Please enter a value" : ""}
            placeholder={props.placeholder}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            multiline={props.multiLine ? props.multiLine : false}
            rows={props.row ? props.row : 3}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={
              {
                // maxLength: 100,
              }
            }
            disabled={props.disabled ? props.disabled : false}
          />
        )}
        {props.textField === "Email" && (
          <TextInput
            id="outlined-basic"
            type="email"
            error
            helperText={
              props.required
                ? props.required && props.value
                  ? "*Please enter a valid email"
                  : "*Please enter a email"
                : ""
            }
            variant="outlined"
            placeholder={props.placeholder}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            multiline={props.multiLine ? props.multiLine : false}
            rows={props.row ? props.row : 3}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={{
              maxLength: 50,
            }}
          />
        )}
        {props.textField === "PhoneNum" && (
          <TextInput
            id="outlined-basic"
            variant="outlined"
            error
            helperText={
              props.required
                ? props.required && props.value
                  ? "*Please enter a valid phone number"
                  : "*Please enter a phone number"
                : ""
            }
            placeholder={props.placeholder}
            onInput={(e) => {
              const target = e.target;
              target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={{ maxLength: 10 }}
          />
        )}
        {props.textField === "DistanceVal" && (
          <TextInput
            id="outlined-basic"
            variant="outlined"
            error
            helperText={props.required ? "*Please enter a numeric value" : ""}
            placeholder={props.placeholder}
            onInput={(e) => {
              const target = e.target;
              target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onChange={(e) => props.handleChange(e)}
            value={props.value ? props.value : ""}
            name={props.name ? props.name : ""}
            fpadding={props.fpadding}
            fpadding_left={props.fpadding_left}
            inputProps={{ maxLength: 3 }}
          />
        )}
        {/* {props.required ? <ErrorMsg>*Mandatory Field </ErrorMsg> : null} */}
      </>
    </Box>
  );
}

const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
`;

const TextInput = styled(TextField)`
  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
    border-radius: 6px;
  }
  input {
    /* padding: 9.5px; */
    padding: ${({ fpadding }) => (fpadding ? fpadding : "9.5px")};
    padding-left: ${({ fpadding_left }) =>
      fpadding_left ? fpadding_left : "12px"};
    /* padding-left: 12px; */
    /* border-color: #D9D9D9; */
    ::placeholder {
      color: #444445 !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      opacity: unset;
    }
  }
  textarea {
    padding: 9.5px;
    padding-left: 12px;
    ::placeholder {
      color: #444445 !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      opacity: unset;
    }
  }
`;

const IconEye = styled.div`
  color: slategrey;
`;
