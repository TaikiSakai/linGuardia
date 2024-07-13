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

type WordcardDetail = {
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

  const fetchedWordcards: WordcardDetail[] | null = data
    ? data.map((cardData: WordcardDetail) => camelcaseKeys(cardData, { deep: true }))
    : null;

  return (
    fetchedWordcards && (
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
            {fetchedWordcards.length === 0 ? (
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
              fetchedWordcards.map((wordcard: WordcardDetail, i: number) => (
                <Grid item key={i} xs={12} md={8}>
                  <Wordcard
                    uuid={wordcard.card.uuid}
                    title={wordcard.card.title}
                    status={wordcard.card.status}
                    createdAt={wordcard.card.createdAt}
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
