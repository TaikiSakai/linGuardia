import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Container, Grid, TextField, Typography, Stack, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputDisplayBox from '@/components/InputDisplayBox';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';

const AddPage: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { uuid } = router.query;

  const { handleSubmit, control, reset } = useForm<VocabularyData>();
  const [open, handleOpen, handleClose] = useModal(reset);
  const [, setSnackbar] = useSnackbarState();

  // 入力値のインデックス管理
  // カウンターを使用することで、入力値を削除した場合でもインデックスが重複しない
  const [count, setCount] = useState<number>(0);
  const [inputValues, setInputValue] = useState<VocabularyData[]>([]);

  const addInputValue = (newValue: VocabularyData) => {
    // inputValuesに同じidを持つオブジェクトがあるか確認
    const index = inputValues.findIndex((item) => item.id === newValue.id);

    // 同じidが存在する場合は、そのindexが返る
    if (index !== -1) {
      const updatedInputValues = [...inputValues];
      updatedInputValues[index] = newValue;
      setInputValue(updatedInputValues);
    }
    // idが存在しない場合は-1が返るので、配列にオブジェクトを追加する
    else {
      setInputValue([...inputValues, newValue]);
    }
    setCount(count + 1);
  };

  // 入力値の削除 入力されたidを除外して新たに配列を作成する
  const deleteInputValue = (valueId: number) => {
    setInputValue((prevInputValue) => prevInputValue.filter((item) => item.id !== valueId));
  };

  const addToIndex = (data: VocabularyData) => {
    data['id'] = data['id'] === undefined ? count : data['id'];
    addInputValue(data);
    handleClose();
  };

  const onSubmit = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/' + uuid + '/vocabularies/';
    const data = JSON.stringify({
      vocabularies: inputValues,
    });

    const headers = { 'Content-Type': 'application/json' };

    try {
      const res: AxiosResponse = await axios({
        method: 'POST',
        url: url,
        headers: headers,
        data: data,
        withCredentials: true,
      });
      console.log(res.data.message);
      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/wordcards/[uuid]',
      });
      router.push('/wordcards/' + uuid);
    } catch (e) {
      if (isAxiosError(e)) {
        setSnackbar({
          message: e.response?.data.error,
          severity: 'error',
          pathname: '/vocabularies/create/[uuid]',
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
              単語新規登録
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
      <ModalCard title="単語新規登録" open={open} handleClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(addToIndex)} spacing={4}>
          <Controller
            name={'word'}
            defaultValue={''}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                placeholder="表面"
                fullWidth
                size="small"
                multiline
                rows={3}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name={'meaning'}
            defaultValue={''}
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                placeholder="裏面"
                fullWidth
                size="small"
                multiline
                rows={3}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name={'roles'}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                limitTags={3}
                value={field.value === undefined ? [] : field.value}
                options={['動詞', '名詞', '形容詞', '副詞']}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField type="text" {...params} label="品詞を選択してください" />
                )}
              />
            )}
          />
          <Button variant="contained" type="submit">
            追加
          </Button>
        </Stack>
      </ModalCard>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: 55 }}>
          <Grid item>
            <Link href="/wordcards">
              <Button sx={{ width: 100 }}>戻る</Button>
            </Link>
          </Grid>
          <Grid item>
            <Button onClick={handleOpen}>
              <AddCircleIcon />
            </Button>
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

export default AddPage;
