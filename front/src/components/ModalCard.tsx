import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';

const modalCss = css({
  borderRadius: 9,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: 390,
  minHeight: 100,
});

type modalProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
};

const ModalCard = (props: modalProps) => {
  return (
    <Box>
      <Modal open={props.open} onClose={props.handleClose}>
        <Card css={modalCss}>
          <CardContent>
            <Grid container>
              <Grid container item>
                <Grid item xs={6} md={6}>
                  <Typography component="h3" sx={{ fontSize: 15, fontWeight: 'bold' }}>
                    {props.title}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <IconButton onClick={props.handleClose} sx={{ p: 0 }}>
                      <CloseIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                {props.children}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};

export default ModalCard;
