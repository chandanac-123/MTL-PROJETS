import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { styled } from '@mui/material/styles';
import AddModalForm from "./AddModalForm";
import styled from "styled-components";
import AssignModalForm from "./AssignModalForm";
import { useSelector } from "react-redux";

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

export default function AssignModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user_type = useSelector((state) => state.auth.user_type);

  return (
    <div>
      {user_type == "TeamMember" ? (
        <TableButton
          type="button"
          bcolor="#132756"
          fcolor="#fff"
          value={
            props.row.team_assigned_name
              ? props.row.team_assigned_name
              : "Assign"
          }
          onClick={props.row.team_assigned_name ? "" : handleOpen}
        />
      ) : (
        <TableButton
          type="button"
          bcolor="#132756"
          fcolor="#fff"
          value={
            props.row.team_assigned_name
              ? props.row.team_assigned_name
              : "Assign"
          }
          onClick={handleOpen}
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
          <AssignModalForm
            setOpen={setOpen}
            data={props.row}
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
  cursor: pointer;
`;
