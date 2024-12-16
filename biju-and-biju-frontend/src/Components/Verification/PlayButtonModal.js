import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlayButtonModalForm from "./PlayButtonModalForm";
import { useMediaQuery } from "react-responsive";

const modalContainer = (isMobileScreen) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobileScreen ? "100%" : 540,
    bgcolor: "background.paper",
    //   border: '2px solid #000',
    boxShadow: 24,
    //   p: 2,
    borderRadius: "12px",
  };
};

export default function PlayButtonModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <div>
      {/* <TableButton type="button" bcolor="#2cdbaf" fcolor="#fff" value="Manual" onClick={handleOpen} /> */}
      <PlayButtonItem onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={modalContainer(isMobileScreen)}>
          <PlayButtonModalForm setOpen={setOpen} datas={props.datas} />
        </Box>
      </Modal>
    </div>
  );
}

const PlayButtonItem = styled(PlayCircleIcon)`
  cursor: pointer;
`;
