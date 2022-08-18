import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ExpenseAlertProp } from '../modal/ExpenseAlert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ExpenseAlert(props: ExpenseAlertProp) {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.type} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

    