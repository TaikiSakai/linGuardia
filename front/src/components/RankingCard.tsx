import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button, Card, CardContent, Typography, Stack, Grid, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RankedCard } from '@/types/RankedCardType';

const RankingCard = (props: RankedCard) => {
  const router = useRouter();

  return (
    <Link href="/">
      <Box>
        <Card sx={{ borderRadius: 3, height: 80 }}>
          <CardContent sx={{ height: '100%' }}>
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
                        fontWeight: 'bold',
                      }}
                    >
                      {props.user}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <StarIcon />
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

export default RankingCard;
