import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Grid,
  Container,
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
  TableBody,
  TableCell,
  Collapse,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableRow,
} from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';

type ConjugationType = {
  id: number;
  word: string;
};

const WordConjugation: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const url_params = '/vocabularies?role_name=動詞';
  const { data, error } = useSWR(uuid ? url + uuid + url_params : null, fetcher, {
    revalidateOnFocus: false,
  });

  const [words, setWords] = useState<VocabularyData[]>([]);
  const [conjugations, setConjugations] = useState<VocabularyData[]>([]);
  const [, setSnackbar] = useSnackbarState();
  const [open, setOpen] = useState<boolean>(true);

  const updateConjugations = (newValues: ConjugationType[]) => {
    const newConjugations = words.map((word) => ({ ...word }));

    newValues.map((newValue: ConjugationType) => {
      const index = newConjugations.findIndex((item) => item.id === newValue.id);
      newConjugations[index].word = newValue.word;
    });

    setConjugations(newConjugations);
  };

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

  console.log(words);

  const headers = { 'Content-Type': 'application/json' };

  const getConjugations = async () => {
    try {
      const res: AxiosResponse = await axios({
        method: 'POST',
        url: url + uuid + '/conjugation/create',
        headers: headers,
        withCredentials: true,
      });

      console.log(res.data);
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

      console.log(res.data);
      mutate(url + uuid + url_params);
      setSnackbar({
        message: '単語を更新しました',
        severity: 'success',
        pathname: '/wordcards/[uuid]',
      });
      router.push('/wordcards/' + uuid);
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
        pb: 7,
      }}
    >
      <Container maxWidth="md" sx={{ pt: 3, pb: 3 }}>
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={3}
        >
          <Grid
            container
            item
            sx={{
              justifyContent: 'left',
              alignItems: 'left',
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000040',
              }}
            >
              動詞活用形の自動生成
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Card sx={{ borderRadius: 3, p: 2 }}>
                <CardContent>
                  <Grid
                    container
                    item
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      pt: 1,
                    }}
                  >
                    <Box>
                      <Stack spacing={2}>
                        <Box>
                          <Typography>
                            この単語帳に登録されている動詞の活用形を生成します
                          </Typography>
                          <Typography>※動詞のタグ付けがされている必要があります</Typography>
                        </Box>
                        <Box>
                          <Button variant="contained" sx={{ width: 500 }} onClick={getConjugations}>
                            活用形を生成する
                          </Button>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
                          <IconButton size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                          <Typography sx={{ ml: 1 }}>以下の動詞の活用形が生成されます</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ m: 2 }}>
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell align="left">活用前</TableCell>
                                  <TableCell align="left">活用後</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                          <Box sx={{ display: 'flex', m: 2 }}>
                            <Table>
                              <TableBody>
                                {words.map((row_item: VocabularyData) => (
                                  <TableRow key={row_item.id}>
                                    <TableCell align="left">{row_item.word}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            {conjugations.length !== 0 && (
                              <Table>
                                <TableBody>
                                  {conjugations.map((row_item: ConjugationType) => (
                                    <TableRow key={row_item.id}>
                                      <TableCell align="left">{row_item.word}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                    {conjugations.length !== 0 && (
                      <TableRow>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Stack spacing={1}>
                              <Button variant="contained" sx={{ width: 500 }} onClick={updateWords}>
                                更新する
                              </Button>
                              <Typography>※注意: 活用前の単語に上書きされます</Typography>
                            </Stack>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WordConjugation;
