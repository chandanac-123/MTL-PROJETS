import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineSharpIcon from "@mui/icons-material/ErrorOutlineSharp";
import VendorCodeWarningModal from "./VendorCodeWarningModal";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
};

export default function InputWarningEnd(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { width: props.width ? props.width : "368px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextInput
        id="outlined-basic"
        variant="outlined"
        placeholder={props.placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <WarningIcon onClick={() => handleOpen()} />
            </InputAdornment>
          ),
        }}
        onChange={(e) => props.handleChange(e)}
        value={props.value ? props.value : null}
        name={props.name ? props.name : ""}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <VendorCodeWarningModal setOpen={setOpen} is_edit={true} />
        </Box>
      </Modal>
    </Box>
  );
}

const WarningIcon = styled(ErrorOutlineSharpIcon)`
  &.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.InputWarningEnd__WarningIcon-sc-ik6vbj-0 {
    color: #132756 !important;
    cursor: pointer;
  }
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
