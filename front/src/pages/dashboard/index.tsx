import { css } from '@emotion/react';
import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import useSWR from 'swr';
import RankingCard from '@/components/RankingCard';
import { styles } from '@/styles';
import { RankedCard } from '@/types/RankedCardType';
import { fetcher } from '@/utils';


const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  console.log(url);
  const { data, error } = useSWR(url + '/dashboards', fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const fetchedRankings: RankedCard[] = camelcaseKeys(data);

  console.log(data);

  return (
    <>
      <Box css={styles.baseLayout}>
        <Container maxWidth="md">
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            spacing={3}
          >
            <Grid container item>
              <Box sx={{ justifyContent: 'left', textAlign: 'left'}}>
                <Typography css={styles.pageTitle}>DashBoard</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left'}}>
                <Typography css={styles.subTitle}>学習実績</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <RankingCard />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left'}}>
                <Typography css={styles.subTitle}>人気の単語帳</Typography>
              </Box>
              {fetchedRankings.map((card: RankedCard, i: number) => (
                <Box sx={{ mb: 2 }} key={i}>
                  <RankingCard uuid={card.uuid} title={card.title} userName={card.userName} />
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Index;
