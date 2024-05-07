import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, Container, Grid, TextField, Stack, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, createContext } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import ModalCard from '@/components/ModalCard';
import InputDisplayBox from '@/components/InputDisplayBox';
import useModal from '@/components/ModalState';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';

export const InputContext = createContext<VocabularyData[]>([]);
export const AddInputContext = createContext<(newValue: VocabularyData) => void>(() => {});
export const DeleteInputContext = createContext<(valueId: number) => void>(() => {});

const AddPage: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, control, reset } = useForm<VocabularyData>();
  const [open, handleOpen, handleClose] = useModal(reset);

  // 入力値のインデックス管理
  // カウンターを使用することで、入力値を削除した場合でもインデックスが重複しない
  const [count, setCount] = useState<number>(0);

  const [inputValues, setInputValue] = useState<VocabularyData[]>([]);

  const addInputValue = (newValue: VocabularyData) => {
    // inputValuesに同じidを持つオブジェクトがあるか確認
    const id = inputValues.findIndex((item) => item.id === newValue.id);
    // 同じidが存在する場合は、そのidが返る
    if (id !== -1) {
      inputValues[id] = newValue;
      setInputValue(inputValues);
    }
    // idが存在しない場合は-1が買えるので、配列にオブジェクトを追加する
    else {
      setInputValue([...inputValues, newValue]);
    }
    setCount(count + 1);
  };

  // delete  input 入力されたidを除外して新たに配列を作成する
  const deleteInputValue = (valueId: number) => {
    setInputValue((prevInputValue) => prevInputValue.filter((item) => item.id !== valueId));
  };

  // typeはform用に変更すること
  const onSubmit = (data: VocabularyData) => {
    data['id'] = data['id'] === undefined ? count : data['id'];
    addInputValue(data);
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
        <InputContext.Provider value={inputValues}>
          <AddInputContext.Provider value={addInputValue}>
            <DeleteInputContext.Provider value={deleteInputValue}>
              <Grid
                container
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                spacing={3.5}
              >
                {inputValues.map((item) => (
                  <InputDisplayBox
                    key={item.id}
                    id={item.id}
                    word={item.word}
                    meaning={item.meaning}
                    roles={[]}
                  />
                ))}
              </Grid>
            </DeleteInputContext.Provider>
          </AddInputContext.Provider>
        </InputContext.Provider>
        <Button onClick={() => console.log(inputValues)}>show inputvalues</Button>
      </Container>
      <ModalCard title="単語新規登録" open={open} handleClose={handleClose}>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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
          <Button variant="contained" type="submit">
            追加
          </Button>
        </Stack>
      </ModalCard>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          <Box display="flex" alignItems="center">
            <Link href="/wordcards">
              <Button sx={{ width: 100 }}>キャンセル</Button>
            </Link>
          </Box>
          <Button onClick={handleOpen}>
            <AddCircleIcon />
          </Button>
          <Box display="flex" alignItems="center">
            <Button sx={{ width: 100 }}>登録</Button>
          </Box>
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default AddPage;
