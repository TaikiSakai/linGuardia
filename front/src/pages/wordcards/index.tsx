import AddIcon from '@mui/icons-material/Add';
import { Grid, Container, Box, Typography, Fab } from '@mui/material';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';
import NewCardMenuForModal from '@/components/CardMenu';
import ModalCard from '@/components/ModalCard';
import Wordcard from '@/components/Wordcard';
import useModal from '@/hooks/ModalState';
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
  const [open, handleOpen, handleClose] = useModal();
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
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

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    handleOpen();
  };

  const handleCloseModal = () => {
    setModalContent(null);
    handleClose();
  };

  return (
    <Box css={styles.baseLayout}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container item>
            <Box sx={{ justifyContent: 'left', textAlign: 'left' }}>
              <Typography css={styles.pageTitle}>単語帳</Typography>
            </Box>
          </Grid>
          {fetchedWordcards === null ? (
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
        <Box
          sx={{
            position: 'fixed',
            bottom: 80,
            left: 1100,
            right: 0,
            '@media (max-width: 600px)': {
              left: 320,
            },
          }}
        >
          <Fab
            color="primary"
            onClick={() => {
              handleOpenModal(<NewCardMenuForModal closeModal={handleClose} />);
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Container>
      <ModalCard title="" open={open} handleClose={handleCloseModal}>
        {modalContent}
      </ModalCard>
    </Box>
  )
};

export default Index;
