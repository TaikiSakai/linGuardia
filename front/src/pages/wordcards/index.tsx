import { Grid, Container, Box } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import useSWR from 'swr';
import CardMenu from '@/components/CardMenu';
import Wordcard from '@/components/Wordcard';
import { styles } from '@/styles';
import { fetcher } from '@/utils';

type wordcardProps = {
  uuid: string;
  title: string;
  userId: string;
  updatedAt: string;
};

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards';

  const { data, error } = useSWR(url ? url : null, fetcher);

  if (error) return <div>単語帳を取得できません</div>;
  if (!data) return <div>Loading...</div>;

  const wordcards: wordcardProps[] = camelcaseKeys(data.cards);

  return (
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
          {wordcards.map((wordcard: wordcardProps, i: number) => (
            <Grid item key={i} xs={10} md={10}>
              <Wordcard
                title={wordcard.title}
                updatedAt={wordcard.updatedAt}
                uuid={wordcard.uuid}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
