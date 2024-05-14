import { LoadingButton } from '@mui/lab';
import { Grid, Card, TextField, Typography, Stack, Box, Button } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [user] = useUserState();

  const [, setSnackbar] = useSnackbarState();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { email: '', password: '' },
  });

  if (user.isSignedIn) {
    setSnackbar({
      message: 'ログイン済みです',
      severity: 'info',
      pathname: '/',
    });
    router.push('/');
  }

  const validationRules = {
    name: {
      required: 'ユーザー名を入力してください',
    },
    email: {
      required: 'メールアドレスを入力してください',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: 'メールアドレスに誤りがあります',
      },
    },
    password: {
      required: 'パスワードを入力してください',
    },
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + '/auth';
      const headers = { 'Content-Type': 'application/json' };
      const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_URL + '/sign_in';

      await axios({
        method: 'POST',
        url: url,
        data: { ...data, confirm_success_url: confirmSuccessUrl },
        headers: headers,
      })
        .then((res: AxiosResponse) => {
          localStorage.setItem('access-token', res.headers['access-token'] || '');
          localStorage.setItem('client', res.headers['client'] || '');
          localStorage.setItem('uid', res.headers['uid'] || '');
          setSnackbar({
            message: '入力したメールアドレスへ確認メールを送信しました',
            severity: 'info',
            pathname: '/sign_in',
          });
          router.push('/sign_in');
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message);
          // snackbar
          router.push('/sign_up');
        });
      setIsLoading(false);
    };

    SignUp(data);
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Grid container columns={18}>
        <Grid item xs={15} md={18} sx={{ margin: 'auto', pt: 15 }} style={{ maxWidth: '500px' }}>
          <Card sx={{ p: 2 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: 28,
                color: 'black',
                fontWeight: 'bold',
                py: 3,
              }}
            >
              新規ユーザー登録
            </Typography>
            <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
              <Controller
                name="name"
                control={control}
                rules={validationRules.name}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="ユーザー名"
                    size="small"
                    helperText={fieldState.error?.message}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="メールアドレス"
                    size="small"
                    helperText={fieldState.error?.message}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={validationRules.password}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="パスワード"
                    size="small"
                    helperText={fieldState.error?.message}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isLoading}
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                登録
              </LoadingButton>
            </Stack>
          </Card>
          <Grid
            container
            item
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              pt: 3,
            }}
          >
            <Link href="/sign_in">
              <Button
                color="primary"
                variant="text"
                sx={{
                  textTransform: 'none',
                  fontSize: 16,
                  borderRadius: 1,
                  boxShadow: 'none',
                  ml: 2,
                }}
              >
                ログインはこちらから
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
