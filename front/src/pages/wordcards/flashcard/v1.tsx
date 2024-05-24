import { css } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { styles } from '@/styles';
import { fetcher } from '@/utils';

const fontSizeCss = css({
  fontSize: 100,
  '@media (max-width: 600px)': {
    fontSize: 40,
  },
});

type vocabularyProps = {
  id: number;
  word: string;
  meaning: string;
  roles: string[];
};

const Flashcard: NextPage = () => {
  const [cards, setCards] = useState<vocabularyProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const router = useRouter();
  const { uuid } = router.query;
  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const { data, error } = useSWR(uuid ? url + uuid + '/vocabularies' : null, fetcher);

  useEffect(() => {
    if (data) {
      const vocabularies: vocabularyProps[] = camelcaseKeys(data);
      setCards(vocabularies);
    }
  }, [data]);

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const returnCard = () => {
    setCurrentIndex(currentIndex - 1);
  };

  if (error) return <div>error</div>;
  if (!data) return <div>Loading...</div>;

  const currentCard = cards[currentIndex] || null;

  console.log(cards[currentIndex]);

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button onClick={router.back}>
          <CloseIcon />
        </Button>
      </Box>
      {currentCard && (
        <Container
          maxWidth="md"
          sx={{
            pt: 2,
            pb: 10,
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={11} md={12}>
              <Card sx={{ borderRadius: 5, height: 400 }}>
                <CardContent>
                  <Grid
                    container
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography
                        component="h3"
                        css={fontSizeCss}
                        sx={{
                          color: '#000040',
                          fontWeight: 'bold',
                        }}
                      >
                        {currentCard.word}
                      </Typography>
                      <Divider />
                      <Typography
                        component="h3"
                        css={fontSizeCss}
                        sx={{
                          color: '#000040',
                          fontWeight: 'bold',
                        }}
                      >
                        {currentCard.meaning}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              pt: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item>
              <Box>
                <Button onClick={returnCard} disabled={currentIndex === 0}>
                  return
                </Button>
                <Button onClick={nextCard} disabled={currentIndex === cards.length - 1}>
                  next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
      {!currentCard && <Box>{data.message}</Box>}
    </Box>
  );
};

export default Flashcard;
