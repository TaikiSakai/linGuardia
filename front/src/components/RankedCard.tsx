import { css } from '@emotion/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { RankedCardData } from '@/types/RankedCardType';

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

const RankedCard = (props: RankedCardData) => {
  const url = process.env.NEXT_PUBLIC_FRONT_URL + '/wordcards';

  return (
    <Link href={url + '/' + props.uuid}>
      <Box>
        <Card sx={{ borderRadius: 3, height: 80 }}>
          <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', px: 3 }}>
            <Grid container>
              <Grid item xs={8} md={8} sx={{ alignItems: 'center', pt: 2 }}>
                <Grid container>
                  <Grid
                    item
                    xs={2}
                    md={1}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                  >
                    <AccountCircleIcon />
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    md={11}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
                  >
                    <Typography css={cardTitleCss}>{props.title}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={4} sx={{ alignItems: 'center', pt: 1 }}>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography css={cardTextCss}>作成者: {props.userName}</Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                    {props.like ? (
                      <StarIcon sx={{ color: '#f0950c' }} />
                    ) : (
                      <StarOutlineIcon sx={{ color: '#9c9c9c' }} />
                    )}
                    <Typography sx={{ color: '#9c9c9c', pl: 1 }}>{props.numberOfLikes}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default RankedCard;
