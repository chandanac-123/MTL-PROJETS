import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderSpinner = (props) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress size={20} />
      <span style={{ marginLeft: '5px' }}>{props.title? props.title : "uploading"}</span>
    </div>
  );
};

export default LoaderSpinner;
