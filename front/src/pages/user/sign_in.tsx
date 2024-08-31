import InfoIcon from '@mui/icons-material/Info';
import { LoadingButton } from '@mui/lab';
import { Grid, Card, TextField, Typography, Stack, Box, Button } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import ModalCard from '@/components/ModalCard';
import useModal from '@/hooks/ModalState';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL + '/auth/sign_in';

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useUserState();
  const [, setSnackbar] = useSnackbarState();
  const [open, handleOpen, handleClose] = useModal();
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
    <Box css={styles.baseLayout}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ margin: 'auto', pt: 20 }} style={{ maxWidth: '500px' }}>
          <Card sx={{ p: 2, mx: 2, borderRadius: 3 }}>
            <Box sx={{ py: 1, display: 'flex', justifyContent: 'center', justifyItems: 'item' }}>
              <Image src="/logo.png" width={180} height={35} alt="logo" />
            </Box>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'center', justifyItems: 'item' }}>
              <Typography css={styles.modalText}>ログイン</Typography>
            </Box>
            <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
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
                css={styles.styledButton}
                type="submit"
                loading={isLoading}
              >
                ログイン
              </LoadingButton>
            </Stack>
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'center', justifyItems: 'item' }}>
              <Button color="primary" sx={{ width: 'auto' }} variant="text" onClick={handleOpen}>
                <Typography>
                  <InfoIcon />
                  登録確認メールが届かない方へ
                </Typography>
              </Button>
            </Box>
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
      <ModalCard title="" open={open} handleClose={handleClose}>
        <Stack direction="column" spacing={2} sx={{ px: 1 }}>
          <Typography css={styles.modalSubTitle}>確認メールが届かない場合</Typography>
          <Typography css={styles.modalText}>
            アカウント登録時のメールアドレス宛に確認メールを送付しております。
            メールが届かない場合は、迷惑メールに分類されていないかご確認ください。
          </Typography>
          <Typography css={styles.modalText}>
            ”linguardia.info@gmail.com”からメールを受信できるように設定してください。
          </Typography>
        </Stack>
      </ModalCard>
    </Box>
  );
};

export default SignIn;
