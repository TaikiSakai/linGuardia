import { Grid, Container, Box, Typography } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import useSWR from 'swr';
import CardMenu from '@/components/CardMenu';
import Wordcard from '@/components/Wordcard';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
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
  useRequireSignedIn();

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards';
  const { data, error } = useSWR(url ? url : null, fetcher, { revalidateOnFocus: false });
  const [, setSnackbar] = useSnackbarState();

  useEffect(() => {
    if (error) {
      setSnackbar({
        message: error.response.data.error,
        severity: 'error',
        pathname: '/wordcards',
      });
    }
  }, [error, setSnackbar]);

  if (!data && !error) return <div>Loading...</div>;

  const fetchedCards: WordcardData[] | null = data
    ? data.map((cardData: ApiResponse) => camelcaseKeys(cardData.card, { deep: true }))
    : null;

  return (
    fetchedCards && (
      <Box
        css={styles.pageMinHeight}
        sx={{
          backgroundColor: '#e6f2ff',
          pb: 7,
        }}
      >
        <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
          <CardMenu />
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {fetchedCards.length === 0 ? (
              <Box sx={{ pt: 5 }}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#000040',
                  }}
                >
                  単語帳が登録されていません
                </Typography>
              </Box>
            ) : (
              fetchedCards.map((wordcard: WordcardData, i: number) => (
                <Grid item key={i} xs={10} md={10}>
                  <Wordcard
                    uuid={wordcard.uuid}
                    title={wordcard.title}
                    status={wordcard.status}
                    createdAt={wordcard.createdAt}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    )
  );
};

export default Index;
