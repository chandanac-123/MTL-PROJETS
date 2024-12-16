import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '8px 25px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: '#132756',
  borderRadius: '4px',
  fontweight: 500,
});


export default function CustomizedButtons(props) {
  return (
    <Stack spacing={2} direction="row">
      <BootstrapButton variant="contained" className={props?.className} disableRipple onClick={()=> props.handleSearch()}>
        {props.title? props.title : "Search"}
      </BootstrapButton>
    </Stack>
  );
}