import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import InputDisplayBox from '@/components/InputDisplayBox';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';

const EditVocabPage: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
  const { data, error } = useSWR(uuid ? url + uuid + '/vocabularies' : null, fetcher);
  const [inputValues, setInputValue] = useState<VocabularyData[]>([]);
  const [, setSnackbar] = useSnackbarState();

  if (error) {
    setSnackbar({
      message: error.response.data.error,
      severity: 'error',
      pathname: '/vocabularies/create/[uuid]',
    });
    router.push('/vocabularies/create/' + uuid);
  }

  if (!data) return <div>Loading...</div>;

  const vocabularies: VocabularyData[] = camelcaseKeys(data);
  if (inputValues.length === 0) {
    setInputValue(vocabularies);
  }

  const addInputValue = (newValue: VocabularyData) => {
    const updatedInputValues = [...inputValues];
    const index = inputValues.findIndex((item) => item.id === newValue.id);
    updatedInputValues[index] = newValue;
    setInputValue(updatedInputValues);
  };

  const headers = {
    'Content-Type': 'application/json',
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };

  const deleteInputValue = (valueId: number) => {
    console.log(valueId);

    // deleteはURLに削除する単語のidを含んでいるので、dataは送らない
    axios({
      method: 'DELETE',
      url: url + uuid + '/vocabularies/' + valueId,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        setInputValue((prevInputValue) => prevInputValue.filter((item) => item.id !== valueId));
        console.log(res.data.message);
        setSnackbar({
          message: res.data.message,
          severity: 'success',
          pathname: '/wordcards/edit/[uuid]',
        });
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
      });
  };

  const onSubmit = () => {
    console.log(inputValues);

    const data = JSON.stringify({
      vocabularies: inputValues,
    });

    console.log(data);
    console.log(JSON.stringify(inputValues, null, 2));

    axios({
      method: 'PATCH',
      url: url + uuid + '/vocabularies/update',
      headers: headers,
      data: data,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data.message);
        setSnackbar({
          message: res.data.message,
          severity: 'success',
          pathname: '/wordcards',
        });
        router.push('/wordcards');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.response);
        if (e.response) {
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards/edit/[uuid]',
          });
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
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={3.5}
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
              単語編集
            </Typography>
          </Grid>
          {inputValues.map((item) => (
            <InputDisplayBox
              key={item.id}
              id={item.id}
              word={item.word}
              meaning={item.meaning}
              roles={item.roles}
              addValue={addInputValue}
              deleteValue={deleteInputValue}
            />
          ))}
        </Grid>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 55 }}>
          <Grid item>
            <Link href="/wordcards">
              <Button sx={{ width: 100 }}>戻る</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button onClick={onSubmit} sx={{ width: 100 }}>
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditVocabPage;