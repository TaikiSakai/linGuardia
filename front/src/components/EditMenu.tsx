import { Box, Button, Typography, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import axios, { AxiosResponse, isAxiosError } from 'axios';
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
  const { handleSubmit, control } = useForm<WordcardData>();
  const [categories, setCategory] = useState<string[]>(props.categories.name);
  const [, setSnackbar] = useSnackbarState();

  const handleClose = props.closeModal;
  // setCategoryData(props.categories.name);

  console.log(props);
  console.log(categories);

  const addCategoryValue = () => {};

  const deleteCategoryValue = (valueId: number) => {
    console.log(valueId);
    setCategory(categories.filter((_, idx: number) => idx !== valueId));
  };

  const onSubmit = async (data: newWordcardData) => {
    // console.log('categories', data.categories.name);
    console.log(data);
    const newCardData = JSON.stringify({
      card: data.card,
      // categories: { name: data.categories.name },
    });
    console.log('new', newCardData);
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
        name={'title'}
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
        name={'categories.name'}
        control={control}
        defaultValue={props.categories.name || []}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="カテゴリー"
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
      <Box>
        {categories.length !== 0 &&
          categories.map((category, i) => (
            <Box key={i} onClick={() => {deleteCategoryValue(i)}}>
              <CategoryBox name={[category]} deletable={true} deleteMyself={deleteCategoryValue} />
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
