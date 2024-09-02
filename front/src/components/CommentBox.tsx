import { Button, Stack, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { mutate } from 'swr';
import { styles } from '@/styles';
import { CommentData } from '@/types/CommentType';

type modalHandler = {
  closeModal: () => void;
};

const CommentBoxForModal = (props: modalHandler) => {
  // コメントが属するカードのuuidを取得する
  const router = useRouter();
  const { uuid } = router.query;

  const { handleSubmit, control } = useForm<CommentData>();
  const handleClose = props.closeModal;

  const onSubmit = async (data: CommentData) => {
    const newCommentData = JSON.stringify({ comment: data });
    const url = process.env.NEXT_PUBLIC_API_URL + '/wordcard/cards/';
    const headers = { 'Content-Type': 'application/json' };

    try {
      const res: AxiosResponse = await axios({
        method: 'POST',
        url: url + uuid + '/comments',
        headers: headers,
        data: newCommentData,
        withCredentials: true,
      });
      console.log(res);
      mutate(url + uuid + '/comments');
      handleClose();
    } catch (e) {
      if (isAxiosError(e)) {
        console.log(e);
      }
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ px: 1 }} spacing={3}>
      <Typography component="h3" css={styles.modalTitle}>
        コメントを投稿
      </Typography>
      <Controller
        name={'body'}
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="text"
            required
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            label="コメントを入力してください"
            fullWidth
            size="small"
            multiline
            rows={5}
          />
        )}
      />
      <Typography css={styles.modalText}>*コメントは30文字以内で入力してください</Typography>
      <Button css={styles.styledButton} variant="contained" type="submit">
        投稿
      </Button>
    </Stack>
  );
};

export default CommentBoxForModal;
