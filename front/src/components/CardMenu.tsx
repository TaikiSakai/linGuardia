import { Box, Button, Typography, TextField, Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { mutate } from 'swr';
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
  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;
  console.log(handleClose);

  const onSubmit = (data: cardForm) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

    const newCardData = JSON.stringify({
      card: data,
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

  return (
    <Box>
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <Typography component="h3" css={styles.modalTitle}>
          単語帳を追加
        </Typography>
        <Controller
          name={'title'}
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
          defaultValue={'close'}
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
          <Typography css={styles.subTitle}>※公開設定について</Typography>
          <Typography css={styles.modalText}>
            <code>&quot;公開&quot;</code>
            を選択すると、他のユーザーがこの単語帳を閲覧することができるようになります。
          </Typography>
        </Box>
        <Button variant="contained" type="submit">
          登録
        </Button>
      </Stack>
    </Box>
  );
};

export default NewCardMenuForModal;
