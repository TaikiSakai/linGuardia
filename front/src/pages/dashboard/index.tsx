import { Box, Container, Typography, Grid } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import useSWR from 'swr';
import RankedCard from '@/components/RankedCard';
import { styles } from '@/styles';
import { AuthorData } from '@/types/AuthorType';
import { LikeData } from '@/types/LikeType';
import { WordcardData } from '@/types/WordcardType';
import { fetcher } from '@/utils';

type ApiResponse = {
  card: WordcardData;
  user: AuthorData;
  like: LikeData;
};

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  console.log(url);
  const { data, error } = useSWR(url + '/wordcard/ranked_cards', fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  // const fetchedRankings: RankedCardData[] = camelcaseKeys(data);
  const fetchedRankings: ApiResponse[] | null = data
    ? data.map((cardData: ApiResponse) => camelcaseKeys(cardData, { deep: true }))
    : null;

  return (
    fetchedRankings && (
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
              <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.pageTitle}>DashBoard</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.subTitle}>学習実績</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <RankedCard uuid={''} title={'Title'} userName={'Username'} like={true} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2, justifyContent: 'left', textAlign: 'left' }}>
                <Typography css={styles.subTitle}>人気の単語帳</Typography>
              </Box>
              {fetchedRankings.map((card: ApiResponse, i: number) => (
                <Box sx={{ mb: 2 }} key={i}>
                  <RankedCard
                    uuid={card.card.uuid}
                    title={card.card.title}
                    userName={card.user.userName}
                    like={card.like.like}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default Index;
