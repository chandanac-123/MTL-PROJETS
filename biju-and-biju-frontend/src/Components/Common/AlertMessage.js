import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

export default function AlertMessage(props) {
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSnackbarStatus({
      isOpen: false,
      severity: "success",
      message: "",
    });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={props.snackbarStatus.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          variant="filled"
          severity={props.snackbarStatus.severity}
          sx={{ width: "100%" }}
        >
          {props.snackbarStatus.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  margin-left: 880px;
`;

{
  /* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
  This is a success message!
</Alert>
</Snackbar>

<Alert severity="success" >
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert> */
}
