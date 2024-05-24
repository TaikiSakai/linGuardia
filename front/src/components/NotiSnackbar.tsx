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

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setSnackbar({ message: null, severity: 'success', pathname: null });
  };

  return (
    <>
      {snackbar.message != null && (
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: '60px' }}
        >
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
