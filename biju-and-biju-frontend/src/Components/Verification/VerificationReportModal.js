import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { styled } from '@mui/material/styles';
import AddModalForm from "./AddModalForm";
import styled from "styled-components";
import ReasignModalForm from "./ReasignModalForm";
import VerificationReportModalForm from "./VerificationReportModalForm";

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

export default function VerificationReportModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {props.datas.assign_verification_id.recieved_type == "online" ? (
        <TableButton
          type="button"
          bcolor="#6dc981"
          bcursor="pointer"
          fcolor="#fff"
          value="Online Report"
          onClick={handleOpen}
        />
      ) : (
        <TableButton
          type="button"
          bcolor="#FF0303"
          fcolor="#fff"
          value="Offline Report"
        />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <VerificationReportModalForm
            setOpen={setOpen}
            datas={props.datas}
            setState={props.setState}
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
  cursor: ${({ bcursor }) => (bcursor ? "pointer" : "")};
`;
