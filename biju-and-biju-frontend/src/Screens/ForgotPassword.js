import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { get_param_url } from "../Functions/utils";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import { change_password, forgot_password } from "../Api/AuthApis";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertMessage from "../Components/Common/AlertMessage";

function ForgotPassword() {
  const token_valid = get_param_url("token_valid");
  const token = get_param_url("token");
  const uidb64 = get_param_url("uidb64");
  console.log(token_valid);
  const navigate = useNavigate();
  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });
  const [state, setState] = useState({
    email: "",
    is_submitted: false,
    password: "",
    confirm_password: "",
    category: "",
    validation_err: {
      email_err: "",
      password_err: "",
      password_confirm_err: "",
      category_err: "",
    },
    open: false,
    vertical: "top",
    horizontal: "center",
    snackMesg: "",
    severity: "success",
    navigate: false,
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if (state.navigate === true) {
      const timer = setTimeout(() => {
        navigate(`/signin`);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state.navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const handleClickShowPasswordConfirm = () =>
    setConfirmShowPassword(!confirmShowPassword);
  const handleMouseDownPasswordConfirm = () =>
    setConfirmShowPassword(!confirmShowPassword);

  function isEmail(email) {
    // Regular expression pattern for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the pattern
    return emailPattern.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const domain = window.location.href;
    const { email, password, category } = state;
    let validation_err = {
      email_err: "",
      password_err: "",
      password_confirm_err: "",
    };
    if (token_valid == null) {
      if (isEmail(email)) {
        validation_err.email_err = "";
        // console.log("okay set now call api");
        try {
          const forgotResponse = await axios.post(forgot_password, {
            email_id: email,
            redirect_url: domain,
          });
          if (forgotResponse.status === 200) {
            setState({
              ...state,
              open: true,
              snackMesg: forgotResponse.data.success,
            });
          }
        } catch (error) {
          console.log(error);
          alertErrorFun(error?.response?.data?.message);
        }
      } else {
        validation_err.email_err = "please enter a valid email";
      }
    } else if (token_valid == true || token_valid == "True") {
      if (!state.password) {
        validation_err.password_err = "required";
      } else if (!state.confirm_password) {
        validation_err.password_confirm_err = "required";
      } else if (state.password !== state.confirm_password) {
        validation_err.password_confirm_err = "password not matching";
      } else {
        try {
          const changeResponse = await axios.patch(change_password, {
            password: state.password,
            token: token,
            uidb64: uidb64,
          });
          if (changeResponse.status === 200) {
            setState({
              ...state,
              open: true,
              snackMesg: changeResponse.data.message,
              severity: "success",
              navigate: true,
            });
          }
        } catch (error) {
          let ErrorMsg = error?.response?.data?.error;
          if (!ErrorMsg) {
            ErrorMsg = error?.response?.data?.password[0];
          }
          setState({
            ...state,
            open: true,
            snackMesg: ErrorMsg,
            severity: "error",
          });
        }
      }
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
    let validation_err = state.validation_err;
    if (name === "password") {
      validation_err.password_err = "";
    } else if (name === "confirm_password") {
      validation_err.password_confirm_err = "";
    }
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        validation_err,
      };
    });
  };
  const handleClose = () => {
    setState({ ...state, open: false, snackMesg: "" });
  };

  const alertErrorFun = (msg) => {
    setSnackbarStatus({ isOpen: true, severity: "error", message: msg });
  };

  return (
    <>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      <MainContainer>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            severity={state.severity}
            sx={{ width: "100%" }}
          >
            {state.snackMesg}
          </Alert>
        </Snackbar>
        {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={state.snackMesg}
        key={vertical + horizontal}
        severity={state.severity}
        variant="filled"
      /> */}
        <Container>
          <SignupContainer
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
          >
            <HeadSection>
              <SubHead className="icons">
                <img
                  src={require("../Assets/images/arrow-circle-leftarrow.png")}
                  onClick={() => navigate("/login")}
                />
              </SubHead>
            </HeadSection>
            <SignUpLogoContainer>
              <img src={require("../Assets/images/biju-logo.png")} />
            </SignUpLogoContainer>
            <Heading>Reset Password</Heading>
            {token_valid === null ? (
              <>
                <InputContainer>
                  <TextInput
                    id="outlined-basic"
                    sx={{ m: 0, width: "100%" }}
                    placeholder="Email"
                    type="email"
                    name="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailTwoToneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {state.validation_err.email_err ? (
                    <ErrorMsg>{state.validation_err.email_err}</ErrorMsg>
                  ) : null}
                </InputContainer>

                <ButtonContainer>
                  <RightDiv>
                    <StyledButton variant="contained" type="submit">
                      Submit
                    </StyledButton>
                  </RightDiv>
                </ButtonContainer>
              </>
            ) : token_valid === true || token_valid === "True" ? (
              <>
                <InputContainer>
                  <TextInput
                    id="outlined-basic"
                    sx={{ m: 0, width: "100%" }}
                    placeholder="New Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={require("../Assets/images/Vectorpaswdlogo.png")}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconEye
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconEye>
                      ),
                    }}
                  />
                  {state.validation_err.password_err ? (
                    <ErrorMsg>{state.validation_err.password_err}</ErrorMsg>
                  ) : null}
                </InputContainer>

                <InputContainer>
                  <TextInput
                    id="outlined-basic"
                    sx={{ m: 0, width: "100%" }}
                    placeholder="Confirm Password"
                    type={confirmShowPassword ? "text" : "password"}
                    name="confirm_password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <img
                            src={require("../Assets/images/Vectorpaswdlogo.png")}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconEye
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirm}
                          onMouseDown={handleMouseDownPasswordConfirm}
                        >
                          {confirmShowPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconEye>
                      ),
                    }}
                  />
                  {state.validation_err.password_confirm_err ? (
                    <ErrorMsg>
                      {state.validation_err.password_confirm_err}
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
              </>
            ) : token_valid === false || token_valid === "False" ? (
              <>
                <ExpireMsg>Token has been expired!</ExpireMsg>
              </>
            ) : null}
          </SignupContainer>
        </Container>
      </MainContainer>
    </>
  );
}

export default ForgotPassword;

const ExpireMsg = styled.span`
  color: red;
  text-align: center;
  margin: 20px 0px;
  font-weight: 700;
`;

const TextInput = styled(TextField)`
  &.MuiFormControl-root.MuiTextField-root.ForgotPassword__TextInput-sc-1v4o8op-0 {
    width: 100% !important;
  }

  fieldset {
    border-color: #d9d9d9 !important;
    border-width: 1px !important;
    width: 100% !important;
  }
  input {
    padding: 12.5px;
    padding-left: 12px;
    width: 100% !important;
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
  button {
    text-transform: none !important;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
const Input = styled.input`
  margin-top: 10px;
  border-top: none;
  border-right: none;
  width: 100%;
  border-left: none;
  border-bottom: 1px solid grey;
  outline: none;
  ::placeholder {
    font-weight: 500;
    font-size: 12.25px;
    color: rgba(130, 134, 154, 0.5);
  }
`;

const Label = styled.label`
  width: 51.21px;
  height: 11.38px;
  left: 0px;
  top: -0.38px;
  font-weight: 500;
  font-size: 10.5px;
  color: #82869a;
`;
const SignUpTxt = styled.h4`
  color: #282c40;
  width: 249px;
  height: 35px;
  font-weight: 700;
  font-size: 31.5px;
  line-height: 110%;
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
  background-color: #f5f5f5;
  height: 100vh;
`;

const ErrorMsg = styled.span`
  font-size: 11px;
  color: red;
`;

const HeadSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #132756;
  padding: 12px;
  width: 526px;
  margin-left: -40px;
  margin-top: -40px;
  border-radius: 12px 12px 0px 0px;
`;
const SubHead = styled.div`
  &.icons {
    cursor: pointer;
  }
`;

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;
const IconEye = styled.div`
  color: slategrey;
`;
