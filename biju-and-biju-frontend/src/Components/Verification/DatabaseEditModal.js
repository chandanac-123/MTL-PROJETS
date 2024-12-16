import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import DatabaseEditModalForm from "./DatabaseEditModalForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 680,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 24,
  //   p: 2,
  borderRadius: "12px",
  width: "100%",
};

export default function DatabaseEditModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TableButton
        type="button"
        bcolor="#132756"
        fcolor="#fff"
        value="Edit"
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
          <DatabaseEditModalForm
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
  padding: 5px 18px;
  cursor: pointer;
`;
