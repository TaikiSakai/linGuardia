import { css } from '@emotion/react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import EditModal from './EditModal';
import useModal from './ModalState';

const cardListCss = css({
  fontSize: 20,
  display: 'flex',
  alignItems: 'center',
  color: '#000040',
  justifyContent: 'center',
});

type cardProps = {
  id: number;
  word: string;
  meaning: string;
  roles: string;
};

const CardList = (props: cardProps) => {
  const [open, handleOpen, handleClose] = useModal();
  return (
    <Box>
      <Box onClick={handleOpen}>
        <Card sx={{ borderRadius: 2, maxHeight: 52 }}>
          <CardContent>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              xs={12}
              md={12}
            >
              <Grid item xs={6} md={6}>
                <Typography component="h3" css={cardListCss}>
                  {props.word}
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography component="h3" css={cardListCss}>
                  {props.meaning}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <EditModal
        open={open}
        handleClose={handleClose}
        id={props.id}
        word={props.word}
        meaning={props.meaning}
      />
    </Box>
  );
};

export default CardList;
