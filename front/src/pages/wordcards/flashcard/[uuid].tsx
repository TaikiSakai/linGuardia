import { css } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Typography,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect, ReactNode } from 'react';
import useSWR from 'swr';
import ExitPageBoxForModal from '@/components/ExitPageBox';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import type { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';

const fontSizeCss = css({
  fontSize: 100,
  '@media (max-width: 600px)': {
    fontSize: 40,
  },
});

const Flashcard: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const [, setSnackbar] = useSnackbarState();
  const [cards, setCards] = useState<VocabularyData[]>([]);
  const [open, handleOpen, handleClose] = useModal();
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [beTurnedOver, setBeTurnedOver] = useState<boolean>(false);

  const turnOver: () => void = () => {
    setBeTurnedOver(!beTurnedOver);
  };

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    handleOpen();
  };

  const handleCloseModal = () => {
    setModalContent(null);
    handleClose();
  };

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const { data, error } = useSWR(uuid ? url + uuid + '/vocabularies' : null, fetcher);

  useEffect(() => {
    if (data) {
      const vocabularies: VocabularyData[] = camelcaseKeys(data);
      setCards(vocabularies);
    }
  }, [data]);

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1);
    beTurnedOver && turnOver();
  };

  const returnCard = () => {
    setCurrentIndex(currentIndex - 1);
    beTurnedOver && turnOver();
  };

  if (error) {
    console.log(error);
    setSnackbar({
      message: error.response.data.error,
      severity: 'error',
      pathname: '/wordcards',
    });
    router.push('/wordcards');
  }

  if (!data) return <div>Loading...</div>;

  const currentCard = cards[currentIndex] || null;

  return (
    <Box css={styles.baseLayout}>
      {currentCard && (
        <Container maxWidth="md" sx={{ height: '100%' }}>
          <Grid container sx={{ alignItems: 'center', height: '100%', pt: 10 }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ borderRadius: 3, height: 400 }} onClick={turnOver}>
                <CardContent sx={{ height: '100%' }}>
                  <Grid
                    container
                    sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
                  >
                    <Grid item>
                      <Typography
                        component="h3"
                        css={fontSizeCss}
                        sx={{
                          color: '#000060',
                          fontWeight: 'bold',
                        }}
                      >
                        {beTurnedOver ? currentCard.meaning : currentCard.word}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', pt: 10 }}>
            <Grid item>
              <Stack direction="row" spacing={5}>
                <IconButton onClick={returnCard} disabled={currentIndex === 0}>
                  <ArrowBackIosNewIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <IconButton onClick={turnOver}>
                  <AutorenewIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <IconButton onClick={nextCard} disabled={currentIndex === cards.length - 1}>
                  <ArrowForwardIosIcon sx={{ fontSize: 50 }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              position: 'fixed',
              bottom: 10,
              left: 1130,
              right: 0,
              '@media (max-width: 600px)': {
                left: 320,
              },
            }}
          >
            <Fab
              color="primary"
              onClick={() => {
                handleOpenModal(<ExitPageBoxForModal />);
              }}
            >
              <CloseIcon />
            </Fab>
          </Box>
        </Container>
      )}
      {!currentCard && <Box>{data.message}</Box>}
      <ModalCard title="" open={open} handleClose={handleCloseModal}>
        {modalContent}
      </ModalCard>
    </Box>
  );
};

export default Flashcard;
