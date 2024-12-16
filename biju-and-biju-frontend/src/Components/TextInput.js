import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";

export default function TextInput() {
  return (
    <TextInputField
      id="outlined-start-adornment"
      sx={{ m: 0, width: "100%" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img src={require("../Assets/images/Vectoruserlogo.png")} />
          </InputAdornment>
        ),
      }}
    />
  );
}

const TextInputField = styled(TextField)``;
