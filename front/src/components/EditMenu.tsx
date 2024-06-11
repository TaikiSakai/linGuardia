import { Box, Button, Typography, Stack, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { mutate } from 'swr';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { WordcardData } from '@/types/WordcardType';

type newWordcardHandler = WordcardData & {
  closeModal: () => void;
};

const EditMenuForModal = (props: newWordcardHandler) => {
  const { handleSubmit, control } = useForm<WordcardData>();
  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;

  const onSubmit = async (data: WordcardData) => {
    const newCardData = JSON.stringify({ card: data });
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
    const headers = { 'Content-Type': 'application/json' };

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url + props.uuid,
        headers: headers,
        data: newCardData,
        withCredentials: true,
      });

      console.log(res.data);
      mutate(url + props.uuid);
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
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
      <Controller
        name={'title'}
        defaultValue={props.title}
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
            multiline
            rows={1}
            sx={{ backgroundColor: 'white' }}
          />
        )}
      />
      <Controller
        name={'status'}
        control={control}
        defaultValue={props.status}
        render={({ field }) => (
          <FormControl>
            <InputLabel id="status-label">公開設定</InputLabel>
            <Select {...field} required labelId="status-label" label="公開設定">
              <MenuItem value={'open'}>公開</MenuItem>
              <MenuItem value={'close'}>非公開</MenuItem>
            </Select>
          </FormControl>
        )}
      />
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
