import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import VerificationTableModalForm from "./VerificationTableModalForm";
import { useMediaQuery } from "react-responsive";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  width: "100%",
};

export default function VerificationTableModal(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TableButton
        type="button"
        isMobileScreen={isMobileScreen}
        bcolor="#132756"
        fcolor="#fff"
        value="Assign"
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <VerificationTableModalForm
            setOpen={setOpen}
            setState={props.setState}
            data={props.data}
            snackbarStatus={props.snackbarStatus}
            setSnackbarStatus={props.setSnackbarStatus}
          />
        </Box>
      </Modal>
    </div>
  );
}

const TableButton = styled.input`
  background-color: ${({ bcolor }) => (bcolor ? bcolor : "unset")};
  border: none;
  color: ${({ fcolor }) => (fcolor ? fcolor : "unset")};
  border-radius: 4px;
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  /* width: 80px; */
  width: ${({ isMobileScreen }) => (isMobileScreen ? "100%" : "80px")};
`;
