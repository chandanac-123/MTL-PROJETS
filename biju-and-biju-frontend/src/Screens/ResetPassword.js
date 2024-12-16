import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { reset_password } from "../Api/AuthApis";
import axios from "axios";
import { selectAccess } from "../Slices/authSlice";
import { useSelector } from "react-redux";

function ResetPassword() {
  const access = useSelector(selectAccess);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleMouseDownOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [state, setState] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    validation_err: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, password } = state;
    let validation_err = state.validation_err;
    try {
      const loginResponse = await axios.patch(
        reset_password,
        {
          old_password: password,
          new_password: newPassword,
        },
        { headers: { Authorization: `Bearer ${access}` } }
      );
      if (loginResponse.data.success) {
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      validation_err =
        error.response.data.error ||
        error.response.data.new_password[0] ||
        error.response.data.old_password[0];
    }
    setState((prevState) => {
      return {
        ...prevState,
        validation_err,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        validation_err: false,
      };
    });
  };
  return (
    <MainContainer>
      <Container>
        <SignupContainer
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
        >
          <SignUpLogoContainer>
            <img src={require("../Assets/images/logo.png")} alt="" />
          </SignUpLogoContainer>
          <Heading>Reset your password</Heading>

          <InputContainer>
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="Old Password"
              name="password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={require("../Assets/images/Vectorpaswdlogo.png")}
                      alt=""
                    />
                  </InputAdornment>
                ),
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
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="New Password"
              type={showOldPassword ? "text" : "password"}
              name="newPassword"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={require("../Assets/images/Vectorpaswdlogo.png")}
                      alt=""
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconEye
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownOldPassword}
                  >
                    {showOldPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconEye>
                ),
              }}
            />
          </InputContainer>
          <InputContainer>
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={require("../Assets/images/Vectorpaswdlogo.png")}
                      alt=""
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconEye
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconEye>
                ),
              }}
            />
            {state.validation_err ? (
              <ErrorMsg>{state.validation_err}</ErrorMsg>
            ) : state.newPassword !== state.confirmPassword ? (
              <ErrorMsg>
                {" "}
                Password and confirm password does not match.
              </ErrorMsg>
            ) : null}
          </InputContainer>
          <ButtonContainer>
            <RightDiv>
              <StyledButton variant="contained" type="submit">
                Submit
              </StyledButton>
            </RightDiv>
          </ButtonContainer>
        </SignupContainer>
      </Container>
    </MainContainer>
  );
}

export default ResetPassword;

const IconEye = styled.div`
  color: slategrey;
  cursor: pointer;
`;

const TextInput = styled(TextField)`
  // &.MuiInputBase-root-MuiOutlinedInput-root {
  //     border-radius: 10px !important;
  //     padding-left: 26px !important;
  // }
  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
  }
  input {
    padding: 12.5px;
    padding-left: 12px;
    /* border-color: #D9D9D9; */
  }
`;
const Heading = styled.h2`
  text-align: center;
  margin: unset;
  color: #464e5f;
  margin-bottom: 10px;
`;
const RightDiv = styled.div`
  width: 30%;
  display: flex;

  button {
    text-transform: none !important;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SignUpLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  && {
    width: 80%;
    height: 40px;
    background: #132756;
    border-radius: 8.75px;
  }
`;
const InputContainer = styled.div``;

const SignupContainer = styled.form`
  width: 470px;
  padding: 40px 40px 0px 40px;
  height: 390px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background-color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  //   background-color: #FFFFFF;
`;

const MainContainer = styled.div`
  display: flex;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100vh;
`;

const ErrorMsg = styled.span`
  font-size: 11px;
  color: red;
`;
