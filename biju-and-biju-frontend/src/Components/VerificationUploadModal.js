import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import UploadModalForm from './Verification/UploadModalForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 459,
  width: '100%',
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
//   p: 2,
  borderRadius: "12px"
};

export default function VerificationUploadModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <BootstrapButton  onClick={handleOpen}>Upload</BootstrapButton >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box sx={style}>
          <UploadModalForm setOpen={setOpen} snackbarStatus={props.snackbarStatus} setSnackbarStatus={props.setSnackbarStatus} setState={props.setState} />
        </Box>
      </Modal>
    </div>
  );
}

const BootstrapButton = styled(Button)(({ color }) => ({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    padding: '8px 25px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#64A7DC',
    borderRadius: '4px',
    fontweight: 500,
    marginLeft: 25,
    color: "#fff",
    "&:hover": {
        backgroundColor: '#0984E3 !important'
      }
  }));