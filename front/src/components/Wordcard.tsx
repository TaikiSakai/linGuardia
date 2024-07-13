import { css } from '@emotion/react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import Link from 'next/link';
import { WordcardData } from '@/types/WordcardType';

const cardTitleCss = css({
  component: 'h4',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '16px',
  },
  fontWeight: 'bold',
  color: '#000060',
});

const cardTextCss = css({
  component: 'h4',
  fontSize: '14px',
  '@media (max-width: 600px)': {
    fontSize: '10px',
  },
  color: '#000060',
  textAlign: 'right',
});

const Wordcard = (props: WordcardData) => {
  const url = process.env.NEXT_PUBLIC_FRONT_URL + '/wordcards';

  return (
    <Link href={url + '/' + props.uuid}>
      <Box>
        <Card sx={{ borderRadius: 3, height: 80 }}>
          <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', px: 3, pt: 3 }}>
            <Grid container sx={{ alignItems: 'center', height: '100%' }}>
              <Grid
                item
                xs={7}
                md={7}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
              >
                <Typography css={cardTitleCss}>{props.title}</Typography>
              </Grid>
              <Grid
                item
                xs={5}
                md={5}
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography css={cardTextCss}>作成日: {props.createdAt}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default Wordcard;
