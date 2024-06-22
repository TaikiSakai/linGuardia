import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { RankedCardData } from '@/types/RankedCardType';

const RankedCard = (props: RankedCardData) => {
  const url = process.env.NEXT_PUBLIC_FRONT_URL + '/wordcards';

  return (
    <Link href={url + '/' + props.uuid}>
      <Box>
        <Card sx={{ borderRadius: 3, height: 80 }}>
          <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Grid container sx={{ alignItems: 'center', height: '100%' }}>
              <Grid
                item
                xs={1}
                md={1}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <AccountCircleIcon />
              </Grid>
              <Grid
                item
                xs={9}
                md={9}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontSize: 20,
                    color: '#000040',
                    fontWeight: 'bold',
                  }}
                >
                  {props.title}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                md={2}
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: 15,
                        color: '#000040',
                      }}
                    >
                      {props.userName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {props.like ? <StarIcon sx={{ color: '#f0950c' }} /> : <StarOutlineIcon />}
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
