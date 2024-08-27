import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { mutate } from 'swr';
import CategoryBox from './CategoryBox';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type modalHandler = {
  closeModal: () => void;
};

type cardForm = {
  title: string;
  status: string;
};

const NewCardMenuForModal = (props: modalHandler) => {
  const { handleSubmit, control } = useForm<cardForm>();
  const [categories, setCategories] = useState<string[]>([]);
  const newCategory = useRef<HTMLInputElement | null>(null);

  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;

  const addCategoryValue = () => {
    if (newCategory.current?.value) {
      const newval = newCategory.current.value;
      setCategories([...categories, newval]);

      newCategory.current.value = '';
    }
  };

  const deleteCategoryValue = (valueId: number) => {
    setCategories(categories.filter((_, idx: number) => idx !== valueId));
  };

  const onClickButton = (data: cardForm) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

    const newCardData = JSON.stringify({
      card: data,
      categories: { name: categories },
    });

    const headers = { 'Content-Type': 'application/json' };

    axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: newCardData,
      withCredentials: true,
    })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        mutate(process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards');
        setSnackbar({
          message: res.data.message,
          severity: 'success',
          pathname: '/wordcards',
        });

        handleClose();
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e);
        if (e.response) {
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards',
          });
        }
      });
  };

  const validationRule = {
    titleValue: {
      required: 'タイトルを入力してください',
      pattern: {
        value: /^.{1,20}$/,
        message: '20文字以内で入力してください',
      },
    },
  };

  return (
    <Box>
      <Stack component="form" onClick={handleSubmit(onClickButton)} spacing={4}>
        <Typography component="h3" css={styles.modalTitle}>
          単語帳を追加
        </Typography>
        <Controller
          name={'title'}
          control={control}
          rules={validationRule.titleValue}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="text"
              error={fieldState.invalid}
              helperText={fieldState.error?.message}
              label="タイトル"
              fullWidth
              size="small"
              rows={1}
              sx={{ backgroundColor: 'white' }}
            />
          )}
        />
        <Controller
          name={'status'}
          control={control}
          defaultValue={'close'}
          render={({ field }) => (
            <FormControl>
              <InputLabel id="status-label">公開設定</InputLabel>
              <Select {...field} required size="small" labelId="status-label" label="公開設定">
                <MenuItem value={'open'}>公開</MenuItem>
                <MenuItem value={'close'}>非公開</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <TextField
          type="text"
          label="カテゴリー"
          size="small"
          rows={1}
          inputRef={newCategory}
          sx={{ backgroundColor: 'white' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={addCategoryValue} sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex' }}>
                    <AddIcon />
                  </Box>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap' }}>
          {categories.length !== 0 &&
            categories.map((category, i) => (
              <Box
                key={i}
                onClick={() => {
                  deleteCategoryValue(i);
                }}
              >
                <CategoryBox name={[category]} deletable={true} />
              </Box>
            ))}
        </Box>
        <Box>
          <Typography css={styles.subTitle}>※公開設定について</Typography>
          <Typography css={styles.modalText}>
            <code>&quot;公開&quot;</code>
            を選択すると、他のユーザーがこの単語帳を閲覧することができるようになります。
          </Typography>
        </Box>
        <Button variant="contained" type="button">
          登録
        </Button>
      </Stack>
    </Box>
  );
};

export default NewCardMenuForModal;
