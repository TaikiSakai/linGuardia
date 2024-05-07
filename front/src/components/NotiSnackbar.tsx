import { Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSnackbarState } from '@/hooks/useGlobalState';

const NotiSnackbar = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useSnackbarState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (snackbar.pathname === router.pathname) {
      setOpen(true);
    }
  }, [snackbar, router]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setSnackbar({ message: null, severity: null, pathname: null });
  };

  return (
    <>
      {snackbar.message != null && (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotiSnackbar;
