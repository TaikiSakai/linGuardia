import { css } from '@emotion/react';
import { Box, Grid, Card, CardContent } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';

const modalCss = css({
  borderRadius: 5,
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  width: 390,
  minHeight: 400,
});

type modalProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
};

const EditModal = (props: modalProps) => {
  return (
    <Box>
      <Modal open={props.open} onClose={props.handleClose}>
        <Card css={modalCss}>
          <CardContent>
            <Grid container>
              <Grid>{props.title}</Grid>
              <Grid>{props.children}</Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </Box>
  );
};

export default EditModal;
