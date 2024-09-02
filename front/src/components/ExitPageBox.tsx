import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { styles } from '@/styles';

const ExitPageBoxForModal = () => {
  const router = useRouter();

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ px: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography component="h3" css={styles.modalTitle}>
        単語帳を終了します
      </Typography>
      <Typography component="h3" css={styles.modalText}>
        ※学習記録は保存されません
      </Typography>
      <Button
        css={styles.styledDangerButton}
        variant="contained"
        sx={{ width: '100%' }}
        onClick={router.back}
      >
        終了
      </Button>
    </Stack>
  );
};

export default ExitPageBoxForModal;
