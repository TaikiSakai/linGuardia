import {
  Grid,
  Container,
  Box,
  Button,
  Typography,
  Card,
  Stack,
  TextField,
  CardContent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn';
import { styles } from '@/styles';

// 新規登録フォーム
type cardForm = {
  title: string;
  status: string;
};

const CreateWordcard: NextPage = () => {
  useRequireSignedIn();

  const router = useRouter();
  const { handleSubmit, control } = useForm<cardForm>();
  const [, setSnackbar] = useSnackbarState();

  const onSubmit = (data: cardForm) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';

    const newCardData = JSON.stringify({
      card: data,
    });

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    };
    axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: newCardData,
    })
      .then((res: AxiosResponse) => {
        console.log(res);
        setSnackbar({
          message: '新しい単語帳を追加しました',
          severity: 'success',
          pathname: '/wordcards',
        });
        router.push('/wordcards');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        if (e.response) {
          console.log(e);
          setSnackbar({
            message: e.response.data.error,
            severity: 'error',
            pathname: '/wordcards/create',
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
              単語帳新規作成
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 5, p: 4 }}>
              <CardContent>
                <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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
                    <Typography component="h3" sx={{ fontWeight: 'bold' }}>
                      ※公開設定について
                    </Typography>
                    <Typography component="p">
                      <code>&quot;公開&quot;</code>
                      を選択すると、他のユーザーがこの単語帳を閲覧することができるようになります。
                    </Typography>
                  </Box>
                  <Button variant="contained" type="submit">
                    作成
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateWordcard;
