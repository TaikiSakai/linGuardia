import { LoadingButton } from '@mui/lab';
import { Grid, Card, TextField, Typography, Stack, Box, Button } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

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

  if (user.isSignedIn) {
    setSnackbar({
      message: 'ログイン済みです',
      severity: 'info',
      pathname: '/dashboard',
    });
    router.push('/dashboard');
  }

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

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/sign_in';
    const headers = { 'Content-Type': 'application/json' };

    try {
      setIsLoading(true);
      const res = await axios({
        method: 'POST',
        url: url,
        data: data,
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      setUser({
        ...user,
        isFetched: false,
      });
      setSnackbar({
        message: 'ログインしました',
        severity: 'success',
        pathname: '/dashboard',
      });
      router.push('/dashboard');
    } catch (e) {
      console.log(e);
      setSnackbar({
        message: 'ログインに失敗しました',
        severity: 'error',
        pathname: '/user/sign_in',
      });
    }
    setIsLoading(false);
  };

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{
        backgroundColor: '#e6f2ff',
      }}
    >
      <Grid container columns={18}>
        <Grid item xs={12} md={18} sx={{ margin: 'auto', pt: 20 }} style={{ maxWidth: '500px' }}>
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
                ログイン
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
            <Link href="/user/sign_up">
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
                新規ユーザー登録
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
