import { LoadingButton } from '@mui/lab';
import { Stack, Typography, TextField } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState';
import { styles } from '@/styles';

type UserFormData = {
  name: string;
  email: string;
};

type modalHandler = {
  closeModal: () => void;
};

const UserSettingsBoxForModal = (props: modalHandler) => {
  const [user, setUser] = useUserState();
  const [isLoading, setIsLoading] = useState(false);
  const [, setSnackbar] = useSnackbarState();
  const handleClose = props.closeModal;
  const { handleSubmit, control } = useForm<UserFormData>();

  console.log(user);
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
  };

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    setIsLoading(true);
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth';
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
        message: 'アカウント情報を更新しました',
        severity: 'success',
        pathname: '/user/profile',
      });
      setUser({ ...user, isFetched: false });
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
        setSnackbar({
          message: e.response?.data.errors.full_messages,
          severity: 'error',
          pathname: '/user/profile',
        });
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
        ユーザー情報変更
      </Typography>
      <Controller
        name={'name'}
        control={control}
        rules={validationRules.name}
        defaultValue={user.name}
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
        name={'email'}
        control={control}
        rules={validationRules.email}
        defaultValue={user.email}
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

export default UserSettingsBoxForModal;
