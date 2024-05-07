import { InputTwoTone } from '@mui/icons-material';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState, createContext } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import useSWR from 'swr';
import InputDisplayBox from '@/components/InputDisplayBox';
import useModal from '@/components/ModalState';
import { styles } from '@/styles';
import { VocabularyData } from '@/types/VocabularyType';
import { fetcher } from '@/utils';
import { useRef } from 'react';

type inputType = {
  id: number;
  word: string;
  meaning: string;
};

export const InputContext = createContext<inputType[]>([]);
export const SetInputContext = createContext<(newValue: inputType) => void>(() => {});

const AddPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const inputRef = useRef(null);

  // 入力された単語オブジェクトを登録する処理
  const [inputValues, setInputValue] = useState<inputType[]>([]);
  const addValue = (newValue: inputType) => {
    // inputValuesに同じidを持つオブジェクトがあるか確認
    const id = inputValues.findIndex((item) => item.id === newValue.id);
    // 同じidが存在する場合は、そのidが返る
    if (id !== -1) {
      inputValues[id] = newValue;
      setInputValue(inputValues);
    }
    // idが存在しない場合は-1が返るので、配列にオブジェクトを追加する
    else {
      setInputValue([...inputValues, newValue]);
    }
    console.log(inputValues);
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
        <InputContext.Provider value={inputValues}>
          <SetInputContext.Provider value={addValue}>
            <Grid
              container
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              spacing={3.5}
              ref={inputRef}
            >
              <InputDisplayBox id={1} />
              <InputDisplayBox id={2} />
              <InputDisplayBox id={3} />
            </Grid>
          </SetInputContext.Provider>
        </InputContext.Provider>
        <Button onClick={createInputBox}>test</Button>
      </Container>
    </Box>
  );
};

export default AddPage;
