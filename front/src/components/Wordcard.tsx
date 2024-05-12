import { css } from '@emotion/react';
import { Box, Button, Card, CardContent, Typography, Grid } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ModalCard from './ModalCard';
import useModal from '@/hooks/ModalState';

type wordcardProps = {
  uuid: string;
  title: string;
  updatedAt: string;
};

const switchCss = css({
  width: 150,
  height: 35,
});

const Wordcard = (props: wordcardProps) => {
  const [open, handleOpen, handleClose] = useModal();
  const router = useRouter();

  // mui Linkが通常のリンクとして機能してしまうため、
  // useRouterでspaに対応
  const startFlashcard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push('/wordcards/flashcard/' + props.uuid);
  };

  return (
    <Box>
      <Box onClick={handleOpen}>
        <Card sx={{ borderRadius: 5, height: 100 }}>
          <CardContent>
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid item xs={6} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    component="h3"
                    sx={{
                      mb: 3,
                      minHeight: 50,
                      fontSize: 20,
                      color: '#000040',
                      fontWeight: 'bold',
                      lineHeight: 1.5,
                    }}
                  >
                    {props.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={6}>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontSize: 12 }}>{props.updatedAt}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <ModalCard title={props.title} open={open} handleClose={handleClose}>
        <Grid container item sx={{ justifyContent: 'center' }}>
          <Grid item>
            <Typography>{props.updatedAt}</Typography>
          </Grid>
          <Grid item sx={{ p: 2 }}>
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <ToggleButton css={switchCss} value="face">
                表面
              </ToggleButton>
              <ToggleButton css={switchCss} value="back">
                裏面
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item sx={{ p: 2 }}>
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <ToggleButton css={switchCss} value="face">
                順番通り
              </ToggleButton>
              <ToggleButton css={switchCss} value="back">
                シャッフル
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item sx={{ p: 2 }}>
            <Link href={'wordcards/create/' + props.uuid}>単語追加</Link>
            <Link href={'wordcards/edit/' + props.uuid}>単語編集</Link>
          </Grid>
          <Grid item sx={{ p: 2 }}>
            <Button variant="contained" sx={{ width: 300 }} onClick={startFlashcard}>
              START
            </Button>
          </Grid>
        </Grid>
      </ModalCard>
    </Box>
  );
};

export default Wordcard;
