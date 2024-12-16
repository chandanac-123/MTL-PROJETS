import Modal from "@mui/material/Modal";
import React from "react";
import {
  ButtonSection,
  ConfirmButton,
  ConfirmMsg,
  LastSection,
} from "../../Screens/Verification";
import ButtonItem from "../ButtonItem";
import Box from "@mui/material/Box";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 680,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  height: 200,
  justifyContent: "center",
  textAlign: "center",
};

function VerificationConfirm({
  handleClickOpen,
  open,
  handleClose,
  handleConfirm,
  msg,
  isSubmit
}) {
  return (
    <div>
      <ConfirmButton onClick={handleClickOpen} disableRipple>
      Confirm
      </ConfirmButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop={true}
      >
        <Box sx={styles}>
          <ConfirmMsg>
            {msg
              ? "Pending visits in this verification, are you sure you want to confirm?"
              : "Are you sure , you want to confirm?"}
          </ConfirmMsg>
          <ButtonSection>
            <LastSection>
              <ButtonItem
                name="Cancel"
                handleClick={handleClose}
                type="outlined"
                color="#252F40"
                bgColor=""
                fsize="16px"
                fweight="500"
                fpadding="6px 40px"
                bradius="8px"
              />
              <ButtonItem
                name="Confirm"
                handleClick={handleConfirm}
                type="contained"
                color="#fff"
                bgColor="#132756"
                fsize="16px"
                fweight="500"
                fpadding="6px 40px"
                bradius="8px"
                pending={isSubmit}
                loader={isSubmit}
              />
            </LastSection>
          </ButtonSection>
        </Box>
      </Modal>
    </div>
  );
}

export default VerificationConfirm;
