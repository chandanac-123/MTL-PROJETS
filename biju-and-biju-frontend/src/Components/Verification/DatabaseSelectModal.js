import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { styled } from '@mui/material/styles';
import AddModalForm from "./AddModalForm";
import styled from "styled-components";
import ReasignModalForm from "./ReasignModalForm";
import ReportMoveModalForm from "./ReportMoveModalForm";
import ReportSubmittedModalForm from "./ReportSubmittedModalForm";
import DatabaseSelectModalForm from "./DatabaseSelectModalForm";

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

export default function DatabaseSelectModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let selected_fields = props.data.filter((i) =>
    props.checkedIDs.includes(i.id)
  )[0]?.product?.selected_fields;
  let values = [];
  if (selected_fields) {
    values = Object.values(selected_fields);
  }

  return (
    <div>
      <TableButton
        type="button"
        bcolor="#64A7DC"
        fcolor="#fff"
        value="Select Fields"
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
          <DatabaseSelectModalForm
            setOpen={setOpen}
            checkedIDs={props.checkedIDs}
            selected_fields={values}
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
  padding: 8px 25px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1.5;
`;
