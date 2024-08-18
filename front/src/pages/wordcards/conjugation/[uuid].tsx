import { css } from '@emotion/react';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import HelpIcon from '@mui/icons-material/Help';
import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Card,
  Table,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';
import isEmpty from '@/utils/isEmpty';

const tableTextStyle = css({
  component: 'p',
  fontSize: '15px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '15px',
  },
  color: '#000060',
});

const WordConjugation: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  // roleが”動詞”の単語を取得する
  const { data, error } = useSWR(uuid ? url + uuid + '/conjugations' : null, fetcher, {
    revalidateOnFocus: false,
  });

  const [words, setWords] = useState<VocabularyData[]>([]);
  const [conjugations, setConjugations] = useState<VocabularyData[]>([]);
  const [, setSnackbar] = useSnackbarState();
  const [open, handleOpen, handleClose] = useModal();

  if (error) {
    setSnackbar({
      message: error.response.data.error,
      severity: 'error',
      pathname: '/wordcards/[uuid]',
    });
    router.push('/wordcards/' + uuid);
  }

  if (!data) return <div>Loading...</div>;

  if (data && words.length === 0) {
    const fetchedWords: VocabularyData[] = camelcaseKeys(data);
    setWords(fetchedWords);
  }

  const updateConjugations = (newValues: VocabularyData[]) => {
    const newConjugations = words.map((word) => ({ ...word }));

    newValues.map((newValue: VocabularyData) => {
      const index = newConjugations.findIndex((item) => item.id === newValue.id);
      newConjugations[index].word = newValue.word;
    });

    setConjugations([...newValues]);
  };

  const headers = { 'Content-Type': 'application/json' };

  const getConjugations = async () => {
    try {
      const res: AxiosResponse = await axios({
        method: 'GET',
        url: url + uuid + '/conjugations/create',
        headers: headers,
        withCredentials: true,
      });

      updateConjugations(res.data);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  const updateWords = async () => {
    const data = JSON.stringify({
      vocabularies: conjugations,
    });

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url + uuid + '/vocabularies/update',
        headers: headers,
        data: data,
        withCredentials: true,
      });

      mutate(url + uuid + '/vocabularies');
      mutate(url + uuid + '/conjugations');

      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/wordcards/[uuid]',
      });
      router.push('/wordcards/' + uuid);
    } catch (e) {
      if (isAxiosError(e)) {
        setSnackbar({
          message: 'update failed',
          severity: 'error',
          pathname: '/wordcards/conjugation/[uuid]',
        });
        console.log(e);
      }
    }
  };

  return (
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
            <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
              <Typography css={styles.pageTitle}>活用形自動生成</Typography>
            </Box>
          </Grid>
          <Grid container item xs={12} md={8} justifyContent="center">
            <Card sx={{ borderRadius: 3, p: 1 }}>
              <Grid
                container
                item
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Grid
                  container
                  item
                  sx={{ justifyContent: 'space-between', alignItems: 'center', p: 2 }}
                >
                  <Button variant="contained" onClick={getConjugations}>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{ justifyContent: 'center', alignItems: 'center', px: 1 }}
                    >
                      <Box>生成</Box>
                      <Box>
                        <AutoFixNormalIcon />
                      </Box>
                    </Stack>
                  </Button>
                  <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <HelpIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Grid>
                <TableContainer sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <Table sx={{ width: 600 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography css={tableTextStyle} align="left">
                            活用前
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography css={tableTextStyle} align="left">
                            活用後
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {words.map((word: VocabularyData, index) => (
                        <TableRow key={index}>
                          <TableCell css={tableTextStyle} align="left">
                            {word.word}
                          </TableCell>
                          <TableCell css={tableTextStyle} align="left">
                            {conjugations[index] ? conjugations[index].word : null}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                container
                item
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isEmpty(conjugations) !== true && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 2,
                    }}
                  >
                    <Button variant="contained" onClick={updateWords} sx={{ mb: 2 }}>
                      更新する
                    </Button>
                    <Typography css={tableTextStyle}>※注意: 単語は上書きされます</Typography>
                  </Box>
                )}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <ModalCard title="" open={open} handleClose={handleClose}>
        <Stack direction="column" spacing={2} sx={{ px: 1 }}>
          <Typography component="h3" css={styles.modalTitle}>
            活用形自動生成
          </Typography>
          <Typography css={styles.modalText}>動詞の活用形を生成します</Typography>
          <Typography css={styles.modalText}> ※動詞のタグ付けがされている必要があります</Typography>
        </Stack>
      </ModalCard>
    </Box>
  );
};

export default WordConjugation;
