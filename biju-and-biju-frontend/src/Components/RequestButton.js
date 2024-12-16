import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 12,
  padding: '5px 20px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: '#132756',
  borderRadius: '4px',
  fontweight: 500,
  marginLeft: 25
});


export default function RequestButton(props) {
  return (
    <Stack spacing={2} direction="row">
      <BootstrapButton variant="contained" disableRipple>
        {props.action}
      </BootstrapButton>
    </Stack>
  );
}