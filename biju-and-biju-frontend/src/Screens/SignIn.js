import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { loginUrl } from "../Api/AuthApis";
import axios from "axios";
import { loginSuccess } from "../Slices/authSlice";
import { useDispatch } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    password: "",
    validation_err: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = state;
    let validation_err = state.validation_err;

    // const loginResponse = await fetch(loginUrl, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     password: password,
    //   }),
    // }).then((response) => response.json());

    try {
      const loginResponse = await axios.post(loginUrl, {
        username: username,
        password: password,
      });
      if (loginResponse.data.success) {
        dispatch(loginSuccess(loginResponse.data.data));
        navigate(`/`);
      }
    } catch (error) {
      validation_err = true;
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
            <img src={require("../Assets/images/biju-logo.png")} alt="" />
          </SignUpLogoContainer>
          <Heading>Login</Heading>
          <InputContainer>
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="Username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={require("../Assets/images/Vectoruserlogo.png")}
                      alt=""
                    />
                  </InputAdornment>
                ),
              }}
              name="username"
            />
          </InputContainer>

          <InputContainer>
            <TextInput
              id="outlined-basic"
              sx={{ m: 0, width: "100%" }}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
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
          {state.validation_err ? (
            <ErrorMsg>Invalid username or password</ErrorMsg>
          ) : null}

          <ForgotPasswordButton text="Forgot Password" type="button">
            <Link to="/forgot-password">
              Forgot <b>password</b> ?
            </Link>
            <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
              Privacy Policy
            </Link>
          </ForgotPasswordButton>

          <ButtonContainer>
            <RightDiv>
              <StyledButton variant="contained" type="submit" disableRipple>
                Login
              </StyledButton>
            </RightDiv>
          </ButtonContainer>
        </SignupContainer>
      </Container>
    </MainContainer>
  );
}

export default SignIn;

const ForgotPasswordButton = styled.button`
  cursor: pointer;
  border: none;
  background: unset;
  padding: 7px 1px 11px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: black;
  }
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
  input::-ms-reveal,
  input::-ms-clear {
    display: none;
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
  justify-content: center;
  text-align: center;
  button {
    text-transform: none !important;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -25px;
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
  height: 370px;
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
  background-color: #f2f6f5;
  height: 100vh;
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: red;
`;

const IconEye = styled.div`
  color: slategrey;
  cursor: pointer;
`;

{
  /* <TextInput
                    id="outlined-start-adornment"
                    sx={{ m: 0, width: '100%' }}
                    placeholder="Password"
                    type="password"
                    InputProps={{
                    startAdornment: <InputAdornment position="start"><img src={require('../Assets/images/Vectorpaswdlogo.png')} /></InputAdornment>,
                    }}
                    name="password"
                /> */
}
