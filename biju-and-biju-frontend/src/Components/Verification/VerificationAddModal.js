import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import AddModalForm from './AddModalForm';
import { useMediaQuery } from "react-responsive";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 680,
  width: "100%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: "12px"
};

export default function VerificationAddModal(props) {
  const [open, setOpen] = React.useState(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 480px)" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <BootstrapButton  onClick={handleOpen} isMobileScreen={isMobileScreen}>Add New</BootstrapButton >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <AddModalForm setOpen={setOpen} setState={props.setState}  snackbarStatus={props.snackbarStatus} setSnackbarStatus={props.setSnackbarStatus}/>
        </Box>
      </Modal>
    </div>
  );
}

const BootstrapButton = styled(Button)(({ color,isMobileScreen }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    padding: isMobileScreen? '8px 14px':'8px 25px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#64A7DC',
    borderRadius: '4px',
    fontweight: 500,
    marginLeft: isMobileScreen? 10:25,
    color: "#fff",
    "&:hover": {
        backgroundColor: '#0984E3 !important'
      }
  }));