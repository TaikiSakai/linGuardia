import { Box, Button, Container, Grid, Typography, Paper } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
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

  const headers = { 'Content-Type': 'application/json' };

  const deleteInputValue = async (valueId: number) => {
    console.log(valueId);

    // deleteはURLに削除する単語のidを含んでいるので、dataは送信しない
    try {
      const res: AxiosResponse = await axios({
        method: 'DELETE',
        url: url + uuid + '/vocabularies/' + valueId,
        headers: headers,
        withCredentials: true,
      });
      setInputValue((prevInputValue) => prevInputValue.filter((item) => item.id !== valueId));
      console.log(res.data.message);
      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/vocabularies/edit/[uuid]',
      });
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e.message);
        setSnackbar({
          message: e.response?.data.error,
          severity: 'success',
          pathname: '/vocabularies/edit/[uuid]',
        });
      }
    }
  };

  const onSubmit = async () => {
    const data = JSON.stringify({
      vocabularies: inputValues,
    });

    // console.log(data);
    // console.log(JSON.stringify(inputValues, null, 2));

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url + uuid + '/vocabularies/update',
        headers: headers,
        data: data,
        withCredentials: true,
      });
      console.log(res.data.message);
      mutate(url + uuid + '/vocabularies');
      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/wordcards',
      });
      router.push('/wordcards');
    } catch (e) {
      if (isAxiosError(e)) {
        setSnackbar({
          message: e.response?.data.error,
          severity: 'error',
          pathname: '/wordcards/edit/[uuid]',
        });
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
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          pb: 'env(safe-area-inset-bottom)',
          transition: '100px',
        }}
      >
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
