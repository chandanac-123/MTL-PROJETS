import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  logoutReason,
  selectAccess,
  selectIsReason,
} from "../../Slices/authSlice";
import { useSelector } from "react-redux";
import { add_reason } from "../../Api/TimeTrackerAPIs";
import AlertMessage from "./AlertMessage";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function LogoutReasonModal() {
  const dispatch = useDispatch();
  const user_type = useSelector((state) => state.auth.user_type);
  const access = useSelector(selectAccess);
  const is_reason = useSelector(selectIsReason);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [is_validate, setIsValidate] = useState(false);

  const [snackbarStatus, setSnackbarStatus] = useState({
    isOpen: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    const users = [
      "GroupLeader",
      "ProductCoordinator",
      "TeamMember",
      "DistrictCoordinator",
      "ExecutiveOfficeAdmin",
    ];
    if (is_reason && users.includes(user_type)) {
      setOpen(true);
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReason(value);
    setIsValidate(false);
  };

  const handleSkip = () => {
    dispatch(logoutReason(reason));
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reason) {
      try {
        const reasonResponse = await axios.post(
          add_reason,
          {
            reason: reason,
          },
          { headers: { Authorization: `Bearer ${access}` } }
        );
        if (reasonResponse.status === 200) {
          setSnackbarStatus({
            isOpen: true,
            severity: "success",
            message: "Reason Submitted Successfully",
          });
          dispatch(logoutReason(reason));
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsValidate(true);
    }
  };

  return (
    <MainContainer>
      <AlertMessage
        setSnackbarStatus={setSnackbarStatus}
        snackbarStatus={snackbarStatus}
      />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <DialogItem
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Container
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
        >
          <SignUpLogoContainer>
            <img src={require("../../Assets/images/biju-logo.png")} />
          </SignUpLogoContainer>
          <Heading>Reason for logout</Heading>
          <InputContainer>
            <TextInput
              id="outlined-start-adornment"
              sx={{ m: 0, width: "100%" }}
              placeholder="Description"
              name="reason"
              value={reason}
              multiline
              rows={3}
            />
            {is_validate ? (
              <span style={{ color: "red", fontSize: "13px" }}>required</span>
            ) : null}
          </InputContainer>
          <ButtonContainer>
            <SkipButton onClick={() => handleSkip()}>Skip</SkipButton>
            <SkipButton className="submit" type="submit">
              Submit
            </SkipButton>
          </ButtonContainer>
        </Container>
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </DialogItem>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  /* display: flex;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #F2F6F5;
  height: 100vh; */
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: flex-end;
`;

const SkipButton = styled.button`
  background: #ffffff;
  border: 1px solid #132756;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12),
    0px 2px 4px -1px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #132756;
  padding: 8px 30px;
  cursor: pointer;
  &.submit {
    background: #132756;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.12),
      0px 2px 4px -1px rgba(0, 0, 0, 0.07);
    color: #ffffff;
  }
`;
const DialogItem = styled(Dialog)`
  & .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation24 {
    border-radius: 12px !important;
    background-color: #ffffff !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2) !important;
    width: 470px !important;
    padding: 40px 40px 0px 40px !important;
    height: 330px !important;
  }
`;
const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SignUpLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h2`
  text-align: center;
  margin: unset;
  color: #464e5f;
  margin-bottom: 10px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
`;
const InputContainer = styled.div``;

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
