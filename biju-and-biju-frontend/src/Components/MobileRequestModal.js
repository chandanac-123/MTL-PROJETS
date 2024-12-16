import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import MobileRequestModalForm from "./MobileRequestModalForm";
import { useMediaQuery } from "react-responsive";

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

export default function MobileRequestModal(props) {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const [open, setOpen] = React.useState(false);
  const [rowVal, setRowVal] = React.useState(props.row);
  const [instance, setInstance] = useState({});
  const [state, setState] = useState({
    is_edit: false,
  });

  const handleOpen = (rowVal) => {
    setInstance(rowVal);
    setState((prevState) => {
      return {
        ...prevState,
        is_edit: true,
      };
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <div>
      <TableButton
        type="button"
        isMobileScreen={isMobileScreen}
        bcolor="#132756"
        fcolor="#fff"
        value={props.action}
        onClick={() => handleOpen(rowVal)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MobileRequestModalForm
            setState={props.setState}
            instance={instance}
            setOpen={setOpen}
            is_edit={state.is_edit}
            row={props.row}
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
  width: ${({ isMobileScreen }) => (isMobileScreen ? "100%" : "80px")};
`;
