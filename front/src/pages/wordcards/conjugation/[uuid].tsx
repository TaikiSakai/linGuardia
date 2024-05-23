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
  Table,
  TableContainer,
  TableRow,
} from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
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
  const [conjugations, setConjugations] = useState<ConjugationType[]>([]);
  const [, setSnackbar] = useSnackbarState();
  const [open, setOpen] = useState<boolean>(false);

  if (error) {
    setSnackbar({
      message: error.response.data.error,
      severity: 'error',
      pathname: '/vocabularies/create/[uuid]',
    });
    router.push('/vocabularies/create/' + uuid);
  }

  if (!data) return <div>Loading...</div>;

  if (data && words.length === 0) {
    const fetchedWords: VocabularyData[] = camelcaseKeys(data);
    setWords(fetchedWords);
  }

  // console.log(words);

  const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };

  const getConjugations = () => {
    axios({
      method: 'POST',
      url: url + uuid + '/conjugation/create',
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setConjugations(res.data);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          console.log(e);
        }
      });
  };

  const updateWords = () => {
    const data = JSON.stringify({
      vocabularies: conjugations,
    });

    console.log(data);

    axios({
      method: 'PATCH',
      url: url + uuid + '/vocabularies/update_conjugation',
      headers: headers,
      data: data,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setSnackbar({
          message: 'update',
          severity: 'success',
          pathname: '/wordcards',
        });
        router.push('/wordcards');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          console.log(e);
        }
      });
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
              動詞の活用形自動生成
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
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
                    <Box>props.titleに登録されている動詞の活用形を生成します</Box>
                    <Button onClick={getConjugations}>実行</Button>
                    <Button
                      onClick={() => {
                        console.log(conjugations);
                      }}
                    >
                      miru
                    </Button>
                    <Button onClick={updateWords}>update</Button>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <TableRow>
                <TableCell align="left">
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="left">以下の動詞の活用形が生成されます</TableCell>
              </TableRow>
              <Collapse in={open}>
                <Box sx={{ m: 2 }}>
                  <Table>
                    <TableBody>
                      {words.map((row_item: VocabularyData) => (
                        <TableRow key={row_item.id}>
                          <TableCell align="left">{row_item.word}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableContainer>
            <Card sx={{ borderRadius: 3, p: 2, mt: 6 }}>
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WordConjugation;
