import { LoadingButton } from '@mui/lab';
import { Grid, Card, TextField, Typography, Stack, Box, Button } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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
    passwordConfirmation: {
      required: 'パスワードを確認してください',
      validate: (value: string, context: FieldValues) => {
        if (value !== context.password) {
          return 'パスワードが一致しません';
        }
        return true;
      },
    },
  };

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_URL + '/auth';
      const headers = { 'Content-Type': 'application/json' };
      const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_URL + '/user/sign_in';

      try {
        await axios({
          method: 'POST',
          url: url,
          data: { ...data, confirm_success_url: confirmSuccessUrl },
          headers: headers,
        });
        setSnackbar({
          message: '入力したメールアドレスへ確認メールを送信しました',
          severity: 'info',
          pathname: '/user/sign_in',
        });
        router.push('/user/sign_in');
      } catch (e) {
        console.log(e);
        setSnackbar({
          message: 'エラーが発生しました。しばらく経ってからやり直してください',
          severity: 'error',
          pathname: '/user/sign_up',
        });
        router.push('/user/sign_up');
      }
      setIsLoading(false);
    };

    SignUp(data);
  };

  return (
    <Box css={styles.baseLayout}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ margin: 'auto', pt: 15 }} style={{ maxWidth: '500px' }}>
          <Card sx={{ p: 2, mx: 2, borderRadius: 3 }}>
            <Box sx={{ py: 1, display: 'flex', justifyContent: 'center', justifyItems: 'item' }}>
              <Image src="/logo.png" width={180} height={35} alt="logo" />
            </Box>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', justifyItems: 'item' }}>
              <Typography css={styles.modalText}>新規ユーザー登録</Typography>
            </Box>
            <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
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
              <Controller
                name="passwordConfirmation"
                control={control}
                rules={validationRules.passwordConfirmation}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="パスワード確認"
                    size="small"
                    helperText={fieldState.error?.message}
                    sx={{ backgroundColor: 'white' }}
                  />
                )}
              />
              <LoadingButton
                variant="contained"
                css={styles.styledButton}
                type="submit"
                loading={isLoading}
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
            <Link href="/user/sign_in">
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
                ログイン
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
