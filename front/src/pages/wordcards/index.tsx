import { Grid, Container, Box } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import CardMenu from '@/components/CardMenu';
import Wordcard from '@/components/Wordcard';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { fetcher } from '@/utils';

type wordcardProps = {
  uuid: string;
  title: string;
  userId: string;
  createdAt: string;
};

const Index: NextPage = () => {
  useRequireSignedIn();

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards';
  const { data, error } = useSWR(url ? url : null, fetcher);
  const [wordcards, setWordcard] = useState<wordcardProps[]>([]);

  if (error) return <div>単語帳を取得できません</div>;
  if (!data) return <div>Loading...</div>;

  const fetchedCards: wordcardProps[] = camelcaseKeys(data);
  if (wordcards.length === 0) {
    setWordcard(fetchedCards);
  }

  // データの登録に成功したら、wordcard一覧を更新する
  const addToIndex = (newWordcard: wordcardProps) => {
    const fetchedCards: wordcardProps = camelcaseKeys(newWordcard);
    setWordcard((prevWordcards) => [fetchedCards, ...prevWordcards]);
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
        pb: 7,
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
        <CardMenu uuid="" title="" userId="" createdAt="" addValue={addToIndex} />
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
                uuid={wordcard.uuid}
                title={wordcard.title}
                createdAt={wordcard.createdAt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
