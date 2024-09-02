import { LoadingButton } from '@mui/lab';
import { Stack, Typography, TextField } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller, FieldValues } from 'react-hook-form';
import { useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type PasswordFormData = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

type modalHandler = {
  closeModal: () => void;
};

const PasswordSettingsBoxForModal = (props: modalHandler) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;
  const { handleSubmit, control } = useForm<PasswordFormData>({
    defaultValues: { password: '', passwordConfirmation: '' },
  });

  const validationRules = {
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

  const onSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    setIsLoading(true);
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/password';
    const headers = { 'Content-Type': 'application/json' };
    console.log(data);

    try {
      const res: AxiosResponse = await axios({
        method: 'PATCH',
        url: url,
        data: { ...data },
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      setSnackbar({
        message: res.data.message,
        severity: 'success',
        pathname: '/user/profile',
      });
      router.push('/user/profile');
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
        setSnackbar({
          message: e.response?.data.errors.full_messages,
          severity: 'error',
          pathname: '/user/profile',
        });
        router.push('/user/profile');
      }
    }
    setIsLoading(false);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      spacing={3}
      sx={{ px: 1 }}
    >
      <Typography component="h3" css={styles.modalTitle}>
        パスワード変更
      </Typography>
      <Typography component="h3" css={styles.modalText}>
        ※新しいパスワードを入力してください
      </Typography>
      <Controller
        name="currentPassword"
        control={control}
        rules={validationRules.password}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="password"
            label="現在のパスワード"
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
            label="新しいパスワード"
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
            label="新しいパスワードの確認"
            size="small"
            helperText={fieldState.error?.message}
            sx={{ backgroundColor: 'white' }}
          />
        )}
      />
      <LoadingButton
        css={styles.styledButton}
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ width: '100%' }}
      >
        変更
      </LoadingButton>
    </Stack>
  );
};

export default PasswordSettingsBoxForModal;
