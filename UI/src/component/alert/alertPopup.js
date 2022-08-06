import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import useAlert from './alertHook';

const AlertPopup = () => {
    const { text, type } = useAlert();
  
    if (text && type) {
      return (
        <Alert
          severity={type}
          sx={{
            position: 'absolute',
            zIndex: 10,
            right: '20px',
            top: '10px'
          }}
        >
          {text}
        </Alert>
      );
    } else {
      return <></>;
    }
  };

  export default AlertPopup;