import { LoadingButton } from '@mui/lab';
import { Grid, Card, TextField, Typography, Stack, Box } from '@mui/material';
import axios, { AxiosResponse, AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();
  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  });

  const validationRules = {
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

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/sign_in';
    const headers = { 'Content-Type': 'application/json' };
    setIsLoading(true);

    axios({ method: 'POST', url: url, data: data, headers: headers })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token']);
        localStorage.setItem('client', res.headers['client']);
        localStorage.setItem('uid', res.headers['uid']);
        setUser({
          ...user,
          isFetched: false,
        });
        setSnackbar({
          message: 'サインインしました',
          severity: 'success',
          pathname: '/',
        });
        router.push('/');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message);
        setSnackbar({
          message: 'サインインに失敗しました',
          severity: 'error',
          pathname: '/sign_in',
        });
      });
    setIsLoading(false);
  };

  return (
    <Box sx={{ backgroundColor: '#e6f2ff', minHeight: '100vh' }}>
      <Grid container columns={18}>
        <Grid item xs={12} md={18} sx={{ margin: 'auto', pt: 20 }} style={{ maxWidth: '800px' }}>
          <Card sx={{ p: 2 }}>
            <Typography component="h2" sx={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>
              ログイン
            </Typography>
            <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
              <Controller
                name="email"
                control={control}
                rules={validationRules.email}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="メールアドレス"
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
                ログイン
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
