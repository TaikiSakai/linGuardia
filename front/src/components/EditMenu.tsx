import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useRef } from 'react';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { mutate } from 'swr';
import CategoryBox from './CategoryBox';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { CategoryData } from '@/types/CategoryType';
import { WordcardData } from '@/types/WordcardType';

type newWordcardData = {
  card: WordcardData;
  categories: CategoryData;
  closeModal: () => void;
};

const EditMenuForModal = (props: newWordcardData) => {
  const { handleSubmit, control } = useForm<newWordcardData>();
  const [categories, setCategory] = useState<string[]>(props.categories.name);
  const newCategory = useRef<HTMLInputElement | null>(null);

  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;

  const addCategoryValue = () => {
    const newval = newCategory.current?.value;

    if (newval) {
      setCategory([...categories, newval]);
    }
  };

  const deleteCategoryValue = (valueId: number) => {
    console.log(valueId);
    setCategory(props.categories.name.filter((_, idx: number) => idx !== valueId));
  };

  const onSubmit = async (data: newWordcardData) => {
    const newCardData = JSON.stringify({
      card: data.card,
      categories: { name: categories },
    });

    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
    const headers = { 'Content-Type': 'application/json' };

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url + props.card.uuid,
        headers: headers,
        data: newCardData,
        withCredentials: true,
      });

      console.log(res.data);
      mutate(url + props.card.uuid);
      setSnackbar({
        message: '更新しました',
        severity: 'success',
        pathname: '/wordcards/[uuid]',
      });
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
        setSnackbar({
          message: e.response?.data.error,
          severity: 'error',
          pathname: '/wordcards/[uuid]',
        });
      }
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
      <Controller
        name={'card.title'}
        defaultValue={props.card.title}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="text"
            required
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
        name={'card.status'}
        control={control}
        defaultValue={props.card.status}
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
              <IconButton onClick={addCategoryValue}>
                <Box sx={{ display: 'flex' }}>
                  <AddIcon />
                  <Typography>追加</Typography>
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
        <Typography component="h3" sx={{ fontWeight: 'bold' }}>
          ※公開設定について
        </Typography>
        <Typography component="p">
          <code>&quot;公開&quot;</code>
          を選択すると、他のユーザーがこの単語帳を閲覧することができるようになります。
        </Typography>
      </Box>
      <Button variant="contained" type="submit">
        変更
      </Button>
    </Stack>
  );
};

export default EditMenuForModal;
